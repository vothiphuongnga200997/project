import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { CodeViewModule } from './codeview/codeview.module';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../shared/share.module';
import { ReportWorkFlowModule } from './report-workflow/report.module';
import { WorkFlowModule } from './workflow/workflow.module';
import { RobotsManagementModule } from './robots-management/robots-management.module';
import { WorkflowsManagementModule } from './workflows-management/workflows-management.module';
import { UsersManagementModule } from './users-management/users-management.module';
import { TechnicalMetricManagementModule } from './technical-metric-management/technical-metric-management.module';
import { ScheduleModule } from './schedule/schedule.module';
import { FileAgentModule } from './file-agent/file-agent.module';
import { QuickstartAddingModalComponent } from './quickstart-adding-modal/quickstart-adding-modal.component';

import { HomeModule } from './home/home.module';
const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        CodeViewModule,
        WorkFlowModule,
        SharedModule,
        ReportWorkFlowModule,
        LoginModule,
        RobotsManagementModule,
        WorkflowsManagementModule,
        UsersManagementModule,
        TechnicalMetricManagementModule,
        ScheduleModule,
        FileAgentModule,
        HomeModule,
    ],
    declarations: [...PAGES_COMPONENTS, QuickstartAddingModalComponent],
    entryComponents: [QuickstartAddingModalComponent],
})
export class PagesModule {}
