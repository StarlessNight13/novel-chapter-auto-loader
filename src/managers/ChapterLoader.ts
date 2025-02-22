import { NotificationManager } from "../components/Notification";
import type { SiteConfig } from "../config/site-config";
import { UNIVERSAL_CONFIG } from "../config/universal-config";
import { DOMUtils } from "../utils/dom";
import { ChapterContentManager } from "./ChapterContentManager";
import { URLManager } from "./URLManager";

export class ChapterLoader {
  private nextChapterUrl: string | null;
  private readonly config: SiteConfig;
  private currentChapterNumber: number;
  private isLoading: boolean;
  private readonly contentManager: ChapterContentManager;
  private readonly urlManager: URLManager;

  constructor(config: SiteConfig) {
    this.config = config;
    this.isLoading = false;
    this.nextChapterUrl = null;
    this.currentChapterNumber = 1;
    this.contentManager = new ChapterContentManager(config);
    this.urlManager = new URLManager(config);

    this.init();
  }

  // Initialize the application
  private async init(): Promise<void> {
    try {
      DOMUtils.removeElements(document, this.config.selectors.removeElements);
      this.nextChapterUrl = DOMUtils.getNextChapterUrl(
        document,
        this.config.selectors.nextLink
      );
      this.initializeCurrentChapter();

      setTimeout(() => {
        this.setupEventListeners();
        this.fetchNextChapter();
      }, UNIVERSAL_CONFIG.initDelay);
    } catch (error) {
      console.error("Initialization error:", error);
    }
  }

  private initializeCurrentChapter(): void {
    const currentElement = document.querySelector(
      this.config.selectors.content
    );
    if (currentElement) {
      currentElement.setAttribute("data-url", window.location.href);
      currentElement.setAttribute(
        "data-chapter-number",
        this.currentChapterNumber.toString()
      );
      currentElement.setAttribute(
        "data-chapter-title",
        this.config.selectors.title
      );
    }
  }

  // Setup event listeners
  private setupEventListeners(): void {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  // Handle scroll event
  private handleScroll(): void {
    if (this.isLoading) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const endThreshold = documentHeight - UNIVERSAL_CONFIG.scrollThreshold;

    if (scrollPosition >= endThreshold) {
      this.fetchNextChapter();
    }
  }

  // Fetch next chapter
  private async fetchNextChapter(): Promise<void> {
    if (!this.nextChapterUrl || this.isLoading) return;

    this.isLoading = true;

    try {
      const response = await fetch(this.nextChapterUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const doc = new DOMParser().parseFromString(text, "text/html");

      const content = await this.processChapterContent(doc);
      await this.appendChapter(
        content,
        this.nextChapterUrl,
        ++this.currentChapterNumber
      );

      this.nextChapterUrl = DOMUtils.getNextChapterUrl(
        doc,
        this.config.selectors.nextLink
      );

      const title =
        doc.querySelector(this.config.selectors.title)?.textContent ||
        "Unknown Chapter";
      NotificationManager.show(`New Chapter: ${title}`);
    } catch (error) {
      console.error("Error fetching next chapter:", error);
      NotificationManager.show("Error loading next chapter");
    } finally {
      this.isLoading = false;
    }
  }

  // Process chapter content
  private async processChapterContent(doc: Document): Promise<string> {
    const containerElement = doc.querySelector<HTMLDivElement>(
      this.config.selectors.contentContainer
    );
    if (!containerElement) throw new Error("Content container not found");

    if (window.location.hostname === "kolbook.xyz") {
      const classesToRemove = DOMUtils.extractClassesFromStyle(
        doc,
        "article > style:nth-child(2)"
      );
      classesToRemove.forEach((className) => {
        containerElement
          .querySelectorAll(`.${className}`)
          .forEach((el) => el.remove());
      });
    }
    const contetStyle = this.config.stylesFunc();
    const contentElement = containerElement.querySelector(
      this.config.selectors.content
    );
    if (!contentElement) throw new Error("Content element not found");
    Object.assign(containerElement.style, contetStyle);
    return contentElement.innerHTML;
  }

  // Create user options div
  private createUserOptions(chapterNumber: number): HTMLDivElement {
    const userOptionsDiv = document.createElement("div");
    userOptionsDiv.classList.add("chapter-user-options");

    // --- Next Chapter Link ---
    const nextChapterLink = document.createElement("a");
    nextChapterLink.href = this.nextChapterUrl ?? "#";
    nextChapterLink.classList.add("chapter-options-link");
    nextChapterLink.classList.add("btn-1");
    nextChapterLink.textContent = `Go to Chapter ${chapterNumber + 1}`;
    nextChapterLink.style.padding = "5px 10px";

    if (!this.nextChapterUrl) {
      nextChapterLink.setAttribute("disabled", "true");
    }

    // --- Settings Button ---
    const settingsButton = document.createElement("button");
    settingsButton.textContent = "Settings";
    settingsButton.style.padding = "5px 10px";
    settingsButton.classList.add("btn-1");
    settingsButton.classList.add("chapter-options-button");
    settingsButton.addEventListener("click", this.config.openSettingsFunc);

    // --- Append Link and Button ---
    userOptionsDiv.appendChild(nextChapterLink);
    userOptionsDiv.appendChild(settingsButton);

    return userOptionsDiv;
  }

  // Append chapter to page
  private async appendChapter(
    content: string,
    chapterUrl: string,
    chapterNumber: number
  ): Promise<void> {
    const container = this.contentManager.createChapterContainer(
      content,
      chapterUrl
    );
    const appendToElement = document.querySelector(
      this.config.selectors.appendTo
    );

    if (!appendToElement) throw new Error("Append target not found");

    appendToElement.appendChild(this.createUserOptions(chapterNumber));
    appendToElement.appendChild(container);

    this.cleanupOldChapters();
  }

  // Cleanup old chapters
  private cleanupOldChapters(): void {
    const chapters = document.querySelectorAll(".chapter-container");
    if (chapters.length > UNIVERSAL_CONFIG.maxVisibleChapters) {
      chapters[0].remove();
    }
  }
}
