import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ReportWorkFlowComponent } from './report.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { SharedModule } from '../../shared/share.module';
import { HComponent } from './h/h.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RobotsManagementModule } from '../robots-management/robots-management.module';
@NgModule({
    imports: [ThemeModule, SharedModule, Ng2SmartTableModule, RobotsManagementModule],
    exports: [ReportWorkFlowComponent],
    declarations: [ReportWorkFlowComponent, DateFilterComponent, HComponent],
})
export class ReportWorkFlowModule {}
