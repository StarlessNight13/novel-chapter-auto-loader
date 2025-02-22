export interface UniversalConfig {
  scrollThreshold: number;
  notificationDuration: number;
  maxVisibleChapters: number;
  initDelay: number;
  urlUpdateThreshold: number;
  debugMode: boolean;
}

export const UNIVERSAL_CONFIG: UniversalConfig = {
  scrollThreshold: 900,
  notificationDuration: 3000,
  maxVisibleChapters: 2,
  initDelay: 2000,
  urlUpdateThreshold: 10,
  debugMode: true,
} as const;


