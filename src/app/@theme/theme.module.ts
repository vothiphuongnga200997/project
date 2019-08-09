import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbRouteTabsetModule,
    NbSearchModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbContextMenuModule,
    NbProgressBarModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbStepperModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbDatepickerModule,
    NbDialogModule,
    NbWindowModule,
    NbListModule,
    NbToastrModule,
    NbAlertModule,
    NbSpinnerModule,
    NbRadioModule,
    NbSelectModule,
    NbChatModule,
    NbTooltipModule,
    NbCalendarKitModule,
} from '@nebular/theme';

import { NbSecurityModule } from '@nebular/security';

import { FooterComponent, HeaderComponent } from './components';
import { TermsOfServiceComponent } from './components/footer/terms-of-service/terms-of-service.component';
import { CapitalizePipe, PluralPipe, RoundPipe, TimingPipe, NumberWithCommasPipe, EvaIconsPipe } from './pipes';
import { OneColumnLayoutComponent, SampleLayoutComponent, ThreeColumnsLayoutComponent, TwoColumnsLayoutComponent } from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { SharedModule } from '../shared/share.module';
import { DialogModule } from '../shared/modules/dialog/dialog.module';
const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule, SharedModule];

const NB_MODULES = [
    NbCardModule,
    NbLayoutModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbContextMenuModule,
    NgbModule,
    NbSecurityModule, // *nbIsGranted directive,
    NbProgressBarModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbStepperModule,
    NbButtonModule,
    NbListModule,
    NbToastrModule,
    NbInputModule,
    NbAccordionModule,
    NbDatepickerModule,
    NbDialogModule,
    NbWindowModule,
    NbAlertModule,
    NbSpinnerModule,
    NbRadioModule,
    NbSelectModule,
    NbChatModule,
    NbTooltipModule,
    NbCalendarKitModule,
];

const COMPONENTS = [
    HeaderComponent,
    FooterComponent,
    OneColumnLayoutComponent,
    SampleLayoutComponent,
    ThreeColumnsLayoutComponent,
    TwoColumnsLayoutComponent,
    TermsOfServiceComponent,
];

const ENTRY_COMPONENTS = [TermsOfServiceComponent];

const PIPES = [CapitalizePipe, PluralPipe, RoundPipe, TimingPipe, NumberWithCommasPipe, EvaIconsPipe];

const NB_THEME_PROVIDERS = [
    ...NbThemeModule.forRoot(
        {
            name: 'default',
        },
        [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME],
    ).providers,
    ...NbSidebarModule.forRoot().providers,
    ...NbMenuModule.forRoot().providers,
    ...NbDatepickerModule.forRoot().providers,
    ...NbDialogModule.forRoot().providers,
    ...NbWindowModule.forRoot().providers,
    ...NbToastrModule.forRoot().providers,
    ...NbChatModule.forRoot({
        messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }).providers,
];

@NgModule({
    imports: [...BASE_MODULES, ...NB_MODULES, DialogModule],
    exports: [...BASE_MODULES, ...NB_MODULES, ...COMPONENTS, ...PIPES],
    declarations: [...COMPONENTS, ...PIPES],
    entryComponents: [...ENTRY_COMPONENTS],
})
export class ThemeModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ThemeModule,
            providers: [...NB_THEME_PROVIDERS],
        };
    }
}
