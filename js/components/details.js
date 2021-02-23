import { imageUrl, cupsUrl } from "../settings/api.js";

import { displayDetails } from "../content/displayDetails.js";
import { displayNav, displayAdminNav } from "../content/displayNav.js";
import { displayFooter } from "../content/displayFooter.js";

import { getUsername } from "../utils/userStorage.js";

const username = getUsername();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "index.html";
}

const detailsUrl = cupsUrl + "/" + id;

export async function getData() {
  try {
    const assetsResponse = await fetch(imageUrl);
    const apiImage = await assetsResponse.json();

    const cupsResponse = await fetch(detailsUrl);
    const apiCups = await cupsResponse.json();

    if (username === "admin") {
      displayAdminNav(apiImage);
    } else {
      displayNav(apiImage);
    }

    displayDetails(apiImage, apiCups);
    displayFooter(apiImage);
  } catch (err) {
    console.log(err);
  }
}

getData();
