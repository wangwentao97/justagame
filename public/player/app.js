let socket = io('/player');
let isAnswered = false;
let playerId;
let num;

window.addEventListener('load', () => {
    playerId = window.prompt('What is your name?');
    document.getElementById('greeting').innerHTML = "Welcome " + playerId;
    createOptionButtons();
})

socket.on('question', (data)=> {
    isAnswered = false;
    console.log(data);
    document.body.style.background = "#ffffff";
    let options = data.options;
    num = data.number;
    document.getElementById('questions').innerHTML = data.question;
    populateOptions(data.options);
    startCountdown(60);
})

/* Functions to populate the HTML via javascript */

// function : create the option buttons on page load
function createOptionButtons() {
    for(let i = 0; i < 3; i++) {
        let button = document.createElement('button');
        let buttonSpan = document.createElement('span');
        buttonSpan.classList.add("button-span");
        button.innerHTML = 1+i;
        button.classList.add("button-options");
        
        // when user selects answer
        button.onclick = () => {
            if(isAnswered == false) { 
                socket.emit('answer', {name: playerId, number: num, answer: i + 1, point: 0});
                isAnswered = true;
                document.body.style.background = "#b2b2b2";
            }
        }
        button.appendChild(buttonSpan);
        document.getElementById('answers').appendChild(button);
    }
}

socket.on('finalResults', (data)=> {
    document.getElementById("answers").style.display = "none";
    document.getElementById("timer").style.display = "none";
    let largest;
    largest = data[0].point;
    for (let i = 0; i < data.length; i++){
        if (largest < data[i].point) {
            largest = data[i].point;
        }
    }
    for (let i = 0; i < data.length; i++){
        if (data[i].point == largest) {
            if (data[i].name == playerId){
                document.getElementById('questions').innerHTML = "You Win!";
                document.body.style.background = "#fc7b03";
            } else {
                document.getElementById('questions').innerHTML = "You Lose!";
                document.body.style.background = "#03bafc";
          }
        }
        let string1 = "Player: " + data[i].name;
        let string2 = "Points: " + data[i].point;
        let elt1 = document.createElement('p');
        let elt2 = document.createElement('p');
        elt1.innerHTML = string1;
        elt2.innerHTML = string2;
        document.getElementById('answers-container').appendChild(elt1);
        document.getElementById('answers-container').appendChild(elt2);
    }
})

//function : populate the options when question is asked
function populateOptions(options) {
    let optionsElt = document.getElementsByClassName('button-span');
    for(let i = 0; i < optionsElt.length; i++ ){
        optionsElt[i].innerHTML = options[i];
    }
}

function startCountdown(seconds) {
    let counter = seconds;
    document.getElementById("timer").innerHTML = "";
    const interval = setInterval(() => {
        counter--;
        document.getElementById("timer").innerHTML = "Time Left: " + counter;
          
        if (counter < 0 ) {
            clearInterval(interval);
            document.getElementById("timer").innerHTML = "Next";
        }
    }, 1000);
}