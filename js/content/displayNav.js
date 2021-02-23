import { getUsername, Logout } from "../utils/userStorage.js";
import { getCurrentChart } from "../utils/storageItems.js";

const pathname = document.location.pathname;

const chartItems = getCurrentChart();

const items = chartItems.length;

export function displayNav(apiImage) {
  const navContainer = document.querySelector("nav");

  navContainer.innerHTML = "";

  const loggedIn = getUsername();

  apiImage.forEach((image) => {
    navContainer.innerHTML += `
     
      <img src="${image.nav_image}" class="nav-img"></img>
      
      <ul class="nav-links">
      <li> <a href="index.html" class="${
        pathname === "/index.html" ? "active" : ""
      }"> Home </a> </li>
      <li>  <a href="products.html" class="${
        pathname === "/products.html" ? "active" : ""
      }"> Products </a></li>
      <li>  <a href="moomin.html" class="${
        pathname === "/moomin.html" ? "active" : ""
      }"> Moomin </a></li>
      </ul>
      <ul class="login-links">
      <li class="register-link">  <a href="register.html" class="${
        pathname === "/register.html" ? "active" : ""
      }"> Register </a></li>
      <li class="login-link">  <a href="login.html" class="${
        pathname === "/login.html" ? "active" : ""
      }"> Login </a></li>
      <a href="chart.html"><i class="fas fa-shopping-cart fa-2x shopping-cart"></i></a>
      <div class="inside-cart">${items}</div>
     
      </ul>
      <button class="hamburger" id="hamburger"> <i class="fas fa-bars lines"></i>
      </button>
      `;

    if (loggedIn) {
      navContainer.innerHTML = "";

      navContainer.innerHTML += `
     
        <img src="${image.nav_image}" class="nav-img"></img>
        <ul class="nav-links">
        <li> <a href="index.html" class="${
          pathname === "/index.html" ? "active" : ""
        }"> Home </a> </li>
        <li>  <a href="products.html" class="${
          pathname === "/products.html" ? "active" : ""
        }"> Products </a></li>
        <li>  <a href="moomin.html" class="${
          pathname === "/moomin.html" ? "active" : ""
        }"> Moomin </a></li>
        </ul>
        <ul class="login-links">
        <li class="register-link">  <a href="account.html" class="${
          pathname === "/account.html" ? "active" : ""
        }"> Account </a></li>
        <li class="login-link">  <a href="index.html" class="logout"> Logout </a></li>
        <a href="chart.html"><i class="fas fa-shopping-cart fa-2x shopping-cart"></i></a>
        <div class="inside-cart">${items}</div>
        </ul>
        <button class="hamburger" id="hamburger"> <i class="fas fa-bars lines"></i>
        </button>
        `;
      const logUserOut = document.querySelector(".logout");

      logUserOut.addEventListener("click", Logout);
    }

    const hamburger = document.querySelector("#hamburger");
    const navLinks = document.querySelector(".nav-links");
    const loginLinks = document.querySelector(".login-links");

    hamburger.addEventListener("click", () => {
      console.log("click");
      navContainer.classList.toggle("nav-hamburger");
      navLinks.classList.toggle("show-nav-links");
      loginLinks.classList.toggle("show-login");
    });
  });
}

export function displayAdminNav(apiImage) {
  const navContainer = document.querySelector("nav");

  navContainer.innerHTML = "";

  apiImage.forEach((image) => {
    navContainer.innerHTML += `
     
        <img src="${image.nav_image}" class="nav-img"></img>
        <ul class="nav-links">
        <li> <a href="index.html" class="${
          pathname === "/index.html" ? "active" : ""
        }"> Home </a> </li>
        <li>  <a href="products.html" class="${
          pathname === "/products.html" ? "active" : ""
        }"> Products </a></li>
        <li>  <a href="moomin.html" class="${
          pathname === "/moomin.html" ? "active" : ""
        }"> Moomin </a></li>
        </ul>
        <ul class="login-links">
        <li class="register-link">  <a href="admin.html" class="${
          pathname === "/admin.html" ? "active" : ""
        }"> Admin </a></li>
        <li class="login-link">  <a href="index.html" class="logout"> Logout </a></li>
        <a href="chart.html"><i class="fas fa-shopping-cart fa-2x shopping-cart"></i></a>
        <div class="inside-cart">${items}</div>
        </ul>
        <button class="hamburger" id="hamburger"> <i class="fas fa-bars lines"></i>
        </button>
        `;
    const logUserOut = document.querySelector(".logout");

    logUserOut.addEventListener("click", Logout);

    const hamburger = document.querySelector("#hamburger");
    const navLinks = document.querySelector(".nav-links");
    const loginLinks = document.querySelector(".login-links");

    hamburger.addEventListener("click", () => {
      navContainer.classList.toggle("nav-hamburger");
      navLinks.classList.toggle("show-nav-links");
      loginLinks.classList.toggle("show-login");
    });
  });
}
