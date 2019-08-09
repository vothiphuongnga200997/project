import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import * as Parse from 'parse';

@Injectable({
    providedIn: 'root',
})
export class QuickStartService {
    listFiles: Array<any> = [];
    listQuickstart: Array<any> = [];
    dataQuickstart: Array<any> = [];
    obj: any;
    constructor(public parseService: ParseService) {}

    async openWorKFlow(obj) {
        this.listQuickstart = [];
        for (let i = 0; i < obj.length; i++) {
            this.listQuickstart.push(obj[i].workflow.id);
        }
        console.log(this.listQuickstart);
        const currentUser = Parse.User.current();
        const Workflow = new Parse.Query('WorkflowConfiguration');
        Workflow.equalTo('owner', currentUser);
        Workflow.notContainedIn('objectId', this.listQuickstart);
        try {
            let result = await Workflow.find();
            return result;
        } catch (ex) {
            throw ex;
            console.log('getListWorkFlow', ex);
        }
    }
    async saveQuickstart(item) {
        console.log(item);
        let quickstart = Parse.Object.extend('QuickStart');
        let obj = new quickstart();
        let dataSave: any = {};
        let nameFile: any = item.icon.name;

        let parseFile = new Parse.File(nameFile, item.icon);

        try {
            let currentUser = Parse.User.current();
            dataSave.owner = currentUser;
            dataSave.icon = parseFile;
            dataSave.workflow = item.workflow;
            console.log(dataSave);

            await obj.save(dataSave);
        } catch (ex) {
            throw ex;
            console.log('getListWorkFlow', ex);
        }
    }
    async openQuickstart() {
        const quickstart = new Parse.Query('QuickStart');
        const currentUser = Parse.User.current();
        quickstart.equalTo('owner', currentUser);
        quickstart.include('workflow');
        try {
            let result = await quickstart.find();
            return result;
        } catch (ex) {
            throw ex;
            console.log('getListWorkFlow', ex);
        }
    }
    async deleteQuickStart(id) {
        const QuickStart = Parse.Object.extend('QuickStart');
        const query = new Parse.Query(QuickStart);
        query.equalTo('objectId', id);
        let result = await query.find();
        try {
            await result[0].destroy();
            return result;
        } catch (ex) {
            throw ex;
        }
    }
}
