import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
@Component({
    selector: 'ngx-footer',
    styleUrls: ['./footer.component.scss'],
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    constructor(private dialogService: NbDialogService) {}
    openWindowCustomClass() {
        this.dialogService.open().onClose.subscribe(item => {});
    }
}
