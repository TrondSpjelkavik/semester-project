export function displayAccount() {
  const value = localStorage.getItem("userKey");

  const user = JSON.parse(value);

  const productsContainer = document.querySelector(".account-container");

  productsContainer.innerHTML = "";

  productsContainer.innerHTML += `
  <div class="account-box">
    <h1 class="account-headline"> ${user.username} </h1>
    <h4> You are our customer number ${user.id}! Thank you </h4>
    <h4> You created your account on ${new Date(user.created_at)} </h4>
    <h4> We confirm that your account is <strong> ${
      user.role.type
    } </strong> </h4>
    </div>
`;
}
