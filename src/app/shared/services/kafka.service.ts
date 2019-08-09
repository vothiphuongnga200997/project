import { environment } from '../../../environments/environment';
import { KafkaProxyRest } from 'kafka-proxy-rest';
import * as moment from 'moment';

export class KafkaService {
    private kafkaProxyRest = new KafkaProxyRest({
        serverUrl: environment.config.KAFKA_REST_PROXY,
    });
    public subscribeTopics(topics, success) {
        return this.kafkaProxyRest.subscribe({ topics: topics, groupName: `group-${moment().format('x')}` }, (data: any) => {
            success(data);
        });
    }

    public unsubscribeTopics() {
        return this.kafkaProxyRest.unsubscribe();
    }
}
