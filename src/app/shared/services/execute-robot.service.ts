import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';

@Injectable()
export class ExecuteRobotService {
    constructor(public parseService: ParseService) {}

    async runWithKafka(data: any) {
        return await this.parseService.executeCloudCode('kafkaRunRobot', data);
    }

    async runRobot(data: {
        robotId: string;
        workflowId: string;
        scheduleId?: string;
        humanConversion?: {
            sumTimeCostByHuman: number;
            averageTechnicalMetric: number;
        };
    }) {
        return await this.parseService.executeCloudCode('runRobot', data);
    }
}
