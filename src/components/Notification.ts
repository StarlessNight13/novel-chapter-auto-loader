import { UNIVERSAL_CONFIG } from "../config/universal-config";

export class NotificationManager {
  private static readonly styles: Partial<CSSStyleDeclaration> = {
    position: "fixed",
    top: "10px",
    right: "10px",
    background: "#28a745",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    zIndex: "1000",
  };

  static show(message: string): void {
    const notification = document.createElement("div");
    notification.textContent = message;
    Object.assign(notification.style, this.styles);
    document.body.appendChild(notification);

    setTimeout(
      () => notification.remove(),
      UNIVERSAL_CONFIG.notificationDuration
    );
  }
}
