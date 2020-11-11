var sword;
var fruit1,fruit2,fruir3,fruit4;
var fruitsGroup;

var alien1;
var alienGroup;

var PLAY=1;
var END=0;
var gameState=1;

var gameOver,gameOverImg;

var score=0;


function setup(){
  createCanvas(400,400);
  sword=createSprite (40,200,20,20);
  sword.addImage(swordImg);
  
  sword.scale=0.5;
  
   fruitsGroup=createGroup();
  alienGroup=createGroup();
}

function preload(){
  swordImg=loadImage("sword.png");
  fruit1Img=loadImage("fruit1.png");
  fruit2Img=loadImage("fruit2.png");
  fruit3Img=loadImage("fruit3.png");
  fruit4Img=loadImage("fruit4.png");
  
  alien1Img=loadAnimation("alien1.png");
  
  gameOverImg=loadImage("gameover.png");
 
 gameOverSound=loadSound("gameover.mp3");
  swordSound=loadSound("knifeSwooshSound.mp3")
}

function draw(){
background(180);
  text("score :" + score,300,30);
  
  if(gameState===PLAY){
    
      spawnFruits();
  spawnEnemies();
    
      sword.y=World.mouseY;
  sword.x=World.mouseX;
    
  
    
    if(sword.isTouching(fruitsGroup)){
      swordSound.play();
      fruitsGroup.destroyEach();
      score=score+1;
    }
     else if(sword.isTouching(alienGroup)){
      gameState=END;
       gameOverSound.play();
      alienGroup.destroyEach();
       fruitsGroup.destroyEach();


       fruitsGroup.setVelocityYEach(0);
       alienGroup.setVelocityYEach(0);
       sword.addImage(gameOverImg);
       sword.x=200
       sword.y=200;
      
      
    }  
    
   }
 
      
 drawSprites();
}

function spawnFruits(){

  if(World.frameCount%80===0){
    fruit=createSprite(330,200,20,20);
    fruit.scale=0.2;
    
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1Img);
    } else if(r==2){
      fruit.addImage(fruit2Img);
    } else if(r==3){
      fruit.addImage(fruit3Img);
    } else if(r==4){
      fruit.addImage(fruit4Img);
    }
 
    position= Math.round(random(1,2));
    if(position==1){
      fruit.x=0;
      fruit.velocityX=(7+(score/4));
    }
    
    else if(position==2){
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }
   
    fruit.setLifetime=100;
    fruitsGroup.add(fruit);
    
   
  }

}

function spawnEnemies(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",alien1Img);
   
    monPosition=Math.round(random(1,2));
    if(monPosition==1){
      monster.x=400;
      monster.velocityX=-(7+(score/10));
      
    }
    else if(monPosition==2){
      monster.x=0;
      monster.velocityX=(7+(score/10));
    }
    
    
     monster.setLifetime=50;
    alienGroup.add(monster);
  }
}




