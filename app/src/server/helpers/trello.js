let path = require('path');

let addCard = (title, description) => {
  var Trello = require("trello");

  var trello = new Trello(
    "f3e1a43e4f475432cc0a5fa3ffb845ab",
    "9a47ef308b4c782f0a1a28fca4cd9e9f68cc2cb625928d70ac54ea146fd106cc"
  );

  var boardId = '56e1898180ba8adbf2896a1b';//orders
  var listId = '56e1899925d3aae212258e3d';//list

  trello.addCard(title, description, listId,
    function (error, trelloCard) {
      if (error) {
        console.log('Could not add card:', error);
      }
      else {
        console.log('Added card:', trelloCard);
      }
  });
}

module.exports = { addCard }
