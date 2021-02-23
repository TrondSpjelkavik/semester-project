import { saveToken, saveUser } from "../utils/userStorage.js";
import { baseUrl } from "../settings/api.js";
import { displayMessage } from "../functions/displayMessage.js";

export async function displayLogin(apiImage) {
  const loginContainer = document.querySelector(".login-container");

  loginContainer.innerHTML = "";

  apiImage.forEach((image) => {
    loginContainer.innerHTML += `
        <div class="login-box">
        <img src="${image.moomintroll}" class="login-img"></img>
        <div class="login-input-box">
        <h1 class="login-headline">L<span class="underline">ogi</span>n</h1>
        <form class="login-form">
          <div class="username-input">
          <i class="fas fa-user login-icon"></i>
            <input class="login-input" id="username" type="email" placeholder="Email" />
          </div>
          <div class="password-input">
          <i class="fas fa-lock login-icon"></i>
            <input class="login-input" id="password" type="password" placeholder="Password" />
          </div>
          <div class="message-container"></div>
          <button class="cta-btn login-btn">Login</button>
        </form>
        </div>
        </div>
        `;
  });

  const form = document.querySelector("form");
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");

  form.addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    Login(usernameValue, passwordValue);
  }

  async function Login(username, password) {
    const url = baseUrl + "/auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.success);
      if (data.user) {
        saveToken(data.jwt);
        saveUser(data.user);
        displayMessage(
          "success",
          "Logged In! Redirecting..",
          ".message-container"
        );
      }

      if (!data.user) {
        displayMessage(
          "error",
          "Wrong email or password",
          ".message-container"
        );
      }

      let timeoutCounter;

      timeoutCounter = window.setTimeout(redirect, 2000);

      function redirect() {
        if (data.user.role.type === "admin") {
          location.href = `admin.html?id=${data.user.username}`;
        } else {
          location.href = `index.html?id=${data.user.username}`;
        }
      }
      if (data.error) {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
