/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/share.module';
import { AngularMonacoEditorModule } from 'angular-monaco-editor';
import { MonacoEditorModule } from './shared/modules/monaco-editor/monaco-editor.module';
import { PagesModule } from './pages/pages.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        CoreModule.forRoot(),
        SharedModule.forRoot(),
        AngularMonacoEditorModule.forRoot(),
        MonacoEditorModule,
        PagesModule,
    ],
    bootstrap: [AppComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppModule {}
