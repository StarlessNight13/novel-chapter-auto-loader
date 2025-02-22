function openCeneleSettings() {
  const optxshdElement = document.querySelector(".optxshd");
  if (optxshdElement) {
    optxshdElement.classList.toggle("optxshds");
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
