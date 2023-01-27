

// Spielfeld
var feldBreite = 1000, /* Hier geändert */
	feldHöhe = 500; /* Hier geändert */


// paddles
var paddleBreite = 30,
	paddleHöhe = 120,
	paddleSpeed = 20;

// ball
var ballBreite = 25,
	ballHöhe = 25,
	ballSpeedStart =10,
	ballSpeed = ballSpeedStart;

// runden anzahl
var scoreMax = 15;



var paddlePlayer = {
	elem: document.querySelector('.paddle-player'),
	x: 0,
	y: feldHöhe / 2 - paddleHöhe / 2,
	width: paddleBreite,
	height: paddleHöhe,
	speed: paddleSpeed,
	moveUp: false,
	moveDown: false
};

var paddleEnemy = {
	elem: document.querySelector('.paddle-enemy'),
	x: feldBreite - paddleBreite,
	y: feldHöhe / 2 - paddleHöhe / 2,
	width: paddleBreite,
	height: paddleHöhe,
	speed: paddleSpeed,
	moveUp: false,
	moveDown: false
};
	
var ball = {
	elem: document.querySelector('.ball'),
	x: feldBreite / 2 - ballBreite / 2,
	y: feldHöhe / 2 - ballHöhe / 2,
	vx: ballSpeed,
	vy: ballSpeed,
	width: ballBreite,
	height: ballHöhe
};

var SpielerPunkte = {
	elem: document.querySelector('.score-player'),
	value: 0
};

var CpuPunkte = {
	elem: document.querySelector('.score-enemy'),
	value: 0
};

//Spielstart

function init() {
	addEventListeners();
	loop();
}

//Reset der Runde
function resetGame() {
	ballSpeed = ballSpeedStart;
	SpielerPunkte.value = 0;
	CpuPunkte.value = 0;
	resetBall();
}

function resetBall() {
	ball.x = feldBreite / 2 - ballBreite / 2;
	ball.y = feldHöhe / 2 - ballHöhe / 2;
	ball.vx = 0;
	ball.vy = 0;
	setTimeout(function() {
		ball.vx = ballSpeed;
		ball.vy = ballSpeed;
	}, 1000);
}

// Event listener, achtet auf die eingabe
function addEventListeners() {
	window.addEventListener('keydown', function(e) {
		if (e.which === 38) { 
			paddlePlayer.moveUp = true;
		}
		if (e.which === 40) {
			paddlePlayer.moveDown = true;
		}
	});

	window.addEventListener('keyup', function(e) {
		if (e.which === 38) { 
			paddlePlayer.moveUp = false;
		}
		if (e.which === 40) {
			paddlePlayer.moveDown = false;
		}
	});
}

// Kollision erkennung

function collisionAABB(r1, r2) {
	if (!(
		r1.x > r2.x + r2.width ||  // rect1 is on the right of rect2
		r1.x + r1.width < r2.x ||  // rect1 is on the left of rect2
		r1.y > r2.y + r2.height || // rect1 is below rect2
		r1.y + r1.height < r2.y    // rect1 is above rect2
	)) {
		return true;
	}
}

// Ball bewegen

function moveBall() {
	ball.x += ball.vx;
	ball.y += ball.vy;
}

// Spieler Bewegen

function movePlayer() {
	if (paddlePlayer.moveUp) {
		paddlePlayer.y -= paddlePlayer.speed;
	} else if (paddlePlayer.moveDown) {
		paddlePlayer.y += paddlePlayer.speed;
	}
}

// CPU bewegen, AI

function moveEnemy() {
	if (Math.random() < 0.2) {
		paddleEnemy.moveUp = false;
		paddleEnemy.moveDown = false;
		if (ball.y + ballHöhe < paddleEnemy.y + paddleEnemy.height / 2) {
			paddleEnemy.moveUp = true;
		} else if (ball.y > paddleEnemy.y + paddleEnemy.height / 2) {
			paddleEnemy.moveDown = true;
		}
	}
	
	if (paddleEnemy.moveUp) {
		paddleEnemy.y -= paddleEnemy.speed;
	} else if (paddleEnemy.moveDown) {
		paddleEnemy.y += paddleEnemy.speed;
	}
}

//Ball abprallen lassen

function containBall() {
	if (ball.y <= 0) {
		ball.y = 0;
		ball.vy = -ball.vy;
	} else if (ball.y + ball.height >= feldHöhe) {
		ball.y = feldHöhe - ball.height;
		ball.vy = -ball.vy;
	}

	if (ball.x <= 0) {
		CpuPunkte.value += 1;

		resetBall();
	} else if (ball.x + ball.width >= feldBreite) {
		SpielerPunkte.value += 1;
		resetBall();
	}
}

// Ball gegen Paddles abprallen lassen

function containPaddles() {
	paddlePlayer.y = Math.max(0, paddlePlayer.y);
	paddlePlayer.y = Math.min(feldHöhe - paddlePlayer.height, paddlePlayer.y);
	
	paddleEnemy.y = Math.max(0, paddleEnemy.y);
	paddleEnemy.y = Math.min(feldHöhe - paddleEnemy.height, paddleEnemy.y);
}

// Kollision checken

function checkCollisions() {
	if (collisionAABB(ball, paddlePlayer)) {
		ball.x = paddlePlayer.x + paddlePlayer.width;
		ball.vx = -ball.vx;
	}
	
	if (collisionAABB(ball, paddleEnemy)) {
		ball.x = paddleEnemy.x - ball.width;
		ball.vx = -ball.vx;
	}
}

// Gewinner erkennung

function checkWinState() {
	if (SpielerPunkte.value == scoreMax) {
		console.log('You win!');
		resetGame();
	} else if (CpuPunkte.value == scoreMax) {
		console.log('You get nothing! You lose!');
		resetGame();
	}
}

// Aktuallisierung aller funtionen

function update() {
	moveBall();
	movePlayer();
	moveEnemy();
	containBall();
	containPaddles();
	checkCollisions();
	checkWinState();
}

//Spiel rendern

function render() {
	paddlePlayer.elem.style.transform = 'translate(' + paddlePlayer.x + 'px, ' + paddlePlayer.y + 'px)';
	paddleEnemy.elem.style.transform = 'translate(' + paddleEnemy.x + 'px, ' + paddleEnemy.y + 'px)';
	ball.elem.style.transform = 'translate(' + ball.x + 'px, ' + ball.y + 'px)';
	SpielerPunkte.elem.innerHTML = SpielerPunkte.value;
	CpuPunkte.elem.innerHTML = CpuPunkte.value;
}

// Schleife für spiel

function loop() {
	requestAnimationFrame(loop);
	update();
	render();
}

// aufruf des Spiels

init(); // to win it!

// Spiel design 

var gameWrap = document.querySelector('body'),
	game = document.querySelector('.pong'),
	gamePadding = 0.15,
	gameBcr,
	feldBreite,
	feldHöhe,
	gameRatio,
	gameScale,
	gameWrapWidth,
	gameWrapHeight;
	
function setScale() {
	game.style.transform = 'translateX(-50%) translateY(-50%) scale(1)';
	gameBcr = game.getBoundingClientRect();
	feldBreite = gameBcr.width;
	feldHöhe = gameBcr.height;
	gameRatio = feldHöhe / feldBreite;
	gameWrapWidth = gameWrap.offsetWidth - ( gameWrap.offsetWidth * gamePadding );
	gameWrapHeight = gameWrap.offsetHeight - ( gameWrap.offsetHeight * gamePadding );
	if (gameWrapWidth > gameWrapHeight / gameRatio) {
		gameScale = gameWrapHeight / gameRatio / feldBreite;
	} else {
		gameScale = gameWrapWidth * gameRatio / feldHöhe;
	}
	game.style.transform = 'translateX(-50%) translateY(-50%) scale(' + gameScale + ')';
}

function onResize() {
	setScale();
}

addEventListener('resize', onResize);

setScale();