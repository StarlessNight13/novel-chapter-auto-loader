import { App } from "./app";
import { SITE_CONFIGS } from "./config/site-config";

// index.ts
new App(SITE_CONFIGS, { autoLoaderEnabled: true });
