import { SITE_CONFIGS, type SiteConfig } from "./config/site-config";
import { UNIVERSAL_CONFIG } from "./config/universal-config";
import { ChapterLoader } from "./managers/ChapterLoader";
import STYLES from "./scss/style.scss";

interface AppConfig {
  autoLoaderEnabled: boolean;
  chapterLoaderInstance: ChapterLoader | null;
}

// App.ts
class App {
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
      this.config.chapterLoaderInstance = this.isChapterPage();
    }

    if (UNIVERSAL_CONFIG.debugMode) {
      console.log("Script successfully injected");
    }
  }

  private isChapterPage(): ChapterLoader | null {
    const hostname = window.location.hostname as keyof typeof SITE_CONFIGS;
    const config = this.siteConfigs[hostname];

    if (this.checkConditions(config.isChapterPage)) {
      return new ChapterLoader(config);
    }
    return null;
  }

  private checkConditions(func?: () => boolean): boolean {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autoLoaderDisabled") === "true") return false;

    return func?.() ?? true;
  }

  private injectHTML(): void {
    try {
      GM_addStyle(STYLES);
    } catch (error) {
      console.error("Failed to inject HTML or styles:", error);
    }
  }
}

// index.ts
const GreaterWill = new App(SITE_CONFIGS, { autoLoaderEnabled: true });
