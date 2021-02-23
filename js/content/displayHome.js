export function displayHome(apiImage, apiCups) {
  const mainContainer = document.querySelector("main");
  const featuredContainer = document.querySelector(".featured-container");

  featuredContainer.innerHTML = "";
  mainContainer.innerHTML = "";

  apiImage.forEach((image) => {
    mainContainer.innerHTML += `
      <section class="hero-section">
      
      <img src="${image.main_hero}" class="main-hero">
      <div class="hero-green"></div>
      </img>
       </section>
     `;
  });

  apiCups.forEach((cups) => {
    let onsale = "";
    let newProduct = "";
    let popular = "";

    if (cups.onSale) {
      onsale = `<div class="feature-style"><p class="feature-style-content">On sale</p></div>`;
    }
    if (cups.newInStore) {
      onsale = `<div class="feature-style"><p class="feature-style-content">New </p></div>`;
    }
    if (cups.popular) {
      onsale = `<div class="feature-style"><p class="feature-style-content">Popular</p></div>`;
    }

    if (cups.isFeatured) {
      featuredContainer.innerHTML += `
            
            <a href="details.html?id=${cups.id}">
            <div class="product-cards">
            <div>${onsale}</div>
            <div>${newProduct}</div>
            <div>${popular}</div>
            <img src="${cups.image_front}" class="product-img"></img>
            <div class="product-paragraph">
            <h3>${cups.title}</h3> 
            <div class="product-underline"></div>
            <p class="product-price-paragraph">$ ${cups.price}</p>
            </div>
            </div>
            </a>
          `;
    }
  });
}
