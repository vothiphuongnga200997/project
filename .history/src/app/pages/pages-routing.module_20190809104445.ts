import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ReportWorkFlowComponent } from './report-workflow/report.component';

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
                path: 'dashboard',
                component: ReportWorkFlowComponent,
            },
            

           
            {
                path: 'management/robots-management',
                component: RobotsManagementComponent,
            },
           
           
            {
                path: '',
                redirectTo: 'dashboard',
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
