export function displayHeader(apiImage) {
  const mainContainer = document.querySelector("main");

  mainContainer.innerHTML = "";

  apiImage.forEach((image) => {
    mainContainer.innerHTML += `
      <section class="hero">
      <div class="product-green"></div>
      <img src="${image.product_hero}" class="product-hero">
      </img>
       </section>
     `;
  });
}
