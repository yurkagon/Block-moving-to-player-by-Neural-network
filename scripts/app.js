const SPEED = 2;

//function that made by neural network
var AIoutput = function(input) {
    return {'x':1/(1+1/Math.exp(-5.744704791523695+14.263537923410247*(1/(1+1/Math.exp(-0.8805351300050027+1.3559682438285972*(input['0'])+0.034716405982830635*(input['1'])+0.01164882555595909*(input['2'])+0.00459710290424416*(input['3']))))-0.8096091188590291*(1/(1+1/Math.exp(2.0526681063266694-0.015041343070332003*(input['0'])+3.9088502536934757*(input['1'])+0.0009153852083564358*(input['2'])+0.11953452686826888*(input['3']))))-1.2183217638789918*(1/(1+1/Math.exp(-6.93949915411895+0.0023227920376443154*(input['0'])+4.412374721870764*(input['1'])+0.024343092162103026*(input['2'])+0.13719712380703308*(input['3'])))))),'y':1/(1+1/Math.exp(-30.810973418380403+0.028632642094086305*(1/(1+1/Math.exp(-0.8805351300050027+1.3559682438285972*(input['0'])+0.034716405982830635*(input['1'])+0.01164882555595909*(input['2'])+0.00459710290424416*(input['3']))))+30.951222977375025*(1/(1+1/Math.exp(2.0526681063266694-0.015041343070332003*(input['0'])+3.9088502536934757*(input['1'])+0.0009153852083564358*(input['2'])+0.11953452686826888*(input['3']))))+39.88680294225567*(1/(1+1/Math.exp(-6.93949915411895+0.0023227920376443154*(input['0'])+4.412374721870764*(input['1'])+0.024343092162103026*(input['2'])+0.13719712380703308*(input['3']))))))}
}
class Tank{
    constructor(position){
        this.obj = $('<div/>').addClass('tank');
        this.setPosition(position.x,position.y);
        $('body').append(this.obj);
    }

    setPosition(x,y){
        this.obj.css({
            left: x + 'px',
            top: y + 'px',
        })
    }

    moveByVector(x,y){
        this.obj.css({
            left: parseInt(this.obj.css("left")) + SPEED*x + 'px',
            top: parseInt(this.obj.css("top")) + SPEED*y + 'px',
        })
    }

    get x(){
        return parseInt(this.obj.css("left"));
    }
    get y(){
        return parseInt(this.obj.css("top"));
    }
}
class Player extends Tank{
    constructor(position){
        super(position);
        this.obj.addClass("player");
    }
}
class Enemy extends Tank{
    constructor(position){
        super(position);

        
        this._moveVector = {x: 0, y: 0};
        this._changeVectorTimer = 100;
        this._changeVectorCoolDown = 0;
    }
    
    AImoveVector(player){
        if(this._changeVectorCoolDown == 0 ){
            let coord = getDefultCoord(AIoutput(setNetInput(NormalizeCoord(this.x,this.y),NormalizeCoord(player.x,player.y))));
            this._moveVector = {
                x: limiter(-this.x + coord.x)?limiter(-this.x + coord.x):this._moveVector.x,
                y: limiter(-this.y + coord.y)?limiter(-this.y + coord.y):this._moveVector.y,
            };

            this._changeVectorCoolDown = this._changeVectorTimer;

            function limiter(value,min,max){
                if(value >= 0.1 ) return 1;
                if(value <= -0.1 ) return -1;
                return 0;
            }
        }
        this._changeVectorCoolDown -= 1;
        if(this._changeVectorCoolDown < 0) this._changeVectorCoolDown = 0;
    }

    AI(player){
       if(this._moveVector.x || this._moveVector.y) this.moveByVector(this._moveVector.x,this._moveVector.y);
       this.AImoveVector(player);
       
    }

}
$(window).ready(()=>{
    var player = new Player({
        x: 300,
        y: 300,
    })
    
    var enemies = []
    enemies.push(new Enemy({
        x: 1000,
        y: 100,
    }));


    //control
    var toUp, toDown, toLeft, toRight;
    toUp=toDown=toLeft=toRight = false;
    setInterval(()=>{
        if(toUp) player.moveByVector(0,-1);
        else if(toDown) player.moveByVector(0,1);
        else if(toLeft) player.moveByVector(-1,0);
        else if(toRight) player.moveByVector(1,0);

        enemies.forEach(enemy => {
            enemy.AI(player);
        });
    },10)
    $('body').keydown(function (e) {
        //toUp=toDown=toLeft=toRight = false;
        if (e.keyCode == 37 || e.keyCode == 65 ) toLeft = true;
        if (e.keyCode == 39 || e.keyCode == 68 ) toRight = true;
        if (e.keyCode == 38 || e.keyCode == 87 ) toUp = true;
        if (e.keyCode == 40 || e.keyCode == 83 ) toDown = true; 
        //if (e.keyCode == 82) restartGame();
    });
    $('body').keyup(function (e) {
        if (e.keyCode == 37 || e.keyCode == 65 ) toLeft = false;
        if (e.keyCode == 39 || e.keyCode == 68 ) toRight = false;
        if (e.keyCode == 38 || e.keyCode == 87 ) toUp = false;
        if (e.keyCode == 40 || e.keyCode == 83 ) toDown = false;
    });
    
})