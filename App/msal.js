import { ConfidentialClientApplication } from '@azure/msal-node';
import { msalConfig } from './authConfig';
 
export const msalInstance = new ConfidentialClientApplication(msalConfig);
