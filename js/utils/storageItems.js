export function getCurrentChart() {
  const cartItem = localStorage.getItem("Inside Chart:");

  if (!cartItem) {
    return [];
  } else {
    return JSON.parse(cartItem);
  }
}

export function getCurrentFeatured() {
  const featured = localStorage.getItem("Featured Product:");

  if (!featured) {
    return [];
  } else {
    return JSON.parse(featured);
  }
}
