let a4 = 0;
let a3 = 0;
let a2 = 0;
let a1 = 0;
let a0 = 0;
let points = [];
let no = 0;
let alpha = 0.1;
let speed = 1000000;
//(x-1/2)^3 = x3-3x2+3x-1
//(x-2/3)(x-1/3)(x)(x-1) = x4-2x3+11/9x2-2/9
//These two are for if you want to match a certain function
let realVals = [0.5,-6,10,-6,1];
let roots = [0,1/3,2/4,1];
let A = 40;
let initialNoPoints = 20;

function setup() {
  createCanvas(700, 700);
  /*for(let i=0;i<initialNoPoints;i++){
    let x = random((i-1)/initialNoPoints,i/initialNoPoints);
    let y =0;
    let pw = 1;
    for(let j=0;j<5;j++){
      y+=pw*realVals[j];
      pw*=x;
    }
    points[no]=createVector(x,y+random(-0.02,0.02));
    no++;
  }*/
  
  for(let i=0;i<initialNoPoints;i++) {
    let x = random((i-1)/initialNoPoints,i/initialNoPoints);
    let y = A;
    for(let r of roots) y*=(x-r);
    points[no]=createVector(x,0.8+y+random(-0.02,0.02));
    no++;
  }
}

function draw() {
  background(220);
  strokeWeight(4);
  stroke(0);
  for (let p of points) point(map(p.x, 0, 1, 0, width), map(p.y, 1, 0, 0, height));
  //line(0, height - b, width, height - (a * width + b));
  for (let i = 0; i < speed/(no+1); i++) gradientDescent();
  parabola();
  //console.log(a0,a1,a2,a3,a4);
}

function mouseClicked() {
  points[no] = createVector(map(mouseX, 0, width, 0, 1), map(mouseY, 0, height, 1, 0));
  no++;
}

function parabola() {
  strokeWeight(2);
  stroke(255, 0, 0);
  beginShape(LINES);
  let prevX = 0;
  let prevY = map(a0,0,1,height,0);
  for (let i = 0; i < 1; i += 0.01) {
    let x = i;
    let y = a4*i*i*i*i+ a3 * i * i * i + a2 * i * i + a1 * i + a0;
    vertex(prevX,prevY);
    prevX = map(x, 0, 1, 0, width);
    prevY=map(y, 0, 1, height, 0);
    vertex(prevX,prevY);
  }
  endShape();
}

function gradientDescent() {
  if (no < 1) return;
  let da4=0;
  let da3 = 0;
  let da2 = 0;
  let da1 = 0;
  let da0 = 0;
  let err = 0;
  for (let p of points) {
    let t = (a4*p.x*p.x*p.x*p.x+a3*p.x*p.x*p.x+a2 * p.x * p.x + a1 * p.x + a0 - p.y);
    err += t * t;
    da4 += t * p.x * p.x *p.x * p.x;
    da3 += t * p.x * p.x * p.x;
    da2 += t * p.x * p.x;
    da1 += t * p.x;
    da0 += t;
  }
  err/=no;
  a4 -=da4 * alpha/no;
  a3 -= da3 * alpha/no;
  a2 -= da2 * alpha/no;
  a1 -= da1 * alpha/no;
  a0 -= da0 * alpha/no;

}