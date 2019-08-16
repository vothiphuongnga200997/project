import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import * as Parse from 'parse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FileAgentService {
    dataUpdate: Array<any> = [];

    constructor(public parseService: ParseService, private http: HttpClient) {}
    async getListFileAgent() {
        const FileAgent = Parse.Object.extend('FileAgent');
        const queryFileAgent = new Parse.Query(FileAgent);
        queryFileAgent.descending('createdAt');
        try {
            let result = await queryFileAgent.find();
            return result;
        } catch (ex) {
            throw ex;
            console.log('getListFileAgent', ex);
        }
    }
    async delete(id) {
        const FileAgent = Parse.Object.extend('FileAgent');
        const query = new Parse.Query(FileAgent);
        query.equalTo('objectId', id);
        let result = await query.find();
        try {
            await result[0].destroy();
            return true;
        } catch (ex) {
            throw ex;
        }
    }
    async changeDefault(id: string, platForm: string, isDefault?: boolean) {
        try {
            const query = new Parse.Query('FileAgent');
            query.equalTo('platForm', platForm);
            const resultQuery = await query.find();

            for (let i = 0; i < resultQuery.length; i++) {
                if (resultQuery[i].id !== id) {
                    let objUpdate = resultQuery[i];
                    objUpdate.set('isDefault', false);
                    this.dataUpdate.push(objUpdate);
                }
                await Parse.Object.saveAll(this.dataUpdate);
            }
        } catch (ex) {
            console.log(ex);
        }
    }
    callApi(file: any, version: string, platForm: string, isDefault: boolean, id?: string) {
        const formData: FormData = new FormData();
        if (isDefault) {
            formData.append('isDefault', isDefault.toString());
        }
        if (file) {
            formData.append('profile', file, file.name);
        }
        if (version) {
            formData.append('version', version);
        }
        if (platForm) {
            formData.append('platForm', platForm);
        }
        if (id) {
            formData.append('id', id);
        }

        return this.http.post(`${environment.config.DOMAIN_URL}/upload`, formData);
    }
}
