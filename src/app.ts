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
    this.config.autoLoaderEnabled = this.getAutoLoaderEnabledState();
    const { isChapterPage, config } = this.isChapterPage();
    if (this.config.autoLoaderEnabled && !this.config.chapterLoaderInstance) {
      // Only create if not already exists
      if (isChapterPage)
        this.config.chapterLoaderInstance = this.createNewChapterLoader(config);
    }
    if (UNIVERSAL_CONFIG.debugMode) {
      console.log("Script successfully injected");
    }
  }

  private isChapterPage():
    | {
        isChapterPage: true;
        config: SiteConfig;
      }
    | { isChapterPage: false; config: null } {
    const hostname = window.location.hostname;
    if (!(hostname in this.siteConfigs)) {
      console.warn(`No site config found for hostname: ${hostname}`);
      return { isChapterPage: false, config: null };
    }
    const config = this.siteConfigs[hostname as keyof typeof SITE_CONFIGS]; // Now safe to assert

    if (this.checkConditions(config.isChapterPage)) {
      config.appendToggleFunc(
        this.setEnabled.bind(this),
        this.config.autoLoaderEnabled
      ); // Bind 'this' to setEnabled
      return { isChapterPage: true, config };
    }
    return { isChapterPage: false, config: null };
  }

  private createNewChapterLoader(config?: SiteConfig): ChapterLoader {
    if (!config)
      return new ChapterLoader(
        this.siteConfigs[window.location.hostname as keyof typeof SITE_CONFIGS],
        this.config.autoLoaderEnabled
      );
    return new ChapterLoader(config, this.config.autoLoaderEnabled);
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
      // Save the new state to localStorage
      localStorage.setItem("autoLoaderEnabledState", String(newValue)); // Store as string 'true' or 'false'

      if (newValue && !this.config.chapterLoaderInstance) {
        this.config.chapterLoaderInstance = this.createNewChapterLoader(); // Create only when enabling
      }
      if (UNIVERSAL_CONFIG.debugMode) {
        console.log(`Auto loader is now ${newValue ? "enabled" : "disabled"}`);
      }
    }
  }

  private getAutoLoaderEnabledState(): boolean {
    return localStorage.getItem("autoLoaderEnabledState") === "true";
  }

  private deleteAllchpers(): void {
    const chapters = document.querySelectorAll(".chapter-container");
    chapters.forEach((chapter) => chapter.remove());
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
