"use strict";

(() => {

  let backgroundImageUrl = document.getElementById('background-image').getAttribute('data-url');

  document.getElementById('background-image').style.backgroundImage = 'url(' + backgroundImageUrl + ')';

})();
