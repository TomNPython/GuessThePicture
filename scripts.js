// Array of objects, each object has image-link, answer-name and questions as key-value pairs

// Hidden image (blurred to start) on left side with space for word underneath

// Right side has button to reveal another clue, list of clues under revealed
// one by one. 

//Game intro at top above both, with timer and score next to



// Game Answers
const gameInfo = [
    {
        imageLink: 'https://images.pexels.com/photos/2103946/pexels-photo-2103946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        answer: 'Coconut',
        clues: ['It has hair.', 'It is white inside', 'It has water inside.']
    },
    {
        imageLink: 'https://images.pexels.com/photos/2267338/pexels-photo-2267338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        answer: 'Flag',
        clues: ['You can wave it.', 'Every country has one.', 'It can have many colours.']
    },
    {
        imageLink: 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        answer: 'Beach',
        clues: ['You can swim near it.', 'It can be yellow or white.', 'You can play games at it.']
    }
]


//Elements

const answerImage = document.getElementById('answer-image');
const answerName = document.getElementById('answer-name');
const score = document.getElementById('score');
const timer = document.getElementById('timer');
const start = document.getElementById('start');
const clueButton = document.getElementById('clue-button');
const clueList = document.getElementById('clue-list');
const guess = document.getElementById('guess')
const wrongGuesses = document.getElementById('wrong-guesses')


//Scripts

function startGame() {
    resetGame()
    let randInt = Math.floor((Math.random()) * gameInfo.length)
    
    let picture = document.createElement('img')
    picture.src = gameInfo[randInt].imageLink;
    picture.style.maxHeight = '200px';
    picture.style.maxWidth = '200px';
    // picture.style.filter = 'blur(3rem)'
    picture.classList.add('blurred')
    answerImage.appendChild(picture);

    let answerClues = gameInfo[randInt].clues;
    answerClues.forEach(clue => {
        let clues = document.createElement('li');
        clues.innerHTML = clue;
        clues.classList.add('hidden')
        clues.classList.add('clue');
        clueList.appendChild(clues)
    })

    let name = document.createElement('p');
    name.innerHTML = gameInfo[randInt].answer;
    name.classList.add('hidden')
    name.classList.add('correct-answer')
    answerName.appendChild(name)
}

let index = 0

function giveClue(){
    console.log(index)
    console.log('button clicked')
    function show() {
        let listOfClues = Array.from(document.getElementsByClassName('clue'));
        console.log(document.getElementsByClassName('clue'))
        if (index < listOfClues.length) {
        listOfClues[index].classList.remove('hidden')
        console.log(listOfClues)
        index++
        console.log(index)
        } else {
            let noMore = document.createElement('p');
            noMore.innerHTML = 'No more clues!'
            clueList.appendChild(noMore);
        }
    }
    show()
}

function guessAnswer(e) {
    e.preventDefault()
    let image = Array.from(document.getElementsByClassName('blurred'))
    let guessedAnswer = document.getElementById('guessed-answer').value
    let correctAnswer = Array.from(document.getElementsByClassName('correct-answer'))[0].innerHTML
    
    if (guessedAnswer.toLowerCase() == correctAnswer.toLowerCase()) {
        let congrats = document.createElement('h1');
        wrongGuesses.innerHTML = ''
        congrats.innerHTML = 'Congratulations!'
        wrongGuesses.appendChild(congrats)
        image[0].classList.remove('blurred')
    } else {
        let commis = document.createElement('h1');
        commis.innerHTML = `Nope, not '${guessedAnswer}'. Try Again!`;
        wrongGuesses.appendChild(commis)
    }
}

function resetGame() {
    answerName.innerHTML = '';
    answerImage.innerHTML = '';
    clueList.innerHTML = '';
    wrongGuesses.innerHTML = '';
    index = 0

}



// Event Listeners
start.addEventListener('click', startGame)
clueButton.addEventListener('click', giveClue)
guess.addEventListener('submit', guessAnswer)
