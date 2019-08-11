import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,

    selector: 'ngx-qly-tour',
    templateUrl: './qly-tour.component.html',
    styleUrls: ['./qly-tour.component.scss'],
})
export class QuanLyTourComponent implements OnInit {
    generalSource: SafeResourceUrl;

    robotSource: SafeResourceUrl;
    metricSource: SafeResourceUrl;
    statisticsSource: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer, private router: ActivatedRoute) {}

    ngOnInit() {
        this.generateSourceUrl();
        let id = this.router.snapshot.paramMap.get('id');
        console.log(id);
    }

    onSelectedTime(event) {
        this.generateSourceUrl(event.from, event.to);
    }

    generateSourceUrl(from = 'now%2Fy', to = 'now%2Fy') {
        let generalUrl = `${
            environment.config.DASHBOARD_URL
        }/app/kibana#/dashboard/3027eaa0-8859-11e9-ad53-e170332a29c9?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A5000),time:(from:${from},to:${to}))`;
        let robotUrl = `${
            environment.config.DASHBOARD_URL
        }/app/kibana#/dashboard/7a4cdf60-8781-11e9-ad53-e170332a29c9?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A5000),time:(from:${from},to:${to}))`;
        let metricUrl = `${
            environment.config.DASHBOARD_URL
        }/app/kibana#/dashboard/39e8bfa0-8904-11e9-962f-d15f08c46b82?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A5000),time:(from:${from},to:${to}))`;
        let statisticsUrl = `${
            environment.config.DASHBOARD_URL
        }/app/kibana#/dashboard/c3513850-93e3-11e9-9127-41859f7782d0?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A5000),time:(from:${from},to:${to}))`;
    }
}
