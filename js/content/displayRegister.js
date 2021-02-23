import { saveToken, saveUser } from "../utils/userStorage.js";
import { baseUrl } from "../settings/api.js";
import { displayMessage } from "../functions/displayMessage.js";

export async function displayRegister(apiImage) {
  const registerContainer = document.querySelector(".register-container");

  registerContainer.innerHTML = "";

  apiImage.forEach((image) => {
    registerContainer.innerHTML += `
        <div class="register-box">
        <img src="${image.footer_image}" class="register-img"></img>
        <div class="register-input-box">
        <h1 class="login-headline">Re<span class="underline">gist</span>er</h1>
        <form class="register-form">
        <div class="username-input">
        <i class="fas fa-user login-icon"></i>
          <input class="login-input" id="username" placeholder="Username" />
        </div>
        <div class="email-input">
        <i class="fas fa-envelope login-icon"></i>
          <input class="login-input" id="email" placeholder="Email" />
        </div>
        <div class="password-input">
        <i class="fas fa-lock login-icon"></i>
          <input class="login-input" id="password" type="password" placeholder="Password" />
        </div>
        <div class="password-input">
        <i class="fas fa-lock login-icon"></i>
          <input class="login-input" id="rePassword" type="password" placeholder="Re-type Password" />
        </div>
        <div class="message-container"></div>
          <button class="cta-btn register-btn">Register</button>
        </form>
        </div>
        </div>
        `;
  });

  const form = document.querySelector("form");
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const rePassword = document.querySelector("#rePassword");

  form.addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();

    const usernameValue = username.value.trim();
    let passwordValue = password.value.trim();
    let rePasswordValue = rePassword.value.trim();
    const emailValue = email.value.trim();

    if (usernameValue.length < 2) {
      displayMessage(
        "danger",
        "please type in a valid username",
        ".message-container"
      );
    }

    if (passwordValue !== rePasswordValue) {
      displayMessage("danger", "passwords don't match", ".message-container");
    }
    register(usernameValue, passwordValue, emailValue);
  }

  async function register(username, password, email) {
    const url = baseUrl + "/auth/local/register";

    const data = JSON.stringify({
      username: username,
      password: password,
      email: email,
    });

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

      if (data.user) {
        saveToken(data.jwt);
        saveUser(data.user);
        displayMessage(
          "success",
          "Logged In! Redirecting..",
          ".message-container"
        );
        let timeoutCounter;

        timeoutCounter = window.setTimeout(redirect, 2000);

        function redirect() {
          location.href = "index.html";
        }
      }
      if (!data.user) {
        displayMessage(
          "error",
          "Wrong email or password",
          ".message-container"
        );
      }
      if (data.error) {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
