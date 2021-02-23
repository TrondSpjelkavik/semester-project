import { imageUrl } from "../settings/api.js";

import { displayNav, displayAdminNav } from "../content/displayNav.js";
import { displayHeader } from "../content/displayHeader.js";
import { displayMoomin } from "../content/displayMoomin.js";
import { displayFooter } from "../content/displayFooter.js";

import { getUsername } from "../utils/userStorage.js";

const username = getUsername();

export async function getData() {
  try {
    const assetsResponse = await fetch(imageUrl);
    const apiImage = await assetsResponse.json();

    if (username === "admin") {
      displayAdminNav(apiImage);
    } else {
      displayNav(apiImage);
    }

    displayHeader(apiImage);
    displayMoomin(apiImage);
    displayFooter(apiImage);
  } catch (err) {
    console.log(err);
  } finally {
    const loading = document.querySelector(".loading");
    loading.style.display = "none";
  }
}

getData();
