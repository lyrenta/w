document.getElementById("go-shopping").addEventListener("click", () => {
    window.location.href = "index.html";
});

const canvas = document.getElementById("snow-canvas");
const ctx = canvas.getContext("2d");

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

const numFlakes = 100;
const flakes = [];

for(let i=0;i<numFlakes;i++){
    flakes.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*4+1,
        d: Math.random()*numFlakes
    });
}

function drawFlakes(){
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for(let i=0;i<numFlakes;i++){
        const f = flakes[i];
        ctx.moveTo(f.x,f.y);
        ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
    }
    ctx.fill();
    moveFlakes();
}

let angle = 0;
function moveFlakes(){
    angle += 0.01;
    for(let i=0;i<numFlakes;i++){
        const f = flakes[i];
        f.y += Math.cos(angle + f.d) + 1 + f.r/2;
        f.x += Math.sin(angle) * 2;

        if(f.x > W+5 || f.x < -5 || f.y > H){
            if(i%3>0){ flakes[i] = {x: Math.random()*W, y: -10, r:f.r, d:f.d}; }
            else { flakes[i] = {x: (Math.sin(angle)*W/2)+W/2, y: -10, r:f.r, d:f.d}; }
        }
    }
}

setInterval(drawFlakes,25);

window.addEventListener("resize", () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
});
