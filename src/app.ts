import type { SiteConfig, SITE_CONFIGS } from "./config/site-config";
import { UNIVERSAL_CONFIG } from "./config/universal-config";
import { ChapterLoader } from "./managers/ChapterLoader";
import STYLES from "./scss/style.scss";

interface AppConfig {
  autoLoaderEnabled: boolean;
  chapterLoaderInstance: ChapterLoader | null;
}

// App.ts
export class App {
  private readonly config: AppConfig;
  private readonly siteConfigs: Record<string, SiteConfig>;

  private static readonly DEFAULT_CONFIG: AppConfig = {
    autoLoaderEnabled: false,
    chapterLoaderInstance: null,
  };

  constructor(
    siteConfigs: Record<string, SiteConfig>,
    userConfig: Partial<AppConfig> = {}
  ) {
    this.config = { ...App.DEFAULT_CONFIG, ...userConfig };
    this.siteConfigs = siteConfigs;
    this.initialize();
  }

  private initialize(): void {
    this.injectHTML();

    if (this.config.autoLoaderEnabled) {
      if (!this.config.chapterLoaderInstance) {
        // Only create if not already exists
        this.config.chapterLoaderInstance = this.isChapterPage();
      }
    } else {
      this.config.chapterLoaderInstance = null; // Clear instance when disabled
    }

    if (UNIVERSAL_CONFIG.debugMode) {
      console.log("Script successfully injected");
    }
  }

  private isChapterPage(): ChapterLoader | null {
    const hostname = window.location.hostname; // Get hostname without type assertion
    if (!(hostname in this.siteConfigs)) {
      console.warn(`No site config found for hostname: ${hostname}`);
      return null;
    }
    const config = this.siteConfigs[hostname as keyof typeof SITE_CONFIGS]; // Now safe to assert

    if (this.checkConditions(config.isChapterPage)) {
      config.appendToggleFunc(this.setEnabled.bind(this)); // Bind 'this' to setEnabled
      return new ChapterLoader(config);
    }
    return null;
  }
  /**
   * Toggles the autoLoaderEnabled state.
   * It updates the autoLoaderEnabled flag and may create/destroy ChapterLoader instance
   * based on the new state, without re-initializing the entire app.
   * @param value Optional value to set the state to. If not provided, it will be toggled.
   */
  private setEnabled(value?: boolean): void {
    const newValue = value ?? !this.config.autoLoaderEnabled;
    if (this.config.autoLoaderEnabled !== newValue) {
      this.config.autoLoaderEnabled = newValue;
      if (newValue && !this.config.chapterLoaderInstance) {
        this.config.chapterLoaderInstance = this.isChapterPage(); // Create only when enabling
      } else if (!newValue) {
        this.config.chapterLoaderInstance = null; // Clear when disabling
      }
      if (UNIVERSAL_CONFIG.debugMode) {
        console.log(`Auto loader is now ${newValue ? "enabled" : "disabled"}`);
      }
    }
  }

  private checkConditions(func: () => boolean): boolean {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autoLoaderDisabled") === "true") return false;

    return func();
  }

  private injectHTML(): void {
    try {
      GM_addStyle(STYLES);
    } catch (error) {
      console.error("Failed to inject HTML or styles:", error);
    }
  }
}
