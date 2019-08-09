/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    config: {
        APP_ID: '18b5a5ec1421bd7d8ea7728b81e1e42a',
        SERVER_URL: 'http://localhost:1337/parse',
        DOMAIN_URL: 'http://localhost:1337',
        DRAWER_IFRAME_URL: 'https://sp_workflow.innoria.com',
        SOCKET_SERVER_URL: 'https://sp_bus.innoria.com',
        INSPECTOR_SOCKET_URL: 'ws://localhost:8080/Inspector',
        KAFKA_REST_PROXY: 'https://sp_bus.innoria.com',
        DASHBOARD_URL: 'http://192.168.1.96:5601',
        OAUTH_GOOGLE_CLIENT_ID: '481733480788-0lp86ce2b5s5ehhaqh5m9mdnod8kajtr.apps.googleusercontent.com',
    },
};
