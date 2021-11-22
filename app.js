$(document).ready(function(){
    $('.ui.accordion').accordion();
});

let canvas = document.querySelector('#mycanvas');
let canvasContext = canvas.getContext('2d');

let centerX = Math.random() * canvas.width;
let centerY = Math.random() * canvas.height;
let RAD = 1;
let POINTS = [];
let N = 3;
let PADDING = 50;
let distRatio = 0.5;

function playForSide() {
    N = document.querySelector('#nthsidedpolygon').value;
    if (N < 3) {
        alert('vertices must be greater than 2');
        return;
    }

    distRatio = document.querySelector('#distratio').value/100;
    if (distRatio > 0 && distRatio < 1) {
        // all good here
    }
    else {
        alert('distance to travel must be less than 100%, try 61.8');
        document.querySelector('#distratio').value = 61.8;
        distRatio = 61.8;
    }

    init();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
    canvasContext.beginPath();

    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);

    canvasContext.closePath();
}

function colorCircle(centerX,centerY, radius, fillColor) {
    canvasContext.beginPath();

    canvasContext.fillStyle = fillColor;
    canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
    canvasContext.fill();

    canvasContext.closePath();
}

function draw() {
    let W = canvas.width;
    let H = canvas.height;
    let h = H - PADDING;
    let origin = [W/2, h/2+PADDING/2];
    let rad = h/2;
    let theta = (Math.PI*2)/N;
    let target = Math.floor(Math.random() * N);

    for (let i=0; i<N; i++) {
        let currentTheta = i*theta - (Math.PI/2); //rotating by 90 degs for better aesthetics
        POINTS[i] = [origin[0] + rad*Math.cos(currentTheta), origin[1]+rad*Math.sin(currentTheta)];
        colorCircle(POINTS[i][0],POINTS[i][1], RAD*10, 'cyan' );
    }

    colorCircle(centerX, centerY, RAD, 'cyan');


    centerX = (distRatio * POINTS[target][0]) + (1-distRatio) * centerX;
    centerY = (distRatio * POINTS[target][1]) + (1-distRatio) * centerY;

    const myTimer = setTimeout(draw, 1000/300);
}

function init() {
    colorRect(0,0, canvas.width,canvas.height, 'black');
    draw();
}

window.onload = function() {
    init();
}
