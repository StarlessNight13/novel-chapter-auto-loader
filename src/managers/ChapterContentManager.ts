import type { SiteConfig } from "../config/site-config";

export class ChapterContentManager {
  private readonly config: SiteConfig;

  constructor(config: SiteConfig) {
    this.config = config;
  }

  createChapterContainer(content: string, url: string): HTMLDivElement {
    const container = document.createElement("div");
    container.classList.add("chapter-container");
    container.setAttribute("data-url", url);
    container.innerHTML = content;

    const currentChapterStyleConfig = this.config.stylesFunc();
    Object.assign(container.style, currentChapterStyleConfig);

    return container;
  }
}
