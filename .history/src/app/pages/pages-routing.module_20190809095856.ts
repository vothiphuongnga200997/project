import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { CodeViewComponent } from './codeview/codeview.component';
import { WorkFlowComponent } from './workflow/workflow.component';
import { ReportWorkFlowComponent } from './report-workflow/report.component';
import { RobotsManagementComponent } from './robots-management/robots-management.component';
import { WorkflowsManagementComponent } from './workflows-management/workflows-management.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { CodeViewLeaveGuard } from '../shared/services';
import { ScheduleComponent } from './schedule/schedule.component';
import { TechnicalMetricManagementComponent } from './technical-metric-management/technical-metric-management.component';
import { FileAgentComponent } from './file-agent/file-agent.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'code-view',
                component: CodeViewComponent,
                canDeactivate: [CodeViewLeaveGuard],
            },
            {
                path: 'modal-overlays',
                loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
            },
            {
                path: 'dashboard',
                component: ReportWorkFlowComponent,
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
            },
            {
                path: 'workflow',
                component: WorkFlowComponent,
            },

            {
                path: 'management/users-management',
                component: UsersManagementComponent,
            },
            {
                path: 'management/robots-management',
                component: RobotsManagementComponent,
            },
            {
                path: 'management/workflows-management',
                component: WorkflowsManagementComponent,
            },
            {
                path: 'management/technical-metric',
                component: TechnicalMetricManagementComponent,
            },
            {
                path: 'management/file-agent',
                component: FileAgentComponent,
            },
         
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
