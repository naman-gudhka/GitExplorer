import { loadFromStorage, saveToStorage } from "./utils.js";
import { renderFavorites } from "./render.js";

renderFavorites();

const html = document.querySelector("html");
const toggleSwitch = document.querySelector(".js-theme-toggle-btn");
const currentTheme = loadFromStorage("theme") || "dark";

html.setAttribute("data-theme", currentTheme);
toggleSwitch.setAttribute("aria-checked", currentTheme === "dark");

toggleSwitch.addEventListener('click', () => {
  
  const currentTheme = loadFromStorage("theme") || "dark";

  if(currentTheme === "dark"){
    html.setAttribute("data-theme", "light");
    toggleSwitch.setAttribute("aria-checked", "false");
    saveToStorage("theme", "light");
  }else if(currentTheme === "light"){
    html.setAttribute("data-theme", "dark");
    toggleSwitch.setAttribute("aria-checked", "true");
    saveToStorage("theme", "dark");
  }

});