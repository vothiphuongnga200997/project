import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/share.module';
import { QuanLyTourComponent } from './quan-ly-tour.component';
import { TourChuaDiComponent } from './tour-chua-di/tour-chua-di.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
    imports: [ThemeModule, SharedModule, Ng2SmartTableModule],
    exports: [QuanLyTourComponent],
    declarations: [QuanLyTourComponent, TourChuaDiComponent],
})
export class QuanLyTourModule {}
