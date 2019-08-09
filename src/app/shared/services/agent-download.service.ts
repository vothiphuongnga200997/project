import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';

@Injectable({
    providedIn: 'root',
})
export class DownloadAgentService {
    constructor(public parseService: ParseService) {}

    async autoDownloadService(data) {
        return await this.parseService.executeCloudCode('downloadFileAgent', data);
    }
}
