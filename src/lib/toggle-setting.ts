export function appendCeneleToggle(
  setState: (value?: boolean) => void,
  enabled: boolean
) {
  // Toggle
  const toggle = creatToggle(enabled);
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

export function appendKolnovelToggle(
  setState: (value?: boolean) => void,
  enabled: boolean
) {
  const toggle = creatToggle(enabled);
  const modal = document.querySelector(".optxshd") as HTMLDivElement | null;
  if (modal) {
    modal.appendChild(toggle);
    toggle.addEventListener("click", () => setState());
  }
}

export function appendRewayatToggle(
  setState: (value?: boolean) => void,
  enabled: boolean
) {
  const toggle = creatToggle(enabled);
  const modal = document.querySelector(
    ".optx-content"
  ) as HTMLDivElement | null;
  if (modal) {
    modal.appendChild(toggle);
    toggle.addEventListener("click", () => setState());
  }
}

function creatToggle(enabled: boolean) {
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("toggle-container"); // Add a class for styling if needed
  toggleContainer.classList.add("btn"); // Add a class for styling if needed
  toggleContainer.classList.add("btn-rect"); // Add a class for styling if needed
  toggleContainer.id = "toggle-container";

  // Create the input element of type checkbox, which will act as the toggle
  const toggleInput = document.createElement("input");
  toggleInput.type = "checkbox";
  toggleInput.classList.add("checkbox"); // Add a class for styling if needed
  toggleInput.checked = enabled;

  // Create a span element to act as the visual "slider" or background of the toggle
  const knob = document.createElement("span");
  knob.classList.add("knob"); // Add a class for styling the slider

  const btnBg = document.createElement("span");
  btnBg.classList.add("btn-bg"); // Add a class for styling the slider

  // Append the input and the slider to the container
  toggleContainer.appendChild(toggleInput);
  toggleContainer.appendChild(knob);
  toggleContainer.appendChild(btnBg);

  // Return the container element, which now holds the toggle
  return toggleContainer;
}
