import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ReportWorkFlowComponent } from './report.component';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { SharedModule } from '../../shared/share.module';
import { HComponent } from './h/h.component';
@NgModule({
    imports: [ThemeModule, SharedModule],
    exports: [ReportWorkFlowComponent],
    declarations: [ReportWorkFlowComponent, DateFilterComponent, HComponent],
})
export class ReportWorkFlowModule {}
