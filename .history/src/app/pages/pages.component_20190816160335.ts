import { Component, ChangeDetectorRef } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { ShareDataService } from '../shared/services/share-data.service';
import { AuthService } from '../shared/services/auth.service';
import { InternalNgModuleRef } from '@angular/core/src/linker/ng_module_factory';
@Component({
    selector: 'ngx-pages',
    styleUrls: ['pages.component.scss'],
    template: `
        <ngx-sample-layout>
            <nb-menu [items]="menu2"></nb-menu>

            <router-outlet></router-outlet>
        </ngx-sample-layout>
        <app-loading-cmp></app-loading-cmp>
    `,
})
export class PagesComponent {
    public status: number;
    public code: string = ``;
    public currentWorkFlow: any = {};
    public isExistMetricList = false;

    listFiles: Array<any> = [];

    menu: NbMenuItem[] = [
        {
            title: 'Quản lý nhân viên',
            icon: 'far fa-address-book',
            link: '/pages/qlnv',
        },
        {
            title: 'Quản lý tour',
            icon: 'fas fa-calendar-alt',
            children: [
                {
                    title: 'Miền Bắc',
                    link: '/pages/qltour/' + 'mienbac',
                },
                {
                    title: 'Miền Trung',
                    link: '/pages/qltour/' + 'mientrung',
                },
                {
                    title: 'Miền Nam',
                    link: '/pages/qltour/' + 'miennam',
                },
            ],
        },
        {
            title: 'Quản lý khách hàng',
            icon: 'fas fa-users',
            link: '/pages/qlkh',
        },
    ];
    menu2: NbMenuItem[] = [
        {
            title: 'Quản lý tour',
            icon: 'fas fa-calendar-alt',
            children: [
                {
                    title: 'Miền Bắc',
                    link: '/pages/qltour/' + 'mienbac',
                },
                {
                    title: 'Miền Trung',
                    link: '/pages/qltour/' + 'mientrung',
                },
                {
                    title: 'Miền Nam',
                    link: '/pages/qltour/' + 'miennam',
                },
            ],
        },
        {
            title: 'Quản lý khách hàng',
            icon: 'fas fa-users',
            link: '/pages/qlkh',
        },
    ];

    constructor(
        public menuService: NbMenuService,
        public shareDataService: ShareDataService,
        public changeDetectorRef: ChangeDetectorRef,
        public authService: AuthService,
    ) {}
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        console.log('pages');
        this.checkUser();
    }
    async checkUser() {
        this.status = await this.authService.checkStatus();
        console.log(this.status);
    }
}
