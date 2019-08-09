import { Component, OnDestroy, ViewChild } from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import {
    NbMediaBreakpoint,
    NbMediaBreakpointsService,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
    NbDialogService,
    NbMenuItem,
} from '@nebular/theme';

import { StateService } from '../../../@core/utils';
import { QuickStartService } from '../../../shared/services/quickstart.service';
import { ToastrService, ExecuteRobotService, InspectService } from '../../../shared/services';

import { DialogInterface, ButtonStatusEnum } from '../../../shared/interface';
import { DialogComponent } from '../../../shared/modules/dialog/dialog.component';
// TODO: move layouts into the framework
@Component({
    selector: 'ngx-sample-layout',
    styleUrls: ['./sample.layout.scss'],
    templateUrl: './sample.layout.html',
})
export class SampleLayoutComponent implements OnDestroy {
    public code: string = ``;
    public currentWorkFlow: any = {};
    layout: any = {};
    sidebar: any = {};

    private alive = true;
    menu: NbMenuItem[] = [];
    currentTheme: string;

    constructor(
        private dialogService: NbDialogService,

        private toastrService: ToastrService,

        protected stateService: StateService,
        protected menuService: NbMenuService,
        protected themeService: NbThemeService,
        protected bpService: NbMediaBreakpointsService,
        protected sidebarService: NbSidebarService,

        private quickStartService: QuickStartService,
        private executeRobotService: ExecuteRobotService,
        public inspectService: InspectService,
    ) {
        console.log('sample');
        // this.listWorkflow();
        this.listQuickstart();
        this.stateService
            .onLayoutState()
            .pipe(takeWhile(() => this.alive))
            .subscribe((layout: string) => (this.layout = layout));

        this.stateService
            .onSidebarState()
            .pipe(takeWhile(() => this.alive))
            .subscribe((sidebar: string) => {
                this.sidebar = sidebar;
            });

        const isBp = this.bpService.getByName('is');
        this.menuService
            .onItemSelect()
            .pipe(
                takeWhile(() => this.alive),
                withLatestFrom(this.themeService.onMediaQueryChange()),
                delay(20),
            )
            .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {
                if (bpTo.width <= isBp.width) {
                    this.sidebarService.collapse('menu-sidebar');
                }
            });

        this.themeService
            .getJsTheme()
            .pipe(takeWhile(() => this.alive))
            .subscribe(theme => {
                this.currentTheme = theme.name;
            });
    }
    dialogConfig: DialogInterface = {
        title: '',
        content: '',
    };
    @ViewChild('confirmDeleteDialog') deleteDialog: DialogComponent;
    ngOnDestroy() {
        this.alive = false;
    }
    listFiles: Array<any> = [];

    runWorkFlow(item) {
        console.log(item.structure);
        this.runWorkFlowAction(item);
    }
    async runWorkFlowAction(item) {
        this.dialogService.open(ListRobotComponent).onClose.subscribe(robot => {
            if (robot) {
                console.log('log-----------------------', robot);
                this.execRunWorkflow(robot, item);
            }
        });
    }
    async execRunWorkflow(robot, id) {
        try {
            console.log('--->kafkaRunRobot');
            await this.executeRobotService.runRobot({
                robotId: robot.id,
                workflowId: id,
            });
        } catch (ex) {
            this.toastrService.error(ex.toString(), `Error`);
        }
    }

    async listQuickstart() {
        try {
            let listQuickstart: any = await this.quickStartService.openQuickstart();
            if (listQuickstart) {
                for (let i = 0; i < listQuickstart.length; i++) {
                    this.listFiles.push({
                        icon: listQuickstart[i].get('icon')._url,
                        name: listQuickstart[i].get('workflow').get('name'),
                        id: listQuickstart[i].id,
                        workflow: listQuickstart[i].get('workflow'),
                    });
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    }
    async openWorkFlow() {
        this.inspectService.type = 'load-workflow';
        console.log(this.listFiles);
        this.dialogService
            .open(QuickstartAddingModalComponent, {
                context: {
                    obj: this.listFiles,
                },
            })
            .onClose.subscribe(async item => {
                if (item) {
                    console.log(item);
                    await this.quickStartService.saveQuickstart(item);
                    this.listFiles = [];
                    this.listQuickstart();
                    this.toastrService.success('Add success', 'Add Quick Start succes');
                }
            });
    }
    showDelete(event) {
        this.dialogConfig = {
            title: 'Delete Workflow',
            content: 'Are you want to delete ?',
            data: event,
            rightBtnLabel: 'OK',
            leftBtnLabel: 'Cancel',
            rightBtnStatus: ButtonStatusEnum.Info,
            leftBtnStatus: ButtonStatusEnum.Hint,
        };
        this.dialogConfig.data = event;
        this.deleteDialog.open();
    }
    async onDelete(event) {
        console.log(event);
        try {
            let result = await this.quickStartService.deleteQuickStart(event);
            if (result) {
                this.toastrService.success(`Delete ${event} success`, `Delete Quick Start succes`);
                this.listFiles = [];
                this.listQuickstart();
            } else {
                this.toastrService.error(`Delete ${event} fail`, `Delete Quick Start succes`);
            }
        } catch (error) {
            this.toastrService.error(error, `Delete Libary`);
        }
    }
}
