export function displayCup(apiCups) {
  const productsContainer = document.querySelector(".edit-cup-container");

  productsContainer.innerHTML = "";

  let onsale = "";
  let newProduct = "";
  let popular = "";

  if (apiCups.onSale) {
    onsale = `<div class="feature-style"><p class="feature-style-content">On sale</p></div>`;
  }
  if (apiCups.newInStore) {
    onsale = `<div class="feature-style"><p class="feature-style-content">New </p></div>`;
  }
  if (apiCups.popular) {
    onsale = `<div class="feature-style"><p class="feature-style-content">Popular</p></div>`;
  }

  productsContainer.innerHTML += `
${onsale}
${newProduct}
${popular}
<div class="details-img-box">
<img src="${apiCups.image_front}" class="details-img" id="detailsMainImg"></img>
<div class="details-preview">
<img src="${apiCups.image_front}" class="details-small-img" id="detailsImg"></img>
<img src="${apiCups.image_back}" class="details-small-img" id="detailsImg"></img>
</div>
</div>
<div class="details-box">
<h1 class="details-headline"><span class="underline">${apiCups.title}</span></h1>
<p class="details-price">$ ${apiCups.price}</p>
<p class="description">${apiCups.description}</p>
</div>
`;

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
}
