import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { AuthService, DownloadAgentService } from '../../../shared/services';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
    styles: [
        `
            nb-select {
                width: 10rem;
            }
        `,
    ],
})
export class HeaderComponent implements OnInit {
    @Input() position = 'normal';
    loading = false;
    user: any;

    userMenu = [
        {
            title: 'Log out',
            link: '/login',
            click: () => {
                this.logout();
            },
        },
    ];
    downloadMenu = [
        { title: '../../../../assets/images/icons8-windows-xp-filled-96.png', value: 'win7', version: 'v.1.0.1' },
        { title: '../../../../assets/images/icons8-windows8-filled-96.png', value: 'win10', version: 'v.1.0.1' },
        { title: '../../../../assets/images/icons8-apple-logo-filled-96.png', value: 'mac', version: 'v.1.0.1' },
        { title: '../../../../assets/images/icons8-linux-filled-96.png', value: 'linux', version: 'v.1.0.1' },
    ];

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private analyticsService: AnalyticsService,
        private layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private downloadAgentService: DownloadAgentService,
    ) {}

    ngOnInit() {
        let self = this;
        setTimeout(function() {
            self.loading = true;
        }, 200);
        this.fetchAndGetUser();
        this.menuService.onItemClick().subscribe(async (event: any) => {
            if (event.item.click) {
                await event.item.click();
            }
        });
    }
    click(item) {
        console.log(item);
    }
    async fetchAndGetUser() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            currentUser = await this.authService.getCurrentUser().fetch();
            this.user = {
                name: currentUser.get('firstName') + ' ' + currentUser.get('lastName'),
                picture: currentUser.get('avatar') ? currentUser.get('avatar').url() : 'assets/images/user_default.png',
            };
        } else {
            this.user = {
                name: 'Guest',
                picture: 'assets/images/user_default.png',
            };
        }
    }
    async logout() {
        try {
            await this.authService.logout();
            this.router.navigate(['login']);
        } catch (ex) {
            this.router.navigate(['login']);
        }
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.layoutService.changeLayoutSize();
        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }

    startSearch() {
        this.analyticsService.trackEvent('startSearch');
    }
    async downloadFile(platForm) {
        let self = this;
        let urlDownload: string = '';
        try {
            let urlParseDownload = await self.downloadAgentService.autoDownloadService({ platForm: platForm });
            if (urlParseDownload.success === true) {
                urlDownload = urlParseDownload.data;
                let openDownload = window.open(urlDownload, '_blank');
                return {
                    openDownload,
                    success: true,
                    data: urlParseDownload,
                };
            } else {
                return {
                    success: false,
                    error: 'Download Faile',
                };
            }
        } catch (err) {
            return {
                error: err,
                success: false,
            };
        }
    }
}
