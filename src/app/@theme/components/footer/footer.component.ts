import { Component } from '@angular/core';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { NbDialogService } from '@nebular/theme';
@Component({
    selector: 'ngx-footer',
    styleUrls: ['./footer.component.scss'],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    constructor(private dialogService: NbDialogService) {}
    openWindowCustomClass() {
        this.dialogService.open(TermsOfServiceComponent).onClose.subscribe(item => {});
    }
}
