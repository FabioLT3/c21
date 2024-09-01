  
var towerImg, tower, plataform;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var jump = false;
var topEdge, leftEdge, rightEdge;
var score = 0;
var fuente;
var toque = false;

function preload(){
  towerImg = loadImage("torre.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

  fuente = loadFont("PressStart2P.ttf");
}

function setup() {
  createCanvas(600,600);

  //bordes
  topEdge = createSprite(width / 2, 0, width, 1);
  topEdge.visible = false;
  leftEdge = createSprite(0,height/2,1,height);
  leftEdge.visible = false;
  rightEdge = createSprite(width,height/2,1,height);

  //spookySound.loop();
  tower = createSprite(300,0);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();  
  ghost = createSprite(width/2, height/2,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  plataform = createSprite(width/2, 500, ghost.width, 10);
  plataform.addImage(climberImg);
  

  ghost.setCollider("rectangle",0,63,150,170);
  //ghost.debug = true
  createEdgeSprites();

}


function draw() {
  background(255);
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
        ghost.x = ghost.x - 3;

      //escribir el código para mover al fantasma a la izquierda al presionar la flecha izquierda
    }
    if(keyDown("right_arrow")){
  
          ghost.x = ghost.x + 3;

      //escribir el código para mover el fantasma a la derecha al presionar la flecha derecha 
      
    }
    if(keyWentDown("space")){
      plataform.destroy();
      toque = false;
      jump = true;
  
         ghost.velocityY = -10;

      //escribir el código para mover el fantasma hacia arriba al presionar la flecha arriba 
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //escribir una condición para desplazar infinitamente la torre
      if (tower.y == 600) {
        tower.y = 0;

      }
    
      spawnDoors();
  
//escribir el código para hacer que invisibleBlockGroup colisione con el fantasma y cambiar gamestate a end.
     if(climbersGroup.isTouching(ghost) && !toque){
      toque = true;
      score = score + Math.round(random(5,15))*10;
      ghost.velocityY = 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    
  //choque de ghost con los bordes
  ghost.collide(topEdge);
  ghost.collide(leftEdge);
  ghost.collide(rightEdge);
  ghost.collide(climbersGroup);
  ghost.collide(plataform);



  drawSprites();

  //puntaje
  textFont(fuente);
  textSize(10);
  fill("white");
  text("puntuación: "+score,width/1.5,height/10);

}
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fin del juego", 230,250)
  }
}
//---------------------------------------------------------------------------------------------------------
function spawnDoors()
 {
  //escribir aquí el código para aparecer los obstáculos
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.visible = false;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //agregar la función random
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    //
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 3;
    climber.velocityY = 3;
    invisibleBlock.velocityY = 3;

    //cambiar la profundidad del fantasma y de la puerta
    
     
    ghost.depth = door.depth;
    ghost.depth +=1;
    
    //asignar lifetime a door, climber y invisible block

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //agregar cada obstáculo al grupo obstaclesGroup.add(obstacle); aquí los obstáculos son door, climber, invisible block
    
     doorsGroup.add(door);
    //invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

