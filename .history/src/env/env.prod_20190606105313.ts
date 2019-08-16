import { EnvConfig } from './env-config.interface';

const serverURL = 'http://localhost:1337/parse';

export const Env: EnvConfig = {
    ENV: 'PROD',
    API: {
        SERVER_URL: serverURL,
        PARSE: {
            APPLICATION_ID: '18b5a5ec1421bd7d8ea7728b81e1e42a',
            JAVASCRIPT_KEY: '',
            MASTER_KEY: '',
            SERVER_URL: serverURL,
        },
    },
};
