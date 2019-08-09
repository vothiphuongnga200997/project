import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
    providedIn: 'root',
})
export class TechnicalMetricService {
    constructor() {}

    async getListTechnicalMetric() {
        const TechnicalMetric = Parse.Object.extend('TechnicalMetric');
        const queryMetric = new Parse.Query(TechnicalMetric);
        try {
            let result = await queryMetric.find();
            return result;
        } catch (ex) {
            throw ex;
            console.log('getListTechnicalMetric', ex);
        }
    }

    async createMetric(data: { name: string; metric: string }) {
        try {
            const TechnicalMetric = Parse.Object.extend('TechnicalMetric');
            const technicalMetric = new TechnicalMetric();
            technicalMetric.set('name', data.name);
            // tslint:disable-next-line: radix
            technicalMetric.set('metric', parseFloat(data.metric.toString()));
            let result = await technicalMetric.save();
            return result;
        } catch (ex) {
            throw ex;
            console.log('createMetric', ex);
        }
    }

    async updateMetric(data: { id: string; name: string; metric: string }) {
        try {
            const TechnicalMetric = Parse.Object.extend('TechnicalMetric');
            const technicalMetric = new TechnicalMetric();
            technicalMetric.id = data.id;
            technicalMetric.set('name', data.name);
            // tslint:disable-next-line: radix
            technicalMetric.set('metric', parseFloat(data.metric.toString()));
            let result = await technicalMetric.save();
            return result;
        } catch (ex) {
            throw ex;
            console.log('updateMetric', ex);
        }
    }

    async deleteMetric(metricId: string) {
        const TechnicalMetric = Parse.Object.extend('TechnicalMetric');
        const queryMetric = new Parse.Query(TechnicalMetric);
        queryMetric.equalTo('objectId', metricId);
        let result = await queryMetric.find();
        try {
            await result[0].destroy();
            return true;
        } catch (ex) {
            throw ex;
        }
    }
}
