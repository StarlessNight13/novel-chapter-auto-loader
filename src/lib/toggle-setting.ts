export function appendCeneleToggle(setState: (value?: boolean) => void) {
  // Toggle
  const toggle = creatToggle();
  const section = document.createElement("section");
  const header = document.createElement("h4");
  header.textContent = "Auto Loader";
  section.appendChild(header);
  section.appendChild(toggle);

  const modal = document.querySelector(
    ".modal-dialog-centered > div:nth-child(1) > div:nth-child(2)"
  ) as HTMLDivElement | null;
  if (modal) {
    modal.appendChild(section);
    toggle.addEventListener("click", () => setState());
  }
}

export function appendKolnovelToggle(setState: (value?: boolean) => void) {
  const toggle = creatToggle();
  const modal = document.querySelector(".optxshd") as HTMLDivElement | null;
  if (modal) {
    modal.appendChild(toggle);
    toggle.addEventListener("click", () => setState());
  }
}

export function appendRewayatToggle(setState: (value?: boolean) => void) {
  const toggle = creatToggle();
  const modal = document.querySelector(
    ".optx-content"
  ) as HTMLDivElement | null;
  if (modal) {
    modal.appendChild(toggle);
    toggle.addEventListener("click", () => setState());
  }
}

function creatToggle() {
  const toggle = document.createElement("button");
  toggle.textContent = "Toggle Auto Loader";
  toggle.id = "settings-toggle";
  toggle.classList.add("btn-2");
  return toggle;
}
