const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#ffa400", "#3D6EF7", "#ff6bcb", "#e74c3c", "#20E3B2"];

function randomcolors(){
    return colors[Math.floor(Math.random() * colors.length)];
}
let Particles;
const Particlescount = 30;
Particles = [];
function init(){
    setTimeout(init,500);
    for(let index=0;index < Particlescount;index++){
        const radians = (Math.PI * 2) / Particlescount;
        const x = canvas.width / 2; 
        const y = canvas.height / 2;
        const velocity = {
            a: Math.cos(radians * index),
            b: Math.sin(radians * index),
        };
        Particles.push(new Particle(x,y,10,randomcolors(colors),velocity));
    }
    Particles.forEach((item)=> item.update());
}
function Particle(x,y,radius,color,velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    
    this.draw = () =>{
         ctx.beginPath();
         ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
         ctx.fillStyle = this.color;
         ctx.fill();
         ctx.closePath();
    };
    this.update = () =>{
        this.draw();
        this.x += this.velocity.a;
        this.y += this.velocity.b;
    };
}
function Animate(){
     requestAnimationFrame(Animate);
     ctx.fillStyle = "rgba(0,0,0,0.05)";
     ctx.fillRect(0,0,canvas.width,canvas.height);
    Particles.forEach((item)=> item.update());
}
Animate(); 
init();