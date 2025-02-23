function openCeneleSettings() {
  document.body.classList.add("modal-open");

  const backdrop = document.querySelector(
    ".modal-backdrop"
  ) as HTMLDivElement | null;
  if (backdrop) {
    backdrop.style.backgroundColor = "rgba(29, 29, 29, 0.39)";
  }
  const modal = document.querySelector("#alayahya-reader-settings") as HTMLDivElement | null;
  if (modal) {
    modal.style.display = "block";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    modal.role = "dialog";
    
  }
}

function openKolnovelSettings() {
  const optxshdElement = document.querySelector(".optxshd");
  if (optxshdElement) {
    optxshdElement.classList.toggle("optxshds");
  }
}

function openRewayatSettings() {
  document.querySelector(".optx-content")?.classList.toggle("optx-content-s");
}

export { openCeneleSettings, openKolnovelSettings, openRewayatSettings };
