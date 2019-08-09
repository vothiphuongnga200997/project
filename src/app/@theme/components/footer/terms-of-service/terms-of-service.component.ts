import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
    selector: 'ngx-terms-of-service',
    templateUrl: 'terms-of-service.component.html',
    styleUrls: ['terms-of-service.component.scss'],
})
export class TermsOfServiceComponent {
    @Input() title: string;

    constructor(protected ref: NbDialogRef<TermsOfServiceComponent>) {}

    dismiss() {
        this.ref.close();
    }
}
