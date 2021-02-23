import { imageUrl, cupsUrl } from "../settings/api.js";

import { displayAdminNav } from "../content/displayNav.js";
import { displayCup } from "../content/displayCup.js";
import { displayEdit } from "../content/displayEdit.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "admin.html";
}

let detailsUrl = cupsUrl + "/" + id;

export async function getData() {
  try {
    const assetsResponse = await fetch(imageUrl);
    const apiImage = await assetsResponse.json();

    const cupsResponse = await fetch(detailsUrl);
    const apiCups = await cupsResponse.json();

    displayCup(apiCups);
    displayAdminNav(apiImage);
    displayEdit(apiCups);
  } catch (err) {
    console.log(err);
  }
}

getData();
