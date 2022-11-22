let socket = io('/host');

window.addEventListener('load', () => {
    document.getElementById('get-question1').addEventListener('click', () => {
        socket.emit('getquestion1');
    })
    document.getElementById('get-question2').addEventListener('click', () => {
        socket.emit('getquestion2');
    })
    document.getElementById('get-question3').addEventListener('click', () => {
        socket.emit('getquestion3');
    })
    document.getElementById('get-question4').addEventListener('click', () => {
        socket.emit('getquestion4');
    })
    document.getElementById('get-answer').addEventListener('click', () => {
        socket.emit('getanswer');
    })
})

socket.on('results', (data)=> {
    console.log(data);
    document.getElementById('player-answers').innerHTML = '';
    for(let i = 0; i < data.length; i++) {
        let string1 = "Player: " + data[i].name;
        let string2 = "Question: " + data[i].number;
        let string3 = "Choice: " + data[i].answer;
        let elt1 = document.createElement('p');
        let elt2 = document.createElement('p');
        let elt3 = document.createElement('p');
        elt1.innerHTML = string1;
        elt2.innerHTML = string2;
        elt3.innerHTML = string3;
        document.getElementById('player-answers').appendChild(elt1);
        document.getElementById('player-answers').appendChild(elt2);
        document.getElementById('player-answers').appendChild(elt3);
    }
})

socket.on('question', (data)=> {
    console.log(data);
    document.getElementById('question').innerHTML = data.question;
})