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
import { QlyKhachHangtModule } from './qly-khach-hang/qly-khach-hang.module';
import { QlyNhanVienModule } from './qly-nhan-vien/qly-nhan-vien.moudel';
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
        QlyKhachHangtModule,
        QlyNhanVienModule,
    ],
    declarations: [...PAGES_COMPONENTS],
    entryComponents: [],
})
export class PagesModule {}
