import { imageUrl } from "../settings/api.js";

import { displayNav } from "../content/displayNav.js";
import { displayRegister } from "../content/displayRegister.js";
import { displayFooter } from "../content/displayFooter.js";

export async function getData() {
  try {
    const assetsResponse = await fetch(imageUrl);
    const apiImage = await assetsResponse.json();

    displayNav(apiImage);
    displayRegister(apiImage);
    displayFooter(apiImage);
  } catch (err) {
    console.log(err);
  }
}

getData();
