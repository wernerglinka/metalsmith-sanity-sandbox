/* global window, document, localStorage */

import loadSanityImage from "./modules/load-sanity-image";
import slides from "./modules/slides";

function initPage() {
  
  loadSanityImage.init();
  slides.init();
 
}

window.addEventListener("load", function() {
  initPage();
});
