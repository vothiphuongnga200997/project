import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';

@Injectable()
export class ScheduleService {
    constructor(public parseService: ParseService) {}

    async getListScheduleEvent() {
        return await this.parseService.executeCloudCode('getListScheduleEvent', {});
    }

    async createScheduleEvent(params) {
        return await this.parseService.executeCloudCode('createScheduleEvent', params);
    }

    async runScheduleEvent(params: { eventName: string; eventId: string }) {
        return await this.parseService.executeCloudCode('runScheduleEvent', params);
    }

    async editScheduleEvent(params: { eventName: string; eventId: string; workflowId: string; robotId: string; eventTiming?: any }) {
        return await this.parseService.executeCloudCode('updateScheduleEvent', params);
    }

    async deleteScheduleEvent(params: { eventId: string }) {
        return await this.parseService.executeCloudCode('deleteScheduleEvent', params);
    }

    async getRobotInfoById(robotId: { id: any }) {
        return await this.parseService.executeCloudCode('getRobotInfoById', robotId);
    }

    async getWorkFlowInfoById(workflowId: { id: any }) {
        return await this.parseService.executeCloudCode('getWorkFlowInfoById', workflowId);
    }
}
