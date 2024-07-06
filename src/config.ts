import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';
// src/authConfig.js
import { PublicClientApplication } from "@azure/msal-browser";

export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
  logLevel: keyof typeof LogLevel;
}

export const config: Config = {
  site: { name: 'Devias Kit', description: '', themeColor: '#090a0b', url: getSiteURL() },
  logLevel: (process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel) ?? LogLevel.ALL,
};



const msalConfig = {
  auth: {
    clientId: "726e6710-6417-4e3c-b505-dda532b4760e",
    authority: "https://login.microsoftonline.com/c67d957d-2203-4540-bdbc-001df62dba53",
    redirectUri: "http://localhost:3000",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export default msalInstance;