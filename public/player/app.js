let socket = io('/player');
let isAnswered = false;
let playerId;
let num;

window.addEventListener('load', () => {
    playerId = window.prompt('What is your name?');
    document.getElementById('questions').innerHTML = "Welcome " + playerId;
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
              socket.emit('answer', {name: playerId, number: num, answer: i + 1});
              isAnswered = true;
              document.body.style.background = "#b2b2b2";
              if(num == 1) {
                if(i == 0) {
                  window.open("https://vimeo.com/manage/videos/773737220");
                } else if(i == 1) {
                  window.open("https://vimeo.com/manage/videos/773740863");
                } else if(i == 2) {
                  window.open("https://vimeo.com/manage/videos/773741201");
                }
              } else if(num == 2) {
                if(i == 0) {
                  window.open("https://vimeo.com/manage/videos/773741658");
                } else if(i == 1) {
                  window.open("https://vimeo.com/manage/videos/773741843");
                } else if(i == 2) {
                  window.open("https://vimeo.com/manage/videos/773741991");
                }
              } else if(num == 3) {
                if(i == 0) {
                  window.open("https://vimeo.com/manage/videos/773742155");
                } else if(i == 1) {
                  window.open("https://vimeo.com/manage/videos/773742340");
                } else if(i == 2) {
                  window.open("https://vimeo.com/manage/videos/773742795");
                }
              } else if(num == 4) {
                if(i == 0) {
                  window.open("https://vimeo.com/manage/videos/773742931");
                } else if(i == 1) {
                  window.open("https://vimeo.com/manage/videos/773743081");
                } else if(i == 2) {
                  window.open("https://vimeo.com/manage/videos/773743235");
                }
              }
          }
        }
      button.appendChild(buttonSpan);
      document.getElementById('answers').appendChild(button);
    }
  }

//function : populate the options when question is asked
function populateOptions(options) {
    let optionsElt = document.getElementsByClassName('button-span');
    for(let i = 0; i < optionsElt.length; i++ ){
      optionsElt[i].innerHTML = options[i];
    }
}