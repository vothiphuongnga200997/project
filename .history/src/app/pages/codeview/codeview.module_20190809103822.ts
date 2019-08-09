import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { CodeViewComponent } from './codeview.component';
import { SharedModule } from '../../shared/share.module';
import { MonacoEditorModule } from '../../shared/modules/monaco-editor/monaco-editor.module';
import { ConsoleModule } from '../../shared/modules/console/console.module';

import { NbDialogModule, NbWindowModule } from '@nebular/theme';

@NgModule({
    imports: [
        ThemeModule,
        NgxEchartsModule,
        SharedModule,
        MonacoEditorModule,
        ConsoleModule,
        NbDialogModule.forChild(),
        NbWindowModule.forChild(),
    ],
    declarations: [CodeViewComponent],
    entryComponents: [],
})
export class CodeViewModule {}
