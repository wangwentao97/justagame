let express = require('express');
let app = express();
app.use('/', express.static('public'));

let players;
let result = [];

//questions
let quiz = [{
    question : "1. Choose an option.",
    options : ["+1 point", "If you are the only one choosing, +3", "If most players choose this, they +2"]
}, {
    question : "2. If the number of player choosing 1 more than 2, then 1 and 2 switch.",
    options : ["+2 points", "-2 points", "+0 points"]
}, {
    question : "3. If no player chooses 2, all players -3 points.",
    options : ["+1 point", "-1 point", "+0 points"]
},
{
    question : "4. Choose an option.",
    options : ["-1 point", "-0 point, if you are the highest, clear your points", "-2 points"]
}];

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

let host = io.of('/host');
let player = io.of('/player');

host.on('connection', (socket) => {
    console.log('host socket connected' + socket.id);
    socket.on('getquestion1',()=> {
        console.log("send question1");
        //send the question + answer to the host client
        let hostdata1 = {
            number : 1,
            question : quiz[0].question
        };
        host.emit('question', hostdata1);
        //send the question + options  to the player client
        let playerdata1 = {
            number : 1,
            question : quiz[0].question,
            options : quiz[0].options
        };
        player.emit('question', playerdata1);
    })

    socket.on('getquestion2',()=> {
        console.log("send question2");
        //send the question + answer to the host client
        let hostdata2 = {
            number : 2,
            question : quiz[1].question
        };
        host.emit('question', hostdata2);
        //send the question + options  to the player client
        let playerdata2 = {
            number : 2,
            question : quiz[1].question,
            options : quiz[1].options
        };
        player.emit('question', playerdata2);
    })

    socket.on('getquestion3',()=> {
        console.log("send question3");
        //send the question + answer to the host client
        let hostdata3 = {
            number : 3,
            question : quiz[2].question
        };
        host.emit('question', hostdata3);
        //send the question + options  to the player client
        let playerdata3 = {
            number : 3,
            question : quiz[2].question,
            options : quiz[2].options
        };
        player.emit('question', playerdata3);
    })

    socket.on('getquestion4',()=> {
        console.log("send question4");
        //send the question + answer to the host client
        let hostdata4 = {
            number : 4,
            question : quiz[3].question
        };
        host.emit('question', hostdata4);
        //send the question + options  to the player client
        let playerdata4 = {
            number : 4,
            question : quiz[3].question,
            options : quiz[3].options
        };
        player.emit('question', playerdata4);
    })

    socket.on('getanswer', () => {
        host.emit('results', result);
    })
})

player.on('connection', (socket) => {
    console.log('player socket connected : ' + socket.id);
     //on receiving answer from the client
    socket.on('answer', (data) => {
        console.log(data);
        players = data;
        result.push(players);
    })
})