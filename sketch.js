var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 

var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var turn=0;
var particle;
var gamestate= "play";
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    
}
 


function draw() {
  background("black");
  textSize(20)
 //text("Score : "+score,20,30);
  Engine.update(engine);

  text("Score: "+ score,30,30);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   for (var k = 0; k < divisions.length; k++) {
     
    divisions[k].display();
  }

   if(gamestate=="play"){

    text("Turns Left: "+ (5 - turn),650, 20);

      for(var i= 15; i <=300; i+=80){
        textSize(30);
        text("500", i, 550)
       }
    
       for(var i= 335; i <=500; i+=80){
        textSize(30);
        text("100", i, 550)
       }
       for(var i= 580; i <=800; i+=80){
        textSize(30);
        text("200", i, 550)
       }
       
       if(particle!=null){
         particle.display();
         if(particle.body.position.y>500){
           if(particle.body.position.x<320){
            score=score+500;
            particle=null;
          }
           else if(particle.body.position.x>300 && particle.body.position.x<560){
             score=score+100;
             particle=null;
            }
            else if(particle.body.position.x>560 && particle.body.position.x<800){
              score=score+200;
              particle=null;
             }
             if(turn>=5){
              gamestate="end";
            }
         }
       }
    }

  if(gamestate=="end"){
    fill("yellow")
    textSize(60);
    text("GAME OVER", 250,300);
    particle=null;
  }

  }



function mousePressed(){
  if(gamestate=="play"){
    turn++;
    particle= new Particle(mouseX, 10,10);
  }
  if(turn>=6){
    gamestate="end";
  }
}