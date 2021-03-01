import { cupsUrl } from "../settings/api.js";

import { getToken } from "../utils/userStorage.js";

import { displayMessage } from "../functions/displayMessage.js";

export function displayAdminPanel(apiCups) {
  const adminContainer = document.querySelector(".admin-container");
  const addCupContainer = document.querySelector(".add-cup-container");

  addCupContainer.innerHTML = "";
  adminContainer.innerHTML = "";

  addCupContainer.innerHTML += `
    <h1 class="admin-headline">Admin Panel</h1>
    <div class="add-new-cup">
      <div class="edit-input-box">
        <h2 class="add-headline">Add <span class="underline">new</span> cup</h2>
          <form id="newProducts" class="edit-form">
            <div class="admin-input">
              <i class="fas fa-plus add-icon"></i>
              <input class="edit-input" id="title" type="text" placeholder="Title" />
            </div>
            <div class="admin-input">
              <i class="fas fa-plus add-icon"></i>
              <input class="edit-input" id="price" type="number" placeholder="Price" />
            </div>
            <div class="admin-input" >
              <i class="fas fa-plus add-icon"></i>
              <input class="edit-input" id="imageFront" type="text" placeholder="Image front" />
            </div>
            <div class="admin-input">
              <i class="fas fa-plus add-icon"></i>
              <input class="edit-input" id="imageBack" type="text" placeholder="Image back" />
            </div>
            <div class="admin-input">
              <i class="fas fa-plus add-icon"></i>
              <textarea class="edit-description-input" id="description" placeholder="Description" ></textarea>
            </div>
            <div class="feature-choice">
              <input type="checkbox" name="choice-radio"  id="featureThisCup">
              Feature this cup
            </div>
            <div class="feature-choice">
              <input type="checkbox" name="choice-radio"  id="onSale">
              On sale
            </div>
            <div class="feature-choice">
              <input type="checkbox" name="choice-radio"  id="newInStore">
              New product
            </div>
            <div class="feature-choice">
              <input type="checkbox" name="choice-radio"  id="popularCup">
              Popular
            </div> 
            <div class="message-container"></div>   
            <button type="submit" class="cta-btn add-btn">Add a new cup</button>
           
          </form>
      </div>
  </div>
  
  `;

  const newProducts = document.querySelector("#newProducts");
  const title = document.querySelector("#title");
  const price = document.querySelector("#price");
  const imageFront = document.querySelector("#imageFront");
  const imageBack = document.querySelector("#imageBack");
  const description = document.querySelector("#description");
  const featureThisCup = document.querySelector("#featureThisCup");
  const onSale = document.querySelector("#onSale");
  const newInStore = document.querySelector("#newInStore");
  const popularCup = document.querySelector("#popularCup");

  newProducts.addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();

    const titleValue = title.value;
    const priceValue = price.value;
    const imageFrontValue = imageFront.value;
    const imageBackValue = imageBack.value;
    const descriptionValue = description.value;
    const featureThisCupValue = featureThisCup.checked;
    const onSaleValue = onSale.checked;
    const newInStoreValue = newInStore.checked;
    const popularCupValue = popularCup.checked;

    submitNewCup(
      titleValue,
      priceValue,
      imageFrontValue,
      imageBackValue,
      descriptionValue,
      featureThisCupValue,
      onSaleValue,
      newInStoreValue,
      popularCupValue
    );
  }

  async function submitNewCup(
    title,
    price,
    imageFront,
    imageBack,
    description,
    featured,
    onsale,
    newInStore,
    popular
  ) {
    const url = cupsUrl;

    const token = getToken();

    const data = JSON.stringify({
      title: title,
      price: price,
      image_front: imageFront,
      image_back: imageBack,
      description: description,
      isFeatured: featured,
      onSale: onsale,
      newInStore: newInStore,
      popular: popular,
    });

    const options = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.created_at) {
        displayMessage("success", "Cup Added", ".message-container");

        let timeoutCounter;
        timeoutCounter = window.setTimeout(reload, 1000);

        function reload() {
          location.reload();
        }
      }

      if (data.error) {
        displayMessage("error", "Please try again", ".message-container");
      }
    } catch (error) {
      console.log(error);
    }
  }

  apiCups.forEach((cups) => {
    let featuredCup = "far";
    let salesIcon = "far";
    let newIcon = "far";
    let popularIcon = "far";

    const isFeatured = cups.isFeatured === true;
    const isOnSale = cups.onSale === true;
    const isNewInStore = cups.newInStore === true;
    const isPopular = cups.popular === true;

    if (isFeatured) {
      featuredCup = "fas";
    }

    if (isOnSale) {
      salesIcon = "fas";
    }

    if (isNewInStore) {
      newIcon = "fas";
    }
    if (isPopular) {
      popularIcon = "fas";
    }

    adminContainer.innerHTML += `
      <div class="admin-cards">
        <img src="${cups.image_front}" class="admin-img"></img>
          <p class="admin-paragraph">${cups.title}</p>
            <div class="product-underline"></div>
              <p class="admin-price-paragraph">$ ${cups.price}</p>
                <div class="button-container">
                  <a href="edit.html?id=${cups.id}" data-id="${cups.id}" data-name="${cups.title}" class="update-button"><i class="fas fa-edit"></i></a>
                  <i class="fas fa-trash trash-button" id="deleteBtn" data-id="${cups.id}" data-name="${cups.title}"></i> 
                  <i class="${featuredCup} fa-flag featured-cup"  data-id="${cups.id}" data-isfeatured="${cups.isFeatured}"></i>
                </div>
            <div class="admin-selection">
                <div class="admin-selection-type">
                    On sale     
                    <i class="${salesIcon} fa-square fa-2x sale-icon"  data-id="${cups.id}"  data-onsale="${cups.onSale}"></i> 
                </div>
                <div class="admin-selection-type">    
                  New
                  <i class="${newIcon} fa-square fa-2x new-icon"  data-id="${cups.id}" data-new="${cups.newInStore}"></i> 
                </div>
                <div class="admin-selection-type">     
                  Popular
                  <i class="${popularIcon} fa-square fa-2x popular-icon"  data-id="${cups.id}" data-popular="${cups.popular}"></i> 
                </div>
            </div>
      </div>
      
      `;

    const deleteBtn = document.querySelectorAll("#deleteBtn");
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;

        const doDelete = confirm(`Are you sure you want to delete ${name}`);

        if (doDelete) {
          const url = cupsUrl + "/" + id;
          const token = getToken();

          const options = {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const response = await fetch(url, options);
            const json = await response.json();
            if (json) {
              location.reload();
            }
          } catch (err) {
            console.log(err);
          }
        }
      });
    });

    const featuredButton = document.querySelectorAll(".featured-cup");

    featuredButton.forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        e.target.classList.toggle("fas");
        e.target.classList.toggle("far");
        const id = e.target.dataset.id;
        let featured = e.target.dataset.isfeatured;

        if (featured === "false") {
          featured = "true";
        } else if (featured === "true") {
          featured = "false";
        }

        const url = cupsUrl + "/" + id;

        const token = getToken();

        const data = JSON.stringify({ isFeatured: featured });

        const options = {
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const featureResponse = await fetch(url, options);
          const json = await featureResponse.json();
          if (json) {
            location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      });
    });

    const salesButton = document.querySelectorAll(".sale-icon");

    salesButton.forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        e.target.classList.toggle("fas");
        e.target.classList.toggle("far");
        const id = e.target.dataset.id;
        let sales = e.target.dataset.onsale;

        if (sales === "false") {
          sales = "true";
        } else if (sales === "true") {
          sales = "false";
        }

        const url = cupsUrl + "/" + id;

        const token = getToken();

        const data = JSON.stringify({ onSale: sales });

        const options = {
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const featureResponse = await fetch(url, options);
          const json = await featureResponse.json();
          if (json) {
            location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      });
    });

    const newButton = document.querySelectorAll(".new-icon");

    newButton.forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        e.target.classList.toggle("fas");
        e.target.classList.toggle("far");
        const id = e.target.dataset.id;
        let newIcon = e.target.dataset.new;

        if (newIcon === "false") {
          newIcon = "true";
        } else if (newIcon === "true") {
          newIcon = "false";
        }

        const url = cupsUrl + "/" + id;

        const token = getToken();

        const data = JSON.stringify({ newInStore: newIcon });

        const options = {
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const featureResponse = await fetch(url, options);
          const json = await featureResponse.json();
          if (json) {
            location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      });
    });

    const popularButton = document.querySelectorAll(".popular-icon");

    popularButton.forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        e.target.classList.toggle("fas");
        e.target.classList.toggle("far");
        const id = e.target.dataset.id;
        let popularIcon = e.target.dataset.popular;

        if (popularIcon === "false") {
          popularIcon = "true";
        } else if (popularIcon === "true") {
          popularIcon = "false";
        }

        const url = cupsUrl + "/" + id;

        const token = getToken();

        const data = JSON.stringify({ popular: popularIcon });

        const options = {
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const featureResponse = await fetch(url, options);
          const json = await featureResponse.json();
          if (json) {
            location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      });
    });
  });
}
