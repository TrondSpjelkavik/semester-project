import { getCurrentChart } from "../utils/storageItems.js";

export function removeCartItem(e) {
  const id = e.target.dataset.id;

  const currentCartItems = getCurrentChart();

  console.log(currentCartItems);

  const newCart = currentCartItems.filter((cup) => cup.id !== id);
  saveChart(newCart);

  function saveChart(cup) {
    localStorage.setItem("Inside Chart:", JSON.stringify(cup));
  }

  location.reload();
}
