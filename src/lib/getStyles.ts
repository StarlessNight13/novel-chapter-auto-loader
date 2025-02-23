import { initializeChapterStyle as getCeneleStyle } from "./cenelStyle";

// Kolnovel style function
function getKolnovelStyle() {
  // --- Default Chapter Style Configuration ---
  const DEFAULT_CHAPTER_STYLE_CONFIG = {
    fontSize: "16px",
    fontFamily: "'Noto Kufi Arabic', sans-serif",
    lineHeight: "200%",
    background: "transparent",
  };

  // --- Load Chapter Style from Local Storage ---
  const localStorageStyleKey = "ts_rs_cfg";
  let currentChapterStyleConfig = DEFAULT_CHAPTER_STYLE_CONFIG; // Default style
  const storedStyleConfig = localStorage.getItem(localStorageStyleKey);

  if (storedStyleConfig) {
    try {
      currentChapterStyleConfig = JSON.parse(storedStyleConfig);
    } catch (e) {
      console.error("Error parsing stored style config, using default:", e);
      currentChapterStyleConfig = DEFAULT_CHAPTER_STYLE_CONFIG; // Fallback to default on parse error
    }
  } else {
    console.log("No stored style config found, using default.");
  }
  return currentChapterStyleConfig;
}

// Rewayat style function
function getRewayatStyle() {
  // --- Default Chapter Style Configuration ---
  const DEFAULT_CHAPTER_STYLE_CONFIG = {
    fontSize: "16px",
  };
  return DEFAULT_CHAPTER_STYLE_CONFIG;
}

function getCookie(cookieKey: string) {
  const cookieValue = document.cookie.match(
    `(^|;)\\s*${cookieKey}\\s*=\\s*([^;]+)`
  );
  return cookieValue ? cookieValue[1] : null;
}

export { getCeneleStyle, getKolnovelStyle, getRewayatStyle };
