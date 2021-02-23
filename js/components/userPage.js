import { imageUrl } from "../settings/api.js";

import { displayNav } from "../content/displayNav.js";
import { displayHeader } from "../content/displayHeader.js";
import { displayAccount } from "../content/displayAccount.js";
import { displayFooter } from "../content/displayFooter.js";

export async function getData() {
  try {
    const assetsResponse = await fetch(imageUrl);
    const apiImage = await assetsResponse.json();

    displayNav(apiImage);
    displayHeader(apiImage);
    displayAccount();
    displayFooter(apiImage);
  } catch (err) {
    console.log(err);
  }
}

getData();
