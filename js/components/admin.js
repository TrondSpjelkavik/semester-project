import { imageUrl, cupsUrl } from "../settings/api.js";

import { displayAdminPanel } from "../content/displayAdmin.js";
import { displayAdminNav } from "../content/displayNav.js";

import { displayFooter } from "../content/displayFooter.js";

import { getUsername } from "../utils/userStorage.js";

export async function getData() {
  try {
    const assetsResponse = await fetch(imageUrl);
    const apiImage = await assetsResponse.json();

    const cupsResponse = await fetch(cupsUrl);
    const apiCups = await cupsResponse.json();

    const token = getUsername();

    if (!token) {
      document.location.href = "index.html";
    }

    displayAdminNav(apiImage);
    displayAdminPanel(apiCups);
    displayFooter(apiImage);
  } catch (err) {
    console.log(err);
  }
}

getData();
