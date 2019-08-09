import { Component, ViewChild } from '@angular/core';
import { RobotService, ToastrService } from '../../shared/services';
import { LocalDataSource } from 'ng2-smart-table';
import { ButtonViewComponent } from '../../shared/modules/button-view/button-view.component';
import { DialogInterface, ButtonStatusEnum } from '../../shared/interface';
import { DialogComponent } from '../../shared/modules/dialog/dialog.component';

@Component({
    moduleId: module.id,
    selector: 'robots-management-cmp',
    templateUrl: './robots-management.component.html',
    styleUrls: ['./robots-management.component.scss'],
})
export class RobotsManagementComponent {
    settings = {
        actions: {
            add: false,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            id: {
                title: 'ID',
                type: 'string',
                editable: false,
            },
            name: {
                title: 'Name',
                type: 'string',
            },
            type: {
                title: 'Type',
                type: 'string',
            },
            hostname: {
                title: 'Hostname',
                type: 'string',
                editable: false,
            },
            platform: {
                title: 'Platform',
                type: 'string',
                editable: false,
            },
            version: {
                title: 'Version',
                type: 'string',
                editable: false,
            },
            status: {
                title: 'Status',
                type: 'string',
                editable: false,
            },
            button: {
                title: 'Authorize',
                type: 'custom',
                renderComponent: ButtonViewComponent,
                onComponentInitFunction: instance => {
                    instance.save.subscribe(row => {
                        if (row.status && row.status === 'unauthorized') {
                            this.authorizeRobot(row.id);
                        } else if (row.status === 'connected') {
                            this.disableRobot(row.id);
                        } else if (row.status === 'disabled') {
                            this.enableRobot(row.id);
                        }
                    });
                },
                filter: false,
            },
        },
    };

    connectedSource: LocalDataSource = new LocalDataSource();
    disconnectedSource: LocalDataSource = new LocalDataSource();
    unauthorizeSource: LocalDataSource = new LocalDataSource();
    disabledSource: LocalDataSource = new LocalDataSource();

    robotsNumber = {
        connectedNumber: 0,
        disconnectedNumber: 0,
        disabledNumber: 0,
        unauthorizedNumber: 0,
    };

    dialogConfig: DialogInterface = {
        title: '',
        content: '',
    };

    @ViewChild('confirmDeleteDialog') deleteDialog: DialogComponent;

    constructor(private robotService: RobotService, private toastrService: ToastrService) {
        this.getListRobots();
    }

    async getListRobots() {
        let self = this;
        try {
            let result = await self.robotService.getListRobots();
            if (result && result.success) {
                let robots = result.data || [];
                let source = self.parseSourceData(robots);
                self.connectedSource.load(source.connectedSource);
                self.disconnectedSource.load(source.disconnectedSource);
                self.unauthorizeSource.load(source.unauthorizeSource);
                self.disabledSource.load(source.disabledSource);
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    async editRobot(event) {
        let self = this;
        let robotId = event && event.data && event.data.id;
        let name = event && event.newData && event.newData.name;
        try {
            let editRobot = await self.robotService.editRobot({ robotId: robotId, name: name });
            if (editRobot && editRobot.success) {
                self.getListRobots();
                self.toastrService.success('Edit Robot success', `Edit Robot`);
            } else {
                self.toastrService.error('Edit Robot error', `Edit Robot`);
            }
        } catch {
            self.toastrService.error('Edit Robot error', `Edit Robot`);
        }
    }

    showDeleteConfirm(event) {
        this.dialogConfig = {
            title: 'Delete Confirm',
            content: 'Are you want to delete ?',
            data: event.data,
            rightBtnLabel: 'OK',
            leftBtnLabel: 'Cancel',
            rightBtnStatus: ButtonStatusEnum.Info,
            leftBtnStatus: ButtonStatusEnum.Hint,
        };
        this.deleteDialog.open();
    }

    onDelete(event) {
        this.deleteRobot(event);
    }

    async deleteRobot(event) {
        let self = this;
        let robotId = event && (event.id || (event.data && event.data.id));
        try {
            let deleteRobot = await self.robotService.deleteRobot({ robotId: robotId });
            if (deleteRobot && deleteRobot.success) {
                self.getListRobots();
                self.toastrService.success('Delete Robot success', `Delete Robot`);
            } else {
                self.toastrService.error('Delete Robot error', `Delete Robot`);
            }
        } catch {
            self.toastrService.error('Delete Robot error', `Delete Robot`);
        }
    }

    parseSourceData(sourceData: Array<any>) {
        let data = sourceData.map(res => {
            return {
                id: res.id,
                name: res.get('name'),
                type: res.get('type'),
                hostname: res.get('hostname'),
                platform: res.get('platform'),
                version: res.get('version'),
                status: res.get('status'),
                button: this.getLabelButton(res.get('status')),
            };
        });
        let connectedSource = data.filter(res => res.status === 'connected');
        let disconnectedSource = data.filter(res => res.status === 'disconnected');
        let unauthorizeSource = data.filter(res => res.status === 'unauthorized');
        let disabledSource = data.filter(res => res.status === 'disabled');
        this.robotsNumber = {
            connectedNumber: connectedSource.length || 0,
            disabledNumber: disabledSource.length || 0,
            unauthorizedNumber: unauthorizeSource.length || 0,
            disconnectedNumber: disconnectedSource.length || 0,
        };
        return {
            connectedSource: connectedSource,
            disconnectedSource: disconnectedSource,
            unauthorizeSource: unauthorizeSource,
            disabledSource: disabledSource,
        };
    }

    async disableRobot(robotId) {
        let self = this;
        try {
            let result = await self.robotService.disableRobot({ robotId: robotId });
            if (result && result.success) {
                self.getListRobots();
                self.toastrService.success('Robot has been disabled', `Disable Robot`);
            } else {
                self.toastrService.error(`Robot hasn't been disabled`, `Disable Robot`);
            }
        } catch {
            self.toastrService.error(`Robot hasn't been disabled`, `Disable Robot`);
        }
    }

    async enableRobot(robotId) {
        let self = this;
        try {
            let result = await self.robotService.enableRobot({ robotId: robotId });
            if (result && result.success) {
                self.getListRobots();
                self.toastrService.success('Robot has been enabled', `Enable Robot`);
            } else {
                self.toastrService.error(`Robot hasn't been enabled`, `Enable Robot`);
            }
        } catch {
            self.toastrService.error(`Robot hasn't been enabled`, `Enable Robot`);
        }
    }

    async authorizeRobot(robotId) {
        let self = this;
        try {
            let result = await self.robotService.authorizeRobot({ robotId: robotId });
            if (result && result.success) {
                self.getListRobots();
                self.toastrService.success('Robot has been authorized', `Authorize Robot`);
            } else {
                self.toastrService.error(`Robot hasn't been authorized`, `Authorize Robot`);
            }
        } catch {
            self.toastrService.error(`Robot hasn't been authorized`, `Authorize Robot`);
        }
    }

    getLabelButton(status) {
        switch (status) {
            case 'connected':
                return 'Disable';
            case 'disabled':
                return 'Enable';
            case 'unauthorized':
                return 'Authorize';
            case 'disconnected':
                return '';
        }
    }
}
