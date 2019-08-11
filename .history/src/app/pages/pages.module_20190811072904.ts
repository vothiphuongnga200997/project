import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { LoginModule } from './login/login.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule } from '../shared/share.module';
import { ReportWorkFlowModule } from './report-workflow/report.module';
import { RobotsManagementModule } from './robots-management/robots-management.module';
import { HomeModule } from './home/home.module';
import { QuanLyTourModule } from './qly-tour/qly-tour.module';
import { QlyKhachHangComponent } from './qly-khach-hang/qly-khach-hang.component';

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
        QuanLyTourModule,
    ],
    declarations: [...PAGES_COMPONENTS, QlyKhachHangComponent],
    entryComponents: [],
})
export class PagesModule {}
