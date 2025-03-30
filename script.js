// script.js
let levelc = 1;
function setLevel(newLevel) {
    levelc = newLevel;
    console.log(`Level set to ${levelc}`);
    document.querySelector('.buttons').display = 'none'; // Hide the button after level selection
}


let game = false;
function generateCards(numberOfCards) {
    const cardsContainer = document.querySelector('.grid-table');
    cardsContainer.style.gridTemplateColumns = `repeat(${Math.sqrt(numberOfCards)}, 1fr)`;
    cardsContainer.style.gridTemplateRows = `repeat(${Math.sqrt(numberOfCards)}, 1fr)`;
    cardsContainer.style.gap = '10px'; // Add gap between cards
    cardsContainer.innerHTML = ''; // Clear existing cards
    const cardValues = [];
    
    // Generate pairs of card values
    for (let i = 0; i < numberOfCards / 2; i++) {
        cardValues.push(i, i);
    }
    
    // Shuffle the card values
    cardValues.sort(() => Math.random() - 0.5);
    
    // Create card elements
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('carte');
        card.dataset.card = value;
        cardsContainer.appendChild(card);
    });
}
function startGame() {
    console.log(levelc);
    switch (levelc) {    
        case 1:
            generateCards(4); // 4 pairs
            break;
        case 2:
            generateCards(16); // 8 pairs
            break;
        case 3:
            generateCards(36); // 18 pairs
            break;
        default:
            console.error('Invalid level selected');
            return;
    }
if (game == true){
    docuument.querySelector('.grid-table').innerHTML = '';}
    game = true;
    document.querySelector('.start-button').textContent = 'Restart Game';
    const cardsContainer = document.querySelector('.grid-table');
    const cards = Array.from(cardsContainer.children);
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('flipped') && !card.classList.contains('matched')) {
                flipCard(card);
                setTimeout(() => {
                checkMatch(card);
               }, 1000); 
                
            }
        });})
    
    
    }
    
function flipCard(card) {
    card.classList.toggle('flipped');
}

function reflipCard(card) { 
    
    card.classList.remove('flipped');
}




function checkMatch(card) {
    const flippedCards = document.querySelectorAll('.flipped');
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        // Check if the cards match
        if (firstCard.dataset.card === secondCard.dataset.card) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            // Check if all cards are matched
            const allMatched = document.querySelectorAll('.matched');
            if (allMatched.length === document.querySelectorAll('.carte').length) {
                setTimeout(() => {
                    alert('Congratulations! You matched all the cards!');
                    game = false;
                    document.querySelector('.start-button').textContent = 'Start Game';
                }, 500); // Delay before showing the alert
            }
        } else {
            setTimeout(() => {
                reflipCard(firstCard);
                reflipCard(secondCard);
            }, 1000);
        }
    }
}