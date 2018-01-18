var prevTraining = localStorage.getItem('train')?localStorage.getItem('train'):null;
var net =  new brain.NeuralNetwork();

if (prevTraining) net.fromJSON(JSON.parse(prevTraining));

//training settings
var netTrainingSettings = {
    errorThresh: 0.000001,
    iterations: 5000000,
    log: true,           
    logPeriod: 5000,     
    learningRate: 0.3,
}
const HEIGHT = 750;
const WIDTH = 1200;

//getting and adding date table with examples. Using in training
var dataTable = localStorage.getItem('data')?JSON.parse(localStorage.getItem('data')):[];
dataTable.push(addRandomTrueData());
localStorage.setItem('data',JSON.stringify(dataTable));

//training example
/*var data = [{input: setNetInput(NormalizeCoord(0,0),NormalizeCoord(0,0)), output: NormalizeCoord(0,0)},
            {input: setNetInput(NormalizeCoord(100,100),NormalizeCoord(50,100)), output: NormalizeCoord(90,100)},
            {input: setNetInput(NormalizeCoord(90,100),NormalizeCoord(50,100)), output: NormalizeCoord(80,100)},
            {input: setNetInput(NormalizeCoord(80,100),NormalizeCoord(50,100)), output: NormalizeCoord(70,100)},
            {input: setNetInput(NormalizeCoord(200,50),NormalizeCoord(7,51)), output: NormalizeCoord(190,40)},
            {input: setNetInput(NormalizeCoord(200,51),NormalizeCoord(7,51)), output: NormalizeCoord(190,51)}]
*/

//comented = off training
//net.train(dataTable,netTrainingSettings);

//testing neural network
var output = net.run(setNetInput(NormalizeCoord(300,100),NormalizeCoord(7,51)));
console.log(getDefultCoord(output));

//localStorage.setItem("train", JSON.stringify(net.toJSON()));

//autoreload for training
//window.location.reload(true);

var run = net.toFunction();
console.log(run.toString()); // copy and paste result function in app.js 


//random true data for training
function addRandomTrueData(){
    let x1 = Math.floor(Math.random() * WIDTH);
    let y1  = Math.floor(Math.random() * HEIGHT);
    let x2 = Math.floor(Math.random() * WIDTH);
    let y2  = Math.floor(Math.random() * HEIGHT);

    let rx = x1==x2?x1:(x1>x2?x1-10:x1+10);
    let ry = y1==y2?y1:(y1>y2?y1-10:y1+10);

    console.log(x1 + " " + y1 + " - " + x2 + " " + y2 + " Result - " + rx + " " + ry);

    return {input: setNetInput(NormalizeCoord(x1,y1),NormalizeCoord(x2,y2)), output: NormalizeCoord(rx,ry)}
}

//getting coords from [0,1] style
function getDefultCoord(normCoord){

    let x = normCoord.x*WIDTH;
    let y = normCoord.y*HEIGHT;

    return {x,y};

}
//normalizing for setting data in [0,1]
function NormalizeCoord(x,y){
    const d1 = 0, d2 = 1;

    nx = (x*d2)/WIDTH;
    ny = (y*d2)/HEIGHT;

    return {x: nx, y: ny};
    
}
//setting array for input
function setNetInput(coord1,coord2){
    return [coord1.x,coord1.y,coord2.x,coord2.y,]
}


