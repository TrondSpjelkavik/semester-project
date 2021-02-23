export function displayMoomin(apiImage) {
  const moominContainer = document.querySelector(".moomin-container");

  moominContainer.innerHTML = "";

  apiImage.forEach((image) => {
    moominContainer.innerHTML += `
      <h2 class="moomin-headline">Who<span class="underline"> is Moo</span>min?</h2>
      <div class="about-moomin">
      <div class="moomin-paragraph">
      <p><strong>Moomin is probably the most known and adored Finnish icon, if not before, then right after Santa Claus. </strong></p>
      <p> The white, hippo-like Moomins are Finnish literature characters created by the much‐loved Swedish‐speaking Finn, writer and artist Tove Jansson in the 1940’s.  After the initial success of the comic strips and books, Moomins grew into a world-wide phenomenon through puppet animations, theatre shows and Japanese-style cartoons. </p>
      </div>
       <img src="${image.moomintroll}" class="moomin-img"> </img>
       <div class="moomin-grass"></div>
       </div>

      `;
  });
}
