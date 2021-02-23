import { displayProducts } from "../content/displayProducts.js";

export function searchCups(cups) {
  const search = document.querySelector(".search");

  search.onkeyup = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();

    const filterCups = cups.filter((cup) => {
      let cupName = cup.title.toLowerCase().includes(searchValue);

      if (cupName) {
        return true;
      }
    });

    displayProducts(filterCups);
  };
}
