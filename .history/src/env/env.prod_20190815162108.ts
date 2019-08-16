import { EnvConfig } from './env-config.interface';

const serverURL = 'http://localhost:1337/parse';

export const Env: EnvConfig = {
    ENV: 'PROD',
    API: {
        SERVER_URL: serverURL,
        PARSE: {
            APPLICATION_ID: 'myAppId',
            JAVASCRIPT_KEY: '',
            MASTER_KEY: '',
            SERVER_URL: serverURL,
        },
    },
};
