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
            title: 'Dashboard',
            icon: 'fas fa-chart-line',
            link: '/pages/dashboard',
        },
        {
            title: 'Code View',
            icon: 'fa fa-pen-nib',
            link: '/pages/code-view',
        },
        {
            title: 'Workflow',
            icon: 'fa fa-network-wired',
            link: '/pages/workflow',
        },

        {
            title: 'Schedule',
            icon: 'fa fa-hourglass-half',
            link: '/pages/schedule',
        },

        {
            title: 'Management',
            icon: 'fa fa-cog',
            link: '/pages/management/users-management',
            children: [
                {
                    title: 'Users',
                    icon: 'fas fa-users',
                    link: '/pages/management/users-management',
                },
                {
                    title: 'Robots',
                    icon: 'fa fa-robot',
                    link: '/pages/management/robots-management',
                },
                {
                    title: 'Workflows',
                    icon: 'fa fa-network-wired',
                    link: '/pages/management/workflows-management',
                },
                {
                    title: 'Technical Metric',
                    icon: 'fab fa-battle-net',
                    link: '/pages/management/technical-metric',
                },
                {
                    title: 'File Agent',
                    icon: 'far fa-file-archive',
                    link: '/pages/management/file-agent',
                },
                {
                    title: 'Library Dependencies',
                    icon: 'fas fa-book',
                    link: '/pages/management/library-dependencies',
                },
            ],
        },
    ];

    constructor(
        public menuService: NbMenuService,
        public shareDataService: ShareDataService,
        public changeDetectorRef: ChangeDetectorRef,
        public inspectService: InspectService,
    ) {}
}
