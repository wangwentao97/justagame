let socket = io('/host');

let Q1 = [];
let Q2 = [];
let Q3 = [];
let Q4 = [];

let Q1answers1 = {};
let Q1answers2 = {};
let Q1answers3 = {};

let Q2answers1 = {};
let Q2answers2 = {};
let Q2answers3 = {};

let Q3answers1 = {};
let Q3answers2 = {};
let Q3answers3 = {};

let Q4answers1 = {};
let Q4answers2 = {};
let Q4answers3 = {};

let AllName = [];
let AllPoint = [];

window.addEventListener('load', () => {
    document.getElementById('get-question1').addEventListener('click', () => {
        socket.emit('getquestion1');
        startCountdown(60);
    })
    document.getElementById('get-question2').addEventListener('click', () => {
        socket.emit('getquestion2');
        startCountdown(60);
    })
    document.getElementById('get-question3').addEventListener('click', () => {
        socket.emit('getquestion3');
        startCountdown(60);
    })
    document.getElementById('get-question4').addEventListener('click', () => {
        socket.emit('getquestion4');
        startCountdown(60);
    })
    document.getElementById('get-answer').addEventListener('click', () => {
        socket.emit('getanswer');
        document.getElementById("timer").style.display = "none";
    })
    document.getElementById('send-answer').addEventListener('click', () => {
        socket.emit('sendanswer', AllPoint);
    })
})

socket.on('results', (data)=> {
    //console.log(data);
    document.getElementById('player-answers').innerHTML = '';

    //count the number of people choosing each option
    Q1.splice(0, 3);
    Q2.splice(0, 3);
    Q3.splice(0, 3);
    Q4.splice(0, 3);

    let q1o1 = 0;
    let q1o2 = 0;
    let q1o3 = 0;
    let q2o1 = 0;
    let q2o2 = 0;
    let q2o3 = 0;
    let q3o1 = 0;
    let q3o2 = 0;
    let q3o3 = 0;
    let q4o1 = 0;
    let q4o2 = 0;
    let q4o3 = 0;

    for(let i = 0; i < data.length; i++){

        //showing all the result with words 
        // let string1 = "Player: " + data[i].name;
        // let string2 = "Question: " + data[i].number;
        // let string3 = "Choice: " + data[i].answer;
        // let elt1 = document.createElement('p');
        // let elt2 = document.createElement('p');
        // let elt3 = document.createElement('p');
        // elt1.innerHTML = string1;
        // elt2.innerHTML = string2;
        // elt3.innerHTML = string3;
        // document.getElementById('player-answers').appendChild(elt1);
        // document.getElementById('player-answers').appendChild(elt2);
        // document.getElementById('player-answers').appendChild(elt3);

        //record all the names 

        if (AllName.includes(data[i].name) == false){
            AllName.push(data[i].name);
            let PPoints = {
                name: data[i].name,
                point: 0
            }
            AllPoint.push(PPoints);
        }

        //count all the number of each options
        if (data[i].number == 1){
            if (data[i].answer == 1){
                q1o1++;

                //add 1 point to the player chooing this option
                data[i].point += 1;
            } else if (data[i].answer == 2){
                q1o2++;
            } else if (data[i].answer == 3){
                q1o3++;
            }
        } else if (data[i].number == 2){
            if (data[i].answer == 1){
                q2o1++;
            } else if (data[i].answer == 2){
                q2o2++;
            } else if (data[i].answer == 3){
                q2o3++;
            }
        } else if (data[i].number == 3){
            if (data[i].answer == 1){
                q3o1++;

                //add 1 point to the player chooing this option
                data[i].point += 1;
            } else if (data[i].answer == 2){
                q3o2++;

                //minus 1 point to the player chooing this option
                data[i].point -= 1;
            } else if (data[i].answer == 3){
                q3o3++;
            }
        } else if (data[i].number == 4){
            if (data[i].answer == 1){
                q4o1++;
            } else if (data[i].answer == 2){
                q4o2++;
            } else if (data[i].answer == 3){
                q4o3++;
            }
        } 
    }

    //calculate the points for questions 1
    if (q1o2 == 1){
        for (let i = 0; i < data.length; i++){
            if (data[i].number == 1 && data[i].answer == 2){
                data[i].point += 3;
            }
        }
    } 

    if (q1o3 > (q1o1 + q1o2 + q1o3) / 2 ){
        for (let i = 0; i < data.length; i++){
            if (data[i].number == 1 && data[i].answer == 3){
                data[i].point += 2;
            }
        }
    }

    //calculate the points for question 2
    if (q2o1 > q2o2){
        for (let i = 0; i < data.length; i++){
            if (data[i].number == 2){
                if (data[i].answer == 1){
                    data[i].point -= 2;
                } else if (data[i].answer == 2){
                    data[i].point += 2;
                }
            }
        }
    } else if (q2o1 < q2o2 || q2o1 == q2o2){
        for (let i = 0; i < data.length; i++){
            if (data[i].number == 2){
                if (data[i].answer == 1){
                    data[i].point += 2;
                } else if (data[i].answer == 2){
                    data[i].point -= 2;
                }
            }
        }
    }

    //calculate the points for question 3
    if (q3o2 == 0){
        for (let i = 0; i < data.length; i++){
            if (data[i].number == 3){
                data[i].point -= 3;
            }
        }
    }

    //add points to each name
    for (let i = 0; i < AllPoint.length; i++){
        for (let j = 0; j < data.length; j++){
            if (AllPoint[i].name == data[j].name){
                AllPoint[i].point += data[j].point;
            }
        }
    }


    //calculate the points for question 4
    let largest;
    largest = AllPoint[0].point;
    for (let i = 0; i < AllPoint.length; i++){
        if (largest < AllPoint[i].point) {
            largest = AllPoint[i].point;
        }
    }

    for (let i = 0; i < data.length; i++){
        if (data[i].number == 4 && data[i].answer == 1){
            for (let j = 0; j < AllPoint.length; j++){
                if (AllPoint[j].name == data[i].name){
                    AllPoint[j].point -= 1;
                }
            }
        } else if (data[i].number == 4 && data[i].answer == 2){
            for (let j = 0; j < AllPoint.length; j++){
                if (AllPoint[j].name == data[i].name){
                    if (AllPoint[j].point == largest){
                        AllPoint[j].point = 0;
                    } 
                }
            }
        } else if (data[i].number == 4 && data[i].answer == 3){
            for (let j = 0; j < AllPoint.length; j++){
                if (AllPoint[j].name == data[i].name){
                    AllPoint[j].point -= 2;
                }
            }
        }
    }
    console.log(data);
    console.log(AllPoint);

    //show the points
    for (let i = 0; i < AllPoint.length; i++) {
        let string1 = "Player: " + AllPoint[i].name;
        let string2 = "Points: " + AllPoint[i].point;
        let elt1 = document.createElement('p');
        let elt2 = document.createElement('p');
        elt1.innerHTML = string1;
        elt2.innerHTML = string2;
        document.getElementById('player-answers').appendChild(elt1);
        document.getElementById('player-answers').appendChild(elt2);
    }
   


    //put the number of each option in an arrey
    Q1answers1 = {
        name: "Option 1",
        count: q1o1
    }
    Q1answers2 = {
        name: "Option 2",
        count: q1o2
    }

    Q1answers3 = {
        name: "Option 3",
        count: q1o3
    }

    Q2answers1 = {
        name: "Option 1",
        count: q2o1
    }
    Q2answers2 = {
        name: "Option 2",
        count: q2o2
    }

    Q2answers3 = {
        name: "Option 3",
        count: q2o3
    }
    Q3answers1 = {
        name: "Option 1",
        count: q3o1
    }
    Q3answers2 = {
        name: "Option 2",
        count: q3o2
    }

    Q3answers3 = {
        name: "Option 3",
        count: q3o3
    }

    Q4answers1 = {
        name: "Option 1",
        count: q4o1
    }
    Q4answers2 = {
        name: "Option 2",
        count: q4o2
    }

    Q4answers3 = {
        name: "Option 3",
        count: q4o3
    }

    Q1.push(Q1answers1);
    Q1.push(Q1answers2);
    Q1.push(Q1answers3);

    Q2.push(Q2answers1);
    Q2.push(Q2answers2);
    Q2.push(Q2answers3);

    Q3.push(Q3answers1);
    Q3.push(Q3answers2);
    Q3.push(Q3answers3);

    Q4.push(Q4answers1);
    Q4.push(Q4answers2);
    Q4.push(Q4answers3);
    //console.log(Q1);

    //visualize the number of each option using d3
    let pieArcData1 = d3.pie().value(d => d.count)(Q1)
    let arcPie1 = d3.arc()
        .innerRadius(210)
        .outerRadius(310)
        .padRadius(300)
        .padAngle(2 / 300)
        .cornerRadius(8)

    let Q1HTML = '';
    pieArcData1.map(d => {
        Q1HTML += 
            `
            <path fill="steelblue" d="${arcPie1(d)}"></path>
            <text fill="white" transform="translate(${arcPie1.centroid(d).join(",")})">
            <tspan x="0" font-size="24">${d.data.name}</tspan>
            <tspan x="0" font-size="12" dy="1.3em">${d.value.toLocaleString("en")}</tspan>
            </text>
            `
    })
    document.getElementById("visual1").innerHTML = Q1HTML;

    let pieArcData2 = d3.pie().value(d => d.count)(Q2)
    let arcPie2 = d3.arc()
        .innerRadius(210)
        .outerRadius(310)
        .padRadius(300)
        .padAngle(2 / 300)
        .cornerRadius(8)

    let Q2HTML = '';
    pieArcData2.map(d => {
        Q2HTML += 
            `
            <path fill="red" d="${arcPie2(d)}"></path>
            <text fill="white" transform="translate(${arcPie2.centroid(d).join(",")})">
            <tspan x="0" font-size="24">${d.data.name}</tspan>
            <tspan x="0" font-size="12" dy="1.3em">${d.value.toLocaleString("en")}</tspan>
            </text>
            `
    })
    document.getElementById("visual2").innerHTML = Q2HTML;

    let pieArcData3 = d3.pie().value(d => d.count)(Q3)
    let arcPie3 = d3.arc()
        .innerRadius(210)
        .outerRadius(310)
        .padRadius(300)
        .padAngle(2 / 300)
        .cornerRadius(8)

    let Q3HTML = '';
    pieArcData3.map(d => {
        Q3HTML += 
            `
            <path fill="yellow" d="${arcPie3(d)}"></path>
            <text fill="black" transform="translate(${arcPie3.centroid(d).join(",")})">
            <tspan x="0" font-size="24">${d.data.name}</tspan>
            <tspan x="0" font-size="12" dy="1.3em">${d.value.toLocaleString("en")}</tspan>
            </text>
            `
    })
    document.getElementById("visual3").innerHTML = Q3HTML;

    let pieArcData4 = d3.pie().value(d => d.count)(Q4)
    let arcPie4 = d3.arc()
        .innerRadius(210)
        .outerRadius(310)
        .padRadius(300)
        .padAngle(2 / 300)
        .cornerRadius(8)

    let Q4HTML = '';
    pieArcData4.map(d => {
        Q4HTML += 
            `
            <path fill="green" d="${arcPie4(d)}"></path>
            <text fill="black" transform="translate(${arcPie4.centroid(d).join(",")})">
            <tspan x="0" font-size="24">${d.data.name}</tspan>
            <tspan x="0" font-size="12" dy="1.3em">${d.value.toLocaleString("en")}</tspan>
            </text>
            `
    })
    document.getElementById("visual4").innerHTML = Q4HTML;
})

socket.on('question', (data)=> {
    //console.log(data);
    document.getElementById('question').innerHTML = data.question;
})

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