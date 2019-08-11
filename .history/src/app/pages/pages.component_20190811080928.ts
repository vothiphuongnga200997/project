import { Component, ChangeDetectorRef } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { ShareDataService } from '../shared/services/share-data.service';
import { InspectService } from '../shared/services';
@Component({
    selector: 'ngx-pages',
    styleUrls: ['pages.component.scss'],
    template: `
        <ngx-sample-layout>
            <nb-menu [items]="menu"></nb-menu>

            <router-outlet></router-outlet>
        </ngx-sample-layout>
        <app-loading-cmp></app-loading-cmp>
    `,
})
export class PagesComponent {
    public code: string = ``;
    public currentWorkFlow: any = {};
    public isExistMetricList = false;

    listFiles: Array<any> = [];

    menu: NbMenuItem[] = [
        {
            title: 'Quản lý nhân viên',
            icon: 'far fa-address-book',
            link: '/pages/qlkh',
        },
        {
            title: 'Quản lý tour',
            icon: 'fas fa-calendar-alt',
            children: [
                {
                    title: 'Miền Bắc',
                    link: '/pages/qltour' + 'mienbat',
                },
                {
                    title: 'Miền Trung',
                    link: '/pages/management/users-management',
                },
                {
                    title: 'Miền Nam',
                    link: '/pages/management/users-management',
                },
            ],
        },
        {
            title: 'Quản lý khách hàng',
            icon: 'fas fa-users',
            link: '/pages/workflow',
        },
    ];

    constructor(
        public menuService: NbMenuService,
        public shareDataService: ShareDataService,
        public changeDetectorRef: ChangeDetectorRef,
        public inspectService: InspectService,
    ) {}
}
