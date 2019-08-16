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
                title: 'Tên Tour',
                type: 'string',
                editable: true,
            },
            date: {
                title: 'Thời gian',
                type: 'string',
                editable: true,
            },
            location: {
                title: 'Địa điễm',
                type: 'string',
                editable: true,
            },
            total: {
                title: 'Tổng thời điểm',
                type: 'string',
                editable: true,
            },
        },
    };
    source: LocalDataSource = new LocalDataSource();
    constructor() {}

    ngOnInit() {}
}
