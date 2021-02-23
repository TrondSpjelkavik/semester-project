import { imageUrl } from "../settings/api.js";

import { displayNav, displayAdminNav } from "../content/displayNav.js";
import { displayFooter } from "../content/displayFooter.js";

import { getUsername } from "../utils/userStorage.js";

import { displayCart } from "../content/displayCart.js";

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

    displayCart();
    displayFooter(apiImage);
  } catch (err) {
    console.log(err);
  }
}

getData();
