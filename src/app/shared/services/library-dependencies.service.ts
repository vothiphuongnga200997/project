import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import * as Parse from 'parse';

@Injectable()
export class LibraryDependenciesService {
    dataUpdate: Array<any> = [];
    constructor(public parseService: ParseService) {}
    async getListLibrary() {
        const library = Parse.Object.extend('LibraryDependencies');
        const queryLibrary = new Parse.Query(library);
        queryLibrary.descending('createdAt');
        try {
            let result = await queryLibrary.find();
            return result;
        } catch (ex) {
            throw ex;
            console.log('getListFileAgent', ex);
        }
    }

    async add(file: any, version: string, language: string, name: string) {
        let LibraryDependencies = Parse.Object.extend('LibraryDependencies');
        let obj = new LibraryDependencies();
        let dataSave: any = {};
        dataSave.version = version;
        dataSave.language = language;
        dataSave.name = name;
        dataSave.isDefault = true;
        let nameFile: any = file.name;

        let parseFile = new Parse.File(nameFile, file);
        dataSave.fileData = parseFile;

        try {
            let result = await obj.save(dataSave);

            const query = new Parse.Query('LibraryDependencies');
            query.equalTo('name', name);
            const resultQuery = await query.find();

            for (let i = 0; i < resultQuery.length; i++) {
                if (resultQuery[i].id !== result.id) {
                    let objUpdate = resultQuery[i];
                    objUpdate.set('isDefault', false);
                    this.dataUpdate.push(objUpdate);
                }
            }

            await Parse.Object.saveAll(this.dataUpdate);
            return result;
        } catch (ex) {}
    }
    async edit(file: any, version: string, language: string, name: string, id: string, isDefaultCurrent: boolean, isDefault: boolean) {
        let LibraryDependencies = Parse.Object.extend('LibraryDependencies');
        let obj = new LibraryDependencies();
        let dataSave: any = {};
        dataSave.version = version;
        dataSave.language = language;
        dataSave.name = name;
        dataSave.isDefault = isDefaultCurrent;
        if (file) {
            let nameFile: any = file.name;

            let parseFile = new Parse.File(nameFile, file);
            dataSave.fileData = parseFile;
        }

        if (id) {
            dataSave.objectId = id;
            try {
                let result = await obj.save(dataSave);
                if (isDefault !== isDefaultCurrent) {
                    if (isDefaultCurrent) {
                        const query = new Parse.Query('LibraryDependencies');
                        query.equalTo('name', name);
                        query.descending('createdAt');
                        const resultQuery = await query.find();

                        for (let i = 0; i < resultQuery.length; i++) {
                            if (resultQuery[i].id !== id) {
                                let objUpdate = resultQuery[i];
                                objUpdate.set('isDefault', false);
                                this.dataUpdate.push(objUpdate);
                            }
                        }

                        await Parse.Object.saveAll(this.dataUpdate);
                        return result;
                    }
                }
            } catch (ex) {}
        }
    }
    async delete(id) {
        const LibraryDependencies = Parse.Object.extend('LibraryDependencies');
        const query = new Parse.Query(LibraryDependencies);
        query.equalTo('objectId', id);
        let result = await query.find();
        try {
            await result[0].destroy();
            return true;
        } catch (ex) {
            throw ex;
        }
    }
}
