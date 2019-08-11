import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ngx-tour-dang-di',
    templateUrl: './tour-dang-di.component.html',
    styleUrls: ['./tour-dang-di.component.scss'],
})
export class TourDangDiComponent implements OnInit {
    settings = {
        // actions: {
        //      add: false,
        // },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            id: {
                title: 'ID',
                type: 'string',
                editable: false,
            },
            name: {
                title: 'name',
                type: 'string',
                editable: true,
            },
            metric: {
                title: 'metric',
                type: 'number',
                sort: true,
                editable: true,
                sortDirection: 'asc',
            },
        },
    };
    source: LocalDataSource = new LocalDataSource();

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params);
            let i = params['id'];
            console.log(i);
        });
    }
}
