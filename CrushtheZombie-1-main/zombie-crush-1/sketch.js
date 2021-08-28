const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;

var bg
var zombie
var wood
var stone
var axe
var zombie2
var breakButton

var stones = [];

function preload(){
bg = loadImage("assets/background.png")
zombie = loadImage("assets/zombie.png")
stone = loadImage("assets/stone.png")
wood = loadImage("assets/wood.png")
axe = loadImage("assets/axe.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, "brown", true);
  leftWall = new Base(100, height / 2 + 50, 600, 100, "brown", true);
  rightWall = new Base(width - 200, height / 2 + 50, 600, 100, "brown", true);

  bridge = new Bridge(14, { x: width / 2 - 700, y: height / 2 });
   
  jointLink = new Link(bridge, rightWall);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
    
  }
  zombie2 = createSprite(width/2,height/2)
  zombie2.addImage(zombie)
  zombie2.scale= 0.1

  breakButton = createImg("axe.png");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.mouseClicked(handleButtonPress);
}

function draw() {
  background(bg);
  Engine.update(engine);

  ground.show();
  bridge.show();
  leftWall.show();
  rightWall.show();
 

  for (var stone of stones) {
    stone.show();
  }
  drawSprites()
}
function handleButtonPress() {
  jointlink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
