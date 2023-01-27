var rand = function (min, max) {k = Math.floor(Math.random() * (max - min) + min); return (Math.round( k / s) * s);}
var newA = function () {a = [rand(0, innerWidth),rand(0, innerHeight)];},
	newB = function () {sBody = [{x: 0,y: 0}];}
    var score = 0; //initialize score variable
    var gameStarted = false;



var gP = document.getElementById('gP'), 
	g = gP.getContext('2d'),
	sBody = null, 
	d = 1,
	a = null, 
	s = 40; newB(); newA(); 
gP.width = innerWidth;
gP.height = innerHeight; 

//Set the snake speed (smaller number = faster snake)
var snakeSpeed = 100;

function drawGrid() {
    for (var x = 0; x < gP.width; x += s) {
      for (var y = 0; y < gP.height; y += s) {
        g.strokeStyle = "#393E46 ";
        g.strokeRect(x, y, s, s);
      }
    }
  }
  
    var startButton = document.getElementById('reset-button-snake');
    var intervalId;


    startButton.onclick = function() {
if (!running) {
intervalId = setInterval(function(){
//interval code here
}, snakeSpeed);
running = true;
}
}

var startButton = document.getElementById('reset-button-snake');
startButton.onclick = function() {
if (!gameStarted) {
gameStarted = true;
intervalId = setInterval(function(){
    drawGrid();
    if (a[0] + s >= gP.width || a[1] + s >= gP.height) newA();
    g.fillStyle = "#232323"
    g.fillRect(0,0,gP.width,gP.height)
    g.fillStyle = "red";
    g.fillRect(a[0], a[1], s, s);
    g.fillStyle = "white";
    sBody.forEach(function(el, i){
    if (el.x == sBody[sBody.length - 1].x && el.y == sBody[sBody.length - 1].y && i < sBody.length - 1) {sBody.splice(0,sBody.length-1), sBody = [{x:0,y:0}], d = 1
    sBody.splice(0,sBody.length-1);
    sBody = [{x:0,y:0}];
    d = 1;
    score = 0; //reset score
    document.querySelector('.score-snake').innerHTML = score;
};
    
    });
    
    var m = sBody[0], f = {x: m.x,y: m.y}, l = sBody[sBody.length - 1];
    if (d == 1) f.x = l.x + s, f.y = Math.round(l.y / s) * s;
    if (d == 2) f.y = l.y + s, f.x = Math.round(l.x / s) * s;
    if (d == 3) f.x = l.x - s, f.y = Math.round(l.y / s) * s;
    if (d == 4) f.y = l.y - s, f.x = Math.round(l.x / s) * s;
    sBody.push(f);
    sBody.splice(0,1);
    sBody.forEach(function(pob, i){
    if (d == 1) if (pob.x > Math.round(gP.width / s) * s) pob.x = 0;
    if (d == 2) if (pob.y > Math.round(gP.height / s) * s) pob.y = 0;
    if (d == 3) if (pob.x < 0) pob.x = Math.round(gP.width / s) * s;
    if (d == 4) if (pob.y < 0) pob.y = Math.round(gP.height / s) * s;
    if (pob.x == a[0] && pob.y == a[1]) {
    newA();
    sBody.unshift({x: f.x - s, y:l.y});
    score += 10; //score erhöhen
    document.querySelector('.score-snake').innerHTML = score;
    }
    g.fillRect(pob.x, pob.y, s, s);
    });
    drawGrid();}, snakeSpeed);
}
}
        onkeydown = function (e) {
        var k = e.keyCode;
        if ([38,39,40,37].indexOf(k) >= 0)
        
        e.preventDefault();
        if (k == 39 && d != 3) d = 1; 
        if (k == 40 && d != 4) d = 2; 
        if (k == 37 && d != 1) d = 3; 
        if (k == 38 && d != 2) d = 4; 
        };                            