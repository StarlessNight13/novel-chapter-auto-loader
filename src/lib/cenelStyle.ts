// Constants
const DEFAULT_STYLE = {
  fontSize: "19px",
  lineHeight: "28.5px",
} as const;

// Types
type ChapterStyle = Record<string, string>;

interface DOMElements {
  chapter: HTMLDivElement | null;
  content: HTMLDivElement | null;
  sizeButtons: NodeListOf<HTMLElement> | null;
}

// DOM selectors
const SELECTORS = {
  content: ".reading-content",
  chapter: ".text-left",
  sizeButtons: ".theme-set-size > i",
} as const;

// Helper functions
function getElements(): DOMElements {
  return {
    chapter: document.querySelector<HTMLDivElement>(SELECTORS.chapter),
    content: document.querySelector<HTMLDivElement>(SELECTORS.content),
    sizeButtons: document.querySelectorAll(SELECTORS.sizeButtons),
  };
}

function getCurrentStyle(chapter: HTMLDivElement | null): ChapterStyle {
  if (!chapter) {
    return DEFAULT_STYLE;
  }

  const { fontSize, lineHeight } = chapter.style;
  return {
    fontSize: fontSize || DEFAULT_STYLE.fontSize,
    lineHeight: lineHeight || DEFAULT_STYLE.lineHeight,
  };
}

function applyStyle(content: HTMLDivElement | null, style: ChapterStyle): void {
  if (content) {
    Object.entries(style).forEach(([variableName, value]) => {
      content.style.setProperty(`--${variableName}`, value);
    });
  }
}

// Main function
function initializeChapterStyle(): ChapterStyle {
  const { chapter, content, sizeButtons } = getElements();

  if (!chapter || !sizeButtons) {
    applyStyle(content, DEFAULT_STYLE);
    return {
      fontSize: "var(--fontSize)",
      lineHeight: "var(--lineHeight)",
    };
  }

  Array.from(sizeButtons).forEach((button) => {
    button.addEventListener("click", () => {
      const style = getCurrentStyle(chapter);
      applyStyle(content, style);
    });
  });

  applyStyle(content, getCurrentStyle(chapter));
  return {
    fontSize: "var(--fontSize)",
    lineHeight: "var(--lineHeight)",
  };
}

export { initializeChapterStyle, type ChapterStyle };
