import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component'
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../shared/share.module';
import { ReportWorkFlowModule } from './report-workflow/report.module';
import { RobotsManagementModule } from './robots-management/robots-management.module';
import { HomeModule } from './home/home.module';
const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        SharedModule,
        ReportWorkFlowModule,
        LoginModule,
        RobotsManagementModule,
        HomeModule,
    ],
    declarations: [...PAGES_COMPONENTS, QuickstartAddingModalComponent],
    entryComponents: [QuickstartAddingModalComponent],
})
export class PagesModule {}
