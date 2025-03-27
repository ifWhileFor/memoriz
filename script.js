// script.js
function flipCard(cardElement) {
  if (cardElement.classList.contains('flipped')) {
    cardElement.classList.remove('flipped');
    cardElement.classList.add('noflipped');

  }
  else {
    const cardInner = cardElement;
    cardInner.classList.toggle('flipped');
    cardInner.classList.remove('noflipped');
    
  }
}