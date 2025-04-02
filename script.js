let username = ""; // Variable to store the username
if (localStorage.getItem('username')) {
    username = localStorage.getItem('username'); // Retrieve the username from local storage
}

let connected = false; // Variable to track if the user is connected

const signButton = document.createElement('button');
signButton.setAttribute('class', 'signbutton')
signButton.textContent = 'Sign In';
signButton.style.backgroundColor = '#4CAF50'; // Green background
signButton.style.color = '#fff'; // White text color
signButton.style.border = 'none'; // No border
signButton.style.padding = '10px 20px'; // Padding for the button
signButton.style.borderRadius = '5px'; // Rounded corners
signButton.addEventListener('click', generateSignInForm);
signButton.setAttribute('aria-label', 'Open Sign In Form'); 
document.querySelector('.buttons').insertBefore(signButton,document.querySelector('a')); // Insert the button before the anchor tag



function generateSignInForm() {
    const formContainer = document.createElement('div');
    formContainer.classList.add('sign-in-form');

    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', 'index.php');

    // Username Label and Input
    const usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username');
    usernameLabel.textContent = 'Username:';
    form.appendChild(usernameLabel);

    const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('id', 'username');
    usernameInput.setAttribute('name', 'username');
    usernameInput.setAttribute('required', true);
    usernameInput.setAttribute('aria-label', 'Enter your username');
    form.appendChild(usernameInput);

    // Password Label and Input
    const passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.textContent = 'Password:';
    form.appendChild(passwordLabel);

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('id', 'password');
    passwordInput.setAttribute('name', 'password');
    passwordInput.setAttribute('required', true);
    passwordInput.setAttribute('aria-label', 'Enter your password');
    form.appendChild(passwordInput);

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Sign In';
    submitButton.addEventListener('click', () => {
        // Validate input before hiding form
        if (usernameInput.value && passwordInput.value) {
            username = usernameInput.value; // Get the username from the input field
            localStorage.setItem('username', username);
             // Store the username
            console.log("Username:", username); // Log the username
            connected = true; // Set connected to true
            formContainer.style.display = 'none';
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
    submitButton.style.backgroundColor = '#4CAF50'; // Green background
    submitButton.setAttribute('aria-label', 'Submit Sign In Form');
    form.appendChild(submitButton);

    // Append everything to the container
    formContainer.appendChild(form);
    document.body.appendChild(formContainer);

    formContainer.style.display = 'flex';
    formContainer.style.flexDirection = 'column';
    formContainer.style.alignItems = 'center';
    formContainer.style.justifyContent = 'center';
    formContainer.style.position = 'absolute';
    formContainer.style.top = '50%';
    formContainer.style.left = '25%';
    formContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    formContainer.style.borderRadius = '10px';
}
let chronoText = ''; // Variable to store the time for saving
function nameLevel(levelC) {
    switch (levelC) {
        case 1:
            return '1-facile';
        case 2:
            return '2-moyen';
        case 3:
            return '3-difficile';
        default:
            return 'inconnu';
    }
} // Closing brace added here
// Sauvegarde des données de jeu via l'API
function saveGame() {
    console.log("Saving game data...");
    if (!scoreValue || !chronoText || !levelC) {
        alert("Les données de jeu sont invalides. Veuillez réessayer.");
        return;
    }
    
    if (username) {
        console.log("Username:", username);
        // Construction de l'URL avec les paramètres nécessaires
        let newURL = `ranking.php?username=${encodeURIComponent(username)}&coup=${encodeURIComponent(scoreValue)}&time=${encodeURIComponent(chronoText)}&level=${encodeURIComponent(nameLevel(levelC))}`;
        console.log("URL à ouvrir :", newURL);

        // Redirection vers la page pour sauvegarder les scores
        window.location.href = newURL;
    } else {
        alert("Veuillez entrer un nom d'utilisateur valide.");
    }
}

let levelC = 1;
const cardBackground = ['url("./images/carte1.jpg")','url("./images/carte2.jpg")','url("./images/carte3.jpg")',
                        'url("./images/carte4.jpg")','url("./images/carte5.jpg")','url("./images/carte6.jpg")',
                        'url("./images/carte7.jpg")','url("./images/carte8.jpg")','url("./images/carte9.jpg")',
                        'url("./images/carte10.jpg")','url("./images/carte11.jpg")','url("./images/carte12.jpg")',
                        'url("./images/carte13.jpg")','url("./images/carte14.jpg")','url("./images/carte15.jpg")',
                        'url("./images/carte16.jpg")','url("./images/carte17.jpg")','url("./images/carte18.jpg")']
                     // Path to the card background images
function setLevel(newLevel) {
    levelC = newLevel;
    console.log(`Level set to ${levelC}`);
    document.querySelector('.buttons').display = 'none'; // Hide the button after level selection
    document.querySelector('.start-button').display ='block'
    
}


let game = false;
function generateCards(numberOfCards) {
    const cardsContainer = document.querySelector('.grid-table');
    cardsContainer.style.gridTemplateColumns = `repeat(${Math.sqrt(numberOfCards)}, 1fr)`;
    cardsContainer.style.gridTemplateRows = `repeat(${Math.sqrt(numberOfCards)}, 1fr)`;
    cardsContainer.style.gap = '30px'; // Add gap between cards
    cardsContainer.innerHTML = ''; // Clear existing cards
    const cardValues = [];
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
let scoreValue = 0;  
function startGame() {
    console.log(levelC);
    switch (levelC) {    
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
    
    docuument.querySelector('.grid-table').innerHTML = '';
    
    document.querySelector('.chrono').remove(); // Remove existing chrono
    document.querySelector('.score').remove(); // Remove existing score
}
    game = true; // Set game state to true
    document.querySelector('.buttons').style.display = 'none'; // Hide the button after starting the game
    const chrono = document.createElement('div');
    chrono.classList.add('chrono');
    chrono.style.position = 'absolute';
    chrono.style.top = '10px';
    chrono.style.left = '10px';
    chrono.style.fontSize = '20px';
    document.querySelector('.grid-table').appendChild(chrono);
    let seconds = 0;
    let minutes = 0;
    let interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        
        // Update the chrono display
        chrono.textContent = `time: ${minutes}m ${seconds}s`;
        chronoText = `${minutes}m ${seconds}s`; // Store the time in a variable for saving
    }, 1000); // Update every second
    if(game == false){
        clearInterval(interval); // Clear the previous interval
    }
    const score = document.createElement('div');
    score.classList.add('score');
    score.style.position = 'absolute';
    score.style.top = '10px';
    score.style.right = '10px';
    score.style.fontSize = '20px';
    document.querySelector('.grid-table').appendChild(score);
    score.textContent = `Score: ${scoreValue}`; // Update score display
    game = true;
    document.querySelector('.start-button').textContent = 'Restart Game'; // Change button text to "Restart Game"
    const cardsContainer = document.querySelector('.grid-table');
    const cards = Array.from(cardsContainer.children);
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('flipped') && !card.classList.contains('matched') && document.querySelectorAll('.flipped').length < 2) {
                // Check if the card is already flipped or matched
                scoreValue += 1; // Increment score by 10 for each card flipped
                document.querySelector('.score').textContent = `Score: ${scoreValue}`; // Update score display

                flipCard(card);
                
                setTimeout(() => {
                checkMatch(card);
               }, 1000); 
                
            }
        });})
    
    
    }
    
function flipCard(card) {
    if (card.classList.contains('noflipped')) {
        card.classList.remove('noflipped');
    }
    setTimeout(() => {
        card.style.backgroundImage = cardBackground[card.dataset.card]; }, 500); // Set the background image of the card
    card.classList.add('flipped');

}

function reflipCard(card) { 
    setTimeout(() => {card.style.backgroundImage = ''; },500)
    card.classList.remove('flipped');
    card.classList.add('noflipped')
}




function checkMatch(card) {
    const flippedCards = document.querySelectorAll('.flipped');
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        // Check if the cards match
        if (firstCard.dataset.card === secondCard.dataset.card) {
            firstCard.classList.add('matched','valide');
            secondCard.classList.add('matched','valide');
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            
            firstCard.style.pointerEvents = 'none'; 
            secondCard.style.pointerEvents = 'none'; 
            const allMatched = document.querySelectorAll('.matched');
            if (allMatched.length === document.querySelectorAll('.carte').length) {
                setTimeout(() => {
                    if (document.querySelector('#maVariable').value){
                        saveGame(); // Save game data if connected
                    }
                    document.querySelector('.buttons').style.display = 'block'; // Show the button again
                    
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