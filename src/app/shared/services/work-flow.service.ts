import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import * as Parse from 'parse';
@Injectable()
export class WorkFlowService {
    constructor(public parseService: ParseService) {}

    async getListWorkFlow() {
        const currentUser = Parse.User.current();
        const Workflow = new Parse.Query('WorkflowConfiguration');
        Workflow.equalTo('owner', currentUser);
        try {
            let result = await Workflow.find();
            return result;
        } catch (ex) {
            throw ex;
            console.log('getListWorkFlow', ex);
        }
    }

    async saveWorkflow(data: { workflowId?: string; structure: string; xmlStructure: string; name: string; metricList: string }) {
        const WorkflowConfiguration = Parse.Object.extend('WorkflowConfiguration');
        let workflow = new WorkflowConfiguration();
        let dataSave: any = {};
        if (data.workflowId) {
            dataSave.id = data.workflowId;
        }
        dataSave.structure = data.structure;
        dataSave.owner = Parse.User.current();
        dataSave.name = data.name;
        dataSave.xmlStructure = data.xmlStructure;
        dataSave.metricList = data.metricList;
        try {
            let result = await workflow.save(dataSave);
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    async updateCurrentWorkflow(data: { id?: string; currentWorkflow: string }) {
        return await this.parseService.executeCloudCode('updateCurrentWorkflow', data);
    }

    async getWorkflowsReport(data) {
        return await this.parseService.executeCloudCode('getWorkflowsReport', data);
    }

    async getWorkFlowConfigurationWithId(data: { workflowId: string }) {
        const WorkflowConfiguration = Parse.Object.extend('WorkflowConfiguration');
        const query = new Parse.Query(WorkflowConfiguration);
        try {
            let result = await query.get(data.workflowId);
            if (result) {
                return result;
            } else {
                throw new Error('WorkflowConfiguration not found');
            }
        } catch (ex) {
            throw ex;
        }
    }

    async deleteWorkFlowConfiguration(data: { workflowId: string }) {
        const WorkflowConfiguration = Parse.Object.extend('WorkflowConfiguration');
        const query = new Parse.Query(WorkflowConfiguration);
        try {
            let workflow = await query.get(data.workflowId);
            if (workflow) {
                let result = await workflow.destroy();
                if (result) {
                    return result;
                } else {
                    throw new Error('Object not found');
                }
            } else {
                throw new Error('Object not found');
            }
        } catch (ex) {
            throw ex;
        }
    }

    async editWorkFlowConfiguration(data: { workflowId: string; name: string }) {
        const WorkflowConfiguration = Parse.Object.extend('WorkflowConfiguration');
        const query = new Parse.Query(WorkflowConfiguration);
        try {
            let workflow = await query.get(data.workflowId);
            if (workflow) {
                workflow.set('name', data.name);
                let result = await workflow.save();
                if (result) {
                    return result;
                } else {
                    throw new Error('Workflow not found');
                }
            } else {
                throw new Error('Workflow not found');
            }
        } catch (ex) {
            throw ex;
        }
    }
    async parseStructure(data: { dataXml: string }) {
        return await this.parseService.executeCloudCode('parseStructure', data);
    }
    async getCodeStringFromStructure(data: { structure: Array<any> }) {
        return await this.parseService.executeCloudCode('getCodeStringFromStructure', data);
    }
}
