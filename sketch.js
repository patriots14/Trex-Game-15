var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var play = 1
var end = 0
var gameState = play
var gameOver
var gameOverImage
var restart
var restartImage


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage ("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  gameOver=createSprite (300,100,50,50)
  gameOver.addImage("gameOver", gameOverImage)
gameOver.scale = 1.50
restart=createSprite(300,125,50,50)
restart.addImage("restart", restartImage)
  restart.scale = 0.5
  console.log("Hello" + 5);
  gameOver.visible=false
  restart.visible= false
  score = 0;
  cloudsGroup = new Group()
  obstaclesGroup = new Group()
  trex.debug=true
}

function draw() {
  background(180);
  if(gameState==play){
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -13;
    }
    trex.velocityY = trex.velocityY + 0.8
    ground.velocityX = -4;
    spawnClouds();
    spawnObstacles();
    score = score + Math.round(frameCount/60);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(obstaclesGroup.isTouching (trex)){
      gameState=end

    }
  } 
else if(gameState==end){
  ground.velocityX=0
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
trex.velocityY=0
gameOver.visible=true
  restart.visible=true
}
  text("Score: "+ score, 500,50);
 
  
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle)
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
  }
  
}