import { imageUrl, cupsUrl } from "../settings/api.js";

import { displayHome } from "../content/displayHome.js";
import { displayNav, displayAdminNav } from "../content/displayNav.js";
import { displayMoomin } from "../content/displayMoomin.js";
import { displayFooter } from "../content/displayFooter.js";

import { getUsername } from "../utils/userStorage.js";

const username = getUsername();

export async function getData() {
  try {
    const assetsResponse = await fetch(imageUrl);
    const apiImage = await assetsResponse.json();

    const cupsResponse = await fetch(cupsUrl);
    const apiCups = await cupsResponse.json();

    console.log(apiImage);

    if (username === "admin") {
      displayAdminNav(apiImage);
    } else {
      displayNav(apiImage);
    }

    displayHome(apiImage, apiCups);
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
