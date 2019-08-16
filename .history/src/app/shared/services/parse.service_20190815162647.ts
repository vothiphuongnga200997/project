import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Router } from '@angular/router';
import { Env } from '../../../env/env';

@Injectable({
    providedIn: 'root',
})
export class ParseService {
    constructor(private router: Router) {
        Parse.initialize(Env.API.PARSE.APPLICATION_ID || '', Env.API.PARSE.JAVASCRIPT_KEY || '', Env.API.PARSE.MASTER_KEY || '');
        (Parse.serverURL as any) = Env.API.PARSE.SERVER_URL;
        (window as any).Parse = Parse;
    }

    /**
     * Execute a cloud code
     * @param cloudName Cloud code name
     * @param params params for this cloud code
     */
    public async executeCloudCode(cloudName: string, params: { [key: string]: any }): Promise<any> {
        try {
            return await Parse.Cloud.run(cloudName, params);
        } catch (e) {
            throw this.handleParseError(e);
        }
    }

    /**
     * Handle Parse Error
     * @param error Parse error
     *
     * @returns error
     */
    public handleParseError(e: Parse.Error): Error | Parse.Error {
        if (!e && !e.code) {
            e = {
                code: Parse.ErrorCode.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
            };
        }
        switch (e.code) {
            case Parse.ErrorCode.CONNECTION_FAILED:
                if (!this.router.url || !this.router.url.startsWith('/login')) {
                    this.router.navigate(['/login']);
                }
                return e;
            case Parse.ErrorCode.INTERNAL_SERVER_ERROR:
                return e;
            case Parse.ErrorCode.INVALID_SESSION_TOKEN:
                Parse.User.logOut();
                if (!this.router.url || !this.router.url.startsWith('/login')) {
                    this.router.navigate(['/login']);
                }
                return e;
            default:
                return e;
        }
    }
}
