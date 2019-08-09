import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import * as Parse from 'parse';
@Injectable()
export class FileStoreService {
    constructor(public parseService: ParseService) {}
    async saveFileStore(data: any) {
        return await this.parseService.executeCloudCode('saveFileStore', {
            content: data.content,
            id: data.id,
            filename: data.filename,
        });
    }

    async getFileStore() {
        const FileStore = Parse.Object.extend('FileStore');
        const queryFileStore = new Parse.Query(FileStore);
        try {
            let result = await queryFileStore.find();
            return result;
        } catch (ex) {
            throw ex;
            console.log('getListTechnicalMetric', ex);
        }
    }

    async getFileStoreWithFileName(data) {
        return await this.parseService.executeCloudCode('getFileStoreWithFileName', data);
    }
}
