import { imageUrl } from "../settings/api.js";

import { displayNav } from "../content/displayNav.js";
import { displayLogin } from "../content/displayLogin.js";
import { displayFooter } from "../content/displayFooter.js";

export async function getData() {
  try {
    const assetsResponse = await fetch(imageUrl);
    const apiImage = await assetsResponse.json();

    displayNav(apiImage);
    displayLogin(apiImage);
    displayFooter(apiImage);
  } catch (err) {
    console.log(err);
  }
}

getData();
