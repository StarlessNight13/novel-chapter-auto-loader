import {
  getCeneleStyle,
  getKolnovelStyle,
  getRewayatStyle,
} from "../lib/getStyles";
import {
  openCeneleSettings,
  openKolnovelSettings,
  openRewayatSettings,
} from "../lib/openSettings";
import {
  appendCeneleToggle,
  appendKolnovelToggle,
  appendRewayatToggle,
} from "../lib/toggle-setting";

export const SITE_CONFIGS = {
  "cenele.com": {
    selectors: {
      nextLink: ".next_page",
      contentContainer: ".text-left",
      appendTo: ".reading-content",
      title: "#chapter-heading",
      content: ".text-right",
      removeElements: [
        ".social-share",
        ".entry-content_wrap > h2:nth-child(1)",
        ".chapter-warning",
        "div.row:nth-child(3)",
        ".footer-counter",
        ".read-container > h3:nth-child(3)",
        ".read-container > h3:nth-child(4)",
      ],
    },
    isChapterPage: () => true,
    stylesFunc: getCeneleStyle,
    openSettingsFunc: openCeneleSettings,
    appendToggleFunc: appendCeneleToggle,
  },
  "rewayat.club": {
    selectors: {
      nextLink: "div.col:nth-child(3) > a:nth-child(1)",
      contentContainer: ".container",
      appendTo: ".container",
      title: ".text-decoration-none",
      content: "div.v-card--flat > div:nth-child(7) > div:nth-child(1)",
      removeElements: [
        "div.mb-3:nth-child(5)",
        "div.chapter-container:nth-child(6) > div:nth-child(6) > button:nth-child(2)",
        "div.chapter-container:nth-child(6) > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)",
      ],
    },
    isChapterPage: () => true,
    stylesFunc: getRewayatStyle,
    openSettingsFunc: openRewayatSettings,
    appendToggleFunc: appendRewayatToggle,
  },
  "kolbook.xyz": {
    selectors: {
      nextLink:
        ".naveps > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)",
      contentContainer: ".epwrapper",
      appendTo: ".epwrapper",
      title: ".cat-series",
      content: "#kol_content",
      removeElements: [
        ".socialts",
        "div.announ:nth-child(4)",
        "div.announ:nth-child(1)",
        ".wp-embedded-content",
        "div.bixbox.fullrelated",
        "div.bixbox:has( > .commentx)",
        "#footer",
      ],
    },
    isChapterPage: () => true,
    condintions: {
      selectors: [
        "#kol_content",
        ".naveps > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)",
      ],
    },
    stylesFunc: getKolnovelStyle,
    openSettingsFunc: openKolnovelSettings,
    appendToggleFunc: appendKolnovelToggle,
  },
};

export interface SiteConfig {
  selectors: {
    nextLink: string;
    contentContainer: string;
    appendTo: string;
    title: string;
    content: string;
    removeElements: string[];
  };
  isChapterPage: () => boolean;
  conditions?: {
    selectors: string[];
  };
  stylesFunc: () => Record<string, string>;
  openSettingsFunc: () => void;
  appendToggleFunc: (setState: (value?: boolean) => void) => void;
}
