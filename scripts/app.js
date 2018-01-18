const SPEED = 2;

var AIoutput = function(input) {
    return {'x':1/(1+1/Math.exp(-2.006671109693907-13.337789487281682*(1/(1+1/Math.exp(6.324687880278037-5.139094023478103*(input['0'])+0.009873405629696023*(input['1'])-0.08384310758438314*(input['2'])-0.007782195430831659*(input['3']))))+15.479915860329328*(1/(1+1/Math.exp(1.2422598953404802+4.278458047188069*(input['0'])-0.026834652527315192*(input['1'])+0.09669907703133201*(input['2'])+0.0037817803982278064*(input['3']))))+0.09924013652485578*(1/(1+1/Math.exp(-1.1433750537938492+0.05931132638707718*(input['0'])+1.2188743723993942*(input['1'])+0.011299175174647482*(input['2'])+0.04629387131903781*(input['3'])))))),'y':1/(1+1/Math.exp(-6.303780631126409+0.620901361105022*(1/(1+1/Math.exp(6.324687880278037-5.139094023478103*(input['0'])+0.009873405629696023*(input['1'])-0.08384310758438314*(input['2'])-0.007782195430831659*(input['3']))))-0.654085201915954*(1/(1+1/Math.exp(1.2422598953404802+4.278458047188069*(input['0'])-0.026834652527315192*(input['1'])+0.09669907703133201*(input['2'])+0.0037817803982278064*(input['3']))))+16.639170232945734*(1/(1+1/Math.exp(-1.1433750537938492+0.05931132638707718*(input['0'])+1.2188743723993942*(input['1'])+0.011299175174647482*(input['2'])+0.04629387131903781*(input['3']))))))}
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

    }

    AI(player){
        let coord = getDefultCoord(AIoutput(setNetInput(NormalizeCoord(this.x,this.y),NormalizeCoord(player.x,player.y))));
        console.log(this.x - coord.x)
        this.moveByVector(limiter(-this.x + coord.x,-1,1), limiter(-this.y + coord.y,-1,1));
        function limiter(value,min,max){
            if(value <= min ) return min;
            if(value >= max ) return max;
            return value;
        }
    }
}
$(window).ready(()=>{
    var player = new Player({
        x: 50,
        y: 100,
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