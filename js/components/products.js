import { imageUrl, cupsUrl } from "../settings/api.js";

import { displayProducts } from "../content/displayProducts.js";
import { displayNav, displayAdminNav } from "../content/displayNav.js";
import { displayHeader } from "../content/displayHeader.js";
import { displayFooter } from "../content/displayFooter.js";

import { searchCups } from "../utils/searchCups.js";

import { getUsername } from "../utils/userStorage.js";

const username = getUsername();

export async function getData() {
  try {
    const assetsResponse = await fetch(imageUrl);
    const apiImage = await assetsResponse.json();

    const cupsResponse = await fetch(cupsUrl);
    const apiCups = await cupsResponse.json();

    if (username === "admin") {
      displayAdminNav(apiImage);
    } else {
      displayNav(apiImage);
    }

    searchCups(apiCups);
    displayProducts(apiCups);
    displayHeader(apiImage);
    displayFooter(apiImage);
  } catch (err) {
    console.log(err);
  } finally {
    const loading = document.querySelector(".loading");
    loading.style.display = "none";
  }
}

getData();
