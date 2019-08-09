import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';

@Injectable()
export class RobotService {
    constructor(public parseService: ParseService) {}

    async getListRobotsByStatus(data: { status: string }) {
        return await this.parseService.executeCloudCode('getListRobotsByStatus', data);
    }

    async getListRobots() {
        return await this.parseService.executeCloudCode('getListRobots', {});
    }

    async deleteRobot(data: { robotId: string }) {
        return await this.parseService.executeCloudCode('deleteRobot', data);
    }

    async editRobot(data: { robotId: string; name: string }) {
        return await this.parseService.executeCloudCode('editRobot', data);
    }

    async authorizeRobot(data: { robotId: string }) {
        return await this.parseService.executeCloudCode('authorizeRobot', data);
    }

    async disableRobot(data: { robotId: string }) {
        return await this.parseService.executeCloudCode('disableRobot', data);
    }

    async enableRobot(data: { robotId: string }) {
        return await this.parseService.executeCloudCode('enableRobot', data);
    }
}
