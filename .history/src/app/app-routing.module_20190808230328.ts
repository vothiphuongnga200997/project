import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from '../app/shared/services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
    { path: '', redirectTo: 'pages', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'pages' },
    { path: 'home', component: HomeComponent },
];

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
