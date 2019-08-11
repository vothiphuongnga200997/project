import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'ngx-ds-tour',
    templateUrl: './ds-tour.component.html',
    styleUrls: ['./ds-tour.component.scss'],
})
export class DsTourComponent implements OnInit {
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
    constructor() {}

    ngOnInit() {}
}
