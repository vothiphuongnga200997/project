import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/share.module';
import { QuanLyTourComponent } from './quan-ly-tour.component';
import { TourChuaDiComponent } from './tour-chua-di/tour-chua-di.component';
@NgModule({
    imports: [ThemeModule, SharedModule],
    exports: [QuanLyTourComponent],
    declarations: [QuanLyTourComponent, TourChuaDiComponent],
})
export class QuanLyTourModule {}
