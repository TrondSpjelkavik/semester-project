export function displayFooter(apiImage) {
  const footerContainer = document.querySelector("footer");

  footerContainer.innerHTML = "";

  apiImage.forEach((image) => {
    footerContainer.innerHTML += `
     <div class="footer-list">
     <i class="fab fa-twitter fa-3x footer-icon"></i>
     <i class="fab fa-instagram fa-3x footer-icon"></i>
     <i class="fab fa-pinterest-p fa-3x footer-icon"></i>
     <i class="fab fa-facebook-square fa-3x footer-icon"></i>
       <img src="${image.footer_image}" class="footer-img"> </img>
        </div>
      `;
  });
}
