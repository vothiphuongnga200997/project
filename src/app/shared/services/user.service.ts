import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(public parseService: ParseService) {}

    async getListUser() {
        return await this.parseService.executeCloudCode('getListUserRobot', {});
    }

    async updateUser(data) {
        return await this.parseService.executeCloudCode('editCurrentUserRobot', { data });
    }

    async checkUserIsAdmin() {
        return await this.parseService.executeCloudCode('checkUserIsAdmin', {});
    }

    async deleteUser(id) {
        return await this.parseService.executeCloudCode('deleteUserRobot', { id });
    }

    async createUser(data) {
        return await this.parseService.executeCloudCode('createUserRobot', { data });
    }
}
