import { removeCartItem } from "../functions/removeCartItem.js";
import { getCurrentChart } from "../utils/storageItems.js";

export function displayCart() {
  const cartItems = getCurrentChart();

  const sumPrice = [];

  const cartContainer = document.querySelector(".chart-container");

  if (cartItems.length === 0) {
    cartContainer.innerHTML = `<h1 class="empty-cart"> Cart is empty </h1>`;
  }

  document.title = cartItems.length + " cups in cart";

  cartItems.forEach((cup) => {
    cartContainer.innerHTML += `
    <div class="cart">
    <img src="${cup.image}" class="cart-img"> </img>
    <div class="cart-box">
    <h5 class="cart-box-headline">Title</h5>
    <p>${cup.name}</p>
    </div>
    <div class="cart-box">
    <h5 class="cart-box-headline">Price</h5>
    <p  class="cart-price">$ ${cup.price} </p>
    </div>
    <a href="details.html?id=${cup.id}" class="cta-btn">View cup</a>
    <i class="fas fa-times-circle fa-2x remove-cart-item" data-id="${cup.id}" data-name="${cup.name}" data-price="${cup.price}" data-image="${cup.image}"></i>
    </div>
    `;

    const removeItem = document.querySelectorAll(".remove-cart-item");

    removeItem.forEach((item) => {
      item.addEventListener("click", removeCartItem);
    });

    sumPrice.push(cup.price);
  });

  function getSum(total, num) {
    return total + Math.round(num);
  }

  const totalPriceAmount = sumPrice.reduce(getSum, 0);

  const totalPrice = document.querySelector(".total");

  if (totalPriceAmount) {
    totalPrice.innerHTML += `
  <div class="total-price">Total price: $ <strong>${totalPriceAmount}</strong></div>
  `;
  }
}
