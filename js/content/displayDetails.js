import { getCurrentChart } from "../utils/storageItems.js";

export function displayDetails(apiImage, apiCups) {
  const chartItems = getCurrentChart();

  const mainContainer = document.querySelector("main");
  const detailsContainer = document.querySelector(".details-container");

  mainContainer.innerHTML = "";
  detailsContainer.innerHTML = "";

  apiImage.forEach((image) => {
    mainContainer.innerHTML += `
      <section class="hero">
      <div class="product-green"></div>
      <img src="${image.login_hero}" class="product-hero">
      </img>
       </section>
     `;
  });

  let onsale = "";
  let newProduct = "";
  let popular = "";
  let addedToCart = "";
  let addedToCartBtn = "Add to cart";

  if (apiCups.onSale) {
    onsale = `<div class="feature-style"><p class="feature-style-content">On sale</p></div>`;
  }
  if (apiCups.newInStore) {
    onsale = `<div class="feature-style"><p class="feature-style-content">New </p></div>`;
  }
  if (apiCups.popular) {
    onsale = `<div class="feature-style"><p class="feature-style-content">Popular</p></div>`;
  }

  const isInChart = chartItems.find((product) => {
    return parseInt(product.id) === apiCups.id;
  });

  if (isInChart) {
    addedToCart = `<p>${apiCups.title} is in cart </p>`;
    addedToCartBtn = "Remove from cart";
  }

  detailsContainer.innerHTML += `
  ${onsale}
  ${newProduct}
  ${popular}
  <div class="details-content">
  <div class="details-img-box">
  <img src="${apiCups.image_front}" class="details-img" id="detailsMainImg"></img>
  <div class="details-preview">
  <img src="${apiCups.image_front}" class="details-small-img" id="detailsImg"></img>
  <img src="${apiCups.image_back}" class="details-small-img" id="detailsImg"></img>
  </div>
  <div class="added-to-cart">
  ${addedToCart}
  </div>
  </div>
  <div class="details-box">
  <h1 class="details-headline"><span class="underline">${apiCups.title}</span></h1>
  <p class="details-price">$ ${apiCups.price}</p>
  <p class="description">${apiCups.description}</p>
  <button class="cta-btn add-to-chart" data-id="${apiCups.id}" data-name="${apiCups.title}" data-price="${apiCups.price}" data-image="${apiCups.image_front}"> ${addedToCartBtn}</button>
  </div>
  </div>
  `;

  document.title = apiCups.title;

  const detailsImg = document.querySelectorAll("#detailsImg");
  const detailsMainImg = document.querySelector("#detailsMainImg");

  let imgArray = [apiCups.image_back, apiCups.image_front];
  let img = 0;

  detailsImg.forEach((btn) => {
    btn.addEventListener("click", () => {
      detailsMainImg.src = imgArray[img];

      if (img === 1) {
        img = 0;
      } else {
        img++;
      }
    });
  });

  const chartButton = document.querySelector(".add-to-chart");
  chartButton.addEventListener("click", handleClick);

  function handleClick(e) {
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    const price = e.target.dataset.price;
    const image = e.target.dataset.image;

    const currentChartItems = getCurrentChart();

    const productExist = currentChartItems.find((product) => {
      return product.id === id;
    });

    if (!productExist) {
      const product = { id: id, name: name, price: price, image: image };

      currentChartItems.push(product);
      saveChart(currentChartItems);
    } else {
      const newChart = currentChartItems.filter((product) => product.id !== id);
      saveChart(newChart);
    }
    location.reload();
  }

  function saveChart(product) {
    localStorage.setItem("Inside Chart:", JSON.stringify(product));
  }
}
