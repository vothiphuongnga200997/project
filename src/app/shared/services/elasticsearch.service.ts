import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';

@Injectable()
export class ElasticsearchService {
    private client = new Client({
        host: 'localhost:9200',
    });
    ping() {
        this.client.ping(
            {
                // ping usually has a 3000ms timeout
                requestTimeout: 3000,
            },
            function(error) {
                if (error) {
                    console.trace('elasticsearch cluster is down!');
                } else {
                    console.log('All is well');
                }
            },
        );
    }

    async queryRobotLogsByWorkflowInstanceId(params: { workflowInstanceId?: string; robotId?: string; sort?: Array<any> }) {
        let query = {
            bool: {
                must: [
                    {
                        match: {
                            workflowInstanceId: params.workflowInstanceId,
                        },
                    },
                ],
                should: [{ exists: { field: 'keyword.status' } }, { exists: { field: 'message.message' } }],
                minimum_should_match: 1,
            },
        };
        try {
            return this.query({ index: 'robot-logs-*', sort: params.sort, query: query });
        } catch (ex) {
            throw ex;
        }
    }

    async queryRobotLogs(params: { startTime: string; endTime: string; sort?: Array<any> }) {
        let query = {
            bool: {
                must: [
                    {
                        exists: {
                            field: 'workflowInstanceId',
                        },
                    },
                    {
                        match: {
                            'suite.name': 'Done',
                        },
                    },
                    {
                        range: {
                            startTime: {
                                gte: params.startTime,
                                lte: params.endTime,
                                format: 'dd/MM/yyyy||yyyy',
                            },
                        },
                    },
                ],
            },
        };
        try {
            return this.query({ index: 'robot-logs-*', sort: params.sort, query: query });
        } catch (ex) {
            throw ex;
        }
    }

    private async query(params: { index: string; query: any; sort?: Array<any>; size?: number }) {
        try {
            let response = await this.client.search({
                index: params.index,
                size: params.size || 1000,
                body: {
                    sort: params.sort,
                    query: params.query,
                },
            });
            return response.hits.hits;
        } catch (ex) {
            throw ex;
        }
    }
}
