import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/share.module';
import { QuanLyTourComponent } from './qly-tour.component';
import { TourChuaDiComponent } from './tour-chua-di/tour-chua-di.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DsTourComponent, ButtonViewComponent } from './ds-tour/ds-tour.component';
import { TourDangDiComponent } from './tour-dang-di/tour-dang-di.component';
import { TourDaDiComponent } from './tour-da-di/tour-da-di.component';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [ThemeModule, SharedModule, Ng2SmartTableModule, CommonModule],
    exports: [QuanLyTourComponent, ButtonViewComponent],
    declarations: [QuanLyTourComponent, TourChuaDiComponent, DsTourComponent, TourDangDiComponent, TourDaDiComponent, ButtonViewComponent],
    entryComponents: [QuanLyTourComponent, ButtonViewComponent],
})
export class QuanLyTourModule {}
