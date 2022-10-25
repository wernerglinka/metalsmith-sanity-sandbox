/* global window, document, localStorage */

import loadSanityImage from "./modules/load-sanity-image";

function initPage() {
  
  loadSanityImage.init();
 
}

window.addEventListener("load", function() {
  initPage();
});
