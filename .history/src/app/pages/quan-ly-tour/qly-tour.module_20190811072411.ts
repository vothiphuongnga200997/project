import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/share.module';
import { QuanLyTourComponent } from './quan-ly-tour.component';
import { TourChuaDiComponent } from './tour-chua-di/tour-chua-di.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DsTourComponent } from './ds-tour/ds-tour.component';
import { TourDangDiComponent } from './tour-dang-di/tour-dang-di.component';
import { TourDaDiComponent } from './tour-da-di/tour-da-di.component';

@NgModule({
    imports: [ThemeModule, SharedModule, Ng2SmartTableModule],
    exports: [QuanLyTourComponent],
    declarations: [QuanLyTourComponent, TourChuaDiComponent, DsTourComponent, TourDangDiComponent, TourDaDiComponent],
})
export class QuanLyTourModule {}
