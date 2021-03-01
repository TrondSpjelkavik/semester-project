import { getToken } from "../utils/userStorage.js";
import { cupsUrl } from "../settings/api.js";
import { displayMessage } from "../functions/displayMessage.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
  document.location.href = "home.html";
}

let detailsUrl = cupsUrl + "/" + id;

export function displayEdit(apiCups) {
  const editContainer = document.querySelector(".edit-container");

  editContainer.innerHTML = "";

  editContainer.innerHTML += `
    <h1 class="admin-headline">E<span class="underline">di</span>t</h1>
    <div class="edit-cup">
    <div class="edit-input-box">
    <h2 class="add-headline">Edit a cup</h2>
    <form id="updateProducts" class="edit-form">
      <div class="admin-input">
      <i class="fas fa-edit add-icon"></i>
        <input class="edit-input" id="title" type="text" placeholder="Title" />
      </div>
      <div class="admin-input">
      <i class="fas fa-edit add-icon"></i>
        <input class="edit-input" id="price" type="number" placeholder="Price" />
      </div>
      <div class="admin-input" >
      <i class="fas fa-edit add-icon"></i>
         <input class="edit-input" id="imageFront" type="text" placeholder="Image front" />
       </div>
       <div class="admin-input">
       <i class="fas fa-edit add-icon"></i>
         <input class="edit-input" id="imageBack" type="text" placeholder="Image back" />
       </div>
       <div class="admin-input">
       <i class="fas fa-edit add-icon"></i>
         <textarea class="edit-description-input" id="description" placeholder="Description" ></textarea>
       </div>
       <div>
       </div>
       <div class="message-container"></div>
      <button type="submit" class="cta-btn add-btn">Update cup</button>
     
    </form>
    </div>
  </div>

    `;
  const title = document.querySelector("#title");
  const price = document.querySelector("#price");
  const imageFront = document.querySelector("#imageFront");
  const imageBack = document.querySelector("#imageBack");
  const description = document.querySelector("#description");

  document.title = apiCups.title;

  title.value = `${apiCups.title}`;
  price.value = `${apiCups.price}`;
  imageFront.value = `${apiCups.image_front}`;
  imageBack.value = `${apiCups.image_back}`;
  description.value = `${apiCups.description}`;

  const updateProducts = document.querySelector("#updateProducts");

  updateProducts.addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();

    const titleValue = title.value;
    const priceValue = price.value;
    const imageFrontValue = imageFront.value;
    const imageBackValue = imageBack.value;
    const descriptionValue = description.value;

    submitNewCup(
      titleValue,
      priceValue,
      imageFrontValue,
      imageBackValue,
      descriptionValue
    );
  }

  async function submitNewCup(
    title,
    price,
    imageFront,
    imageBack,
    description
  ) {
    const url = detailsUrl;

    const token = getToken();

    const data = JSON.stringify({
      title: title,
      price: price,
      image_front: imageFront,
      image_back: imageBack,
      description: description,
    });

    const options = {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.updated_at) {
        displayMessage("success", "Cup is updated", ".message-container");
        let timeoutCounter;

        timeoutCounter = window.setTimeout(reloadPage, 1000);

        function reloadPage() {
          location.reload();
        }
      }

      if (data.error) {
        displayMessage(
          "error",
          `Sorry, an error ocurred: ${data.error}`,
          ".message-container"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
