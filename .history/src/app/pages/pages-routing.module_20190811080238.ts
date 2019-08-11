import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ReportWorkFlowComponent } from './report-workflow/report.component';
import { QuanLyTourComponent } from './qly-tour/qly-tour.component';
import { RobotsManagementComponent } from './robots-management/robots-management.component';
import { QlyKhachHangComponent } from './qly-khach-hang/qly-khach-hang.component';
const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'modal-overlays',
                loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
            },
            {
                path: 'qltour/:id',
                component: QuanLyTourComponent,
            },
            {
                path: 'qlkh',
                component: QlyKhachHangComponent,
            },
            {
                path: '',
                redirectTo: 'qltour',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
