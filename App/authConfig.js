/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { LogLevel } from '@azure/msal-node';
import { cachePlugin } from './cache/cachePlugin';
export const msalConfig = {
    auth: {
        clientId: 'Enter_the_Application_Id_Here',
        authority: 'https://login.microsoftonline.com/Enter_the_Tenant_Id_Here',
        clientSecret: 'Enter_the_Client_Secret_Here',
        redirectUri: 'http://localhost:3000/api/auth/redirect',
        clientCapabilities: ['CP1'],
    },
    cache: {
        cachePlugin: cachePlugin('./cache/data.json'),
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: LogLevel.Info,
        },
    },
};

