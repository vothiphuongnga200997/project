import { EnvConfig } from './env-config.interface';

const serverURL = 'http://localhost:1337/parse';

export const Env: EnvConfig = {
    ENV: 'DEV',
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
// 18b5a5ec1421bd7d8ea7728b81e1e42a;
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
