import { Component, OnInit, Input } from '@angular/core';
import { MonacoSetupService } from '../../services/monaco-setup.service';

@Component({
    moduleId: module.id,
    selector: 'app-monaco-editor',
    templateUrl: './monaco-editor.component.html',
    styleUrls: ['./monaco-editor.component.scss'],
})
export class MonacoEditorComponent implements OnInit {
    @Input('code') code: string;
    constructor(private monacoSetupService: MonacoSetupService) {}
    public loading = 'invisible';
    options = {
        theme: 'vs',
        language: 'javascript',
    };
    options1 = {
        theme: 'robotTheme',
        language: 'robotLanguage',
    };

    ngOnInit() {
        let self = this;
        let i = 0;
        let interval = setInterval(function() {
            let monaco = (window as any).monaco;
            if (monaco) {
                if (i === 0) {
                    i++;
                    self.monacoSetupService.initNewLanguage(monaco);
                }
                setTimeout(function() {
                    monaco.editor.setTheme('robotTheme');
                    self.loading = 'visible';
                    clearInterval(interval);
                }, 500);
            }
        }, 100);
    }
}
