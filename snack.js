


////-------------------------------------------------variables------------------------------------------------------------------------------//
    var ctx = document.getElementById('ctx').getContext('2d');      //var ctx has goten the content with id ctx that is the canvas in html 
    var WIDTH = 500;                            // the canwas is 500  x 500, this is used to clear the canvas as objet
    var HEIGHT = 500;                                                              
    var snakeList,foodList, direction,eaten, intervalVar,score,running;           // snakelist is array, foodlist a array and direction determins what direction the snake will go, eaten determin if we will put new food in the canvas
    ctx.font = "20px Calibri";
    ctx.fillText("Click me to start the game",140,250);   
    var SnakeBackground = new Image();      
               // filltext a function i js, writes on the screen. 
    


    var snakeBody = {
      width:20,   // the width of the snack body (x) 
      height:20,   // height of the body (y)
      color:'green' // color of the snack
    };
    var food = {
      width:20,    // width of food
      height:20,   // height of food 
      color:'orange'  // color of food 
    };
////-------------------------------------------------SOUND------------------------------------------------------------------------------//


    sound = function(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function(){
          this.sound.play();
      }
      this.stop = function(){
          this.sound.pause();
      }
  }
    var eatingSound = new sound("sound/eat.mp3");
  var droppingSound = new sound("sound/drop.mp3");



////-------------------------------------------------------------------------------------------------------------------------------//

////-----------------------------------------------------------IMAGE--------------------------------------------------------------------//






 ///***********************************************************START PART/START THE GAME***************************************************************** */

   document.getElementById("ctx").onmousedown = function() { // GETTING the id ctx that is the canvas, and then listen for onmouse click. When press moouse this function starts
     if (running){                                           // checking if game is running, if it's running it clear the state, otherwise fps will increase since state never reseted
       clearInterval(intervalVar);                           // clearing the variable intervalVar. JS function clearInterval reset the variable.      
                                                            //   intervalVar=setInterval(updateSnakePosition,14); atm fps is 1000/14 71 fps 
       running=false;                                       // variable false, this check if game is running or not, since we clear state the game is not running
     }
   
     startGame();                                         // start the game, call the function 

    };


    //******************************************************************************************************************************************************************** */






    ////-------------------------------------------------Draw element------------------------------------------------------------------------------//

drawSnake = function(sb,i) {

        // use to draw each of the snake body
        //sb= snakebody, each body of the snack
       // i is the index of the body inside of the snacklist
       // will take the snackbody and its index to draw
      // save the state of the canvas 

      //This beling to a forEach part


ctx.save();
if (i == 0)                  // index =0 the head
ctx.fillStyle = 'black';
else
ctx.fillStyle = snakeBody.color;

// The fillStyle property sets or returns the *color*, gradient, or pattern used to fill the drawing
// bascially the fllstyle fill the body with a color, and that color is from the method snackebody, attribute color 

ctx.fillRect(sb.x,sb.y,snakeBody.width,snakeBody.height);   // this part take the x and y value from the list, and insert the s.width and height. 

// fills a retangel that is the side of snackbody width and height. 
//The fillRect() method draws a "filled" rectangle. The default color of the fill is black.
// basiclly, we use the fullstyle to tell what color the filled object should be. Than we use the fillRect to identify the scale of the object 


ctx.restore();
}
drawFood = function(f,i) {
ctx.save();
ctx.fillStyle = food.color;
ctx.fillRect(f.x,f.y,food.width,food.height);
ctx.restore();
}






////---------------------------------------------------------Start game function----------------------------------------------------------------------//






startGame = function() {   // this function get callled when user press mouse. 
    snakeList = [{x:220,y:200},  // the snakeList, has three body parts, the head, and two external parts, 
                 {x:210,y:200}, // that starts on x 220, 210, 200 and all same y height. 
                 {x:200,y:200}];
    foodList = [];            // create empty food list 
    direction = 99;          // snake, stand still 
    eaten=true;              // true, this in another function make does that a food object is created
    score=0;                // the score
    running = true;        // says that the game is running, we have it for another function that checks if game is running or not. 
    SnakeBackground.src="images/snackbackground.jfif";  
   
  

  

    intervalVar=setInterval(updateSnakePosition,14); 
                                        // The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).
                                        // this will call the function updateSnakePosition every 1000ms(1sec)- if 1000 instead of 14. 
                                        // the variable intervalVar gets the value from the function updateSnakePosition. 
  }



//********************************************************************************************************************************************************************


drawObject = function(object,x,y,width,height) {
  ctx.drawImage(object,x,y,width,height);
}




//-  -------------------------------------------------------------DIRECTION OF THE SNAKE----------------------------------------------------------------------------------------------------------------------------

document.onkeydown = function (event) {  // THIS FUNCTION GET CALLED WHEN A KEYBOARD BUTTON IS PRESSED, the event listner listen which button it was
  
                                       // The onkeydown event occurs when the user is pressing a key (on the keyboard).
                                       // event are we using to know which of the keys have been pressed 
                                       /* Key	Code
                                      left arrow	37
                                      up arrow	38
                                      right arrow	39
                                      down arrow	40*/

                                      // 0-left
                                      //1-up
                                      //2-Right
                                      //3-Down
              
              if(event.keyCode == 37 && direction!=2){  // IF USER PRESS KEYCODE 37(LEFT ARROW) THE SNAKE WILL GO DIRECTION 0 (LEFT)
                  direction=0;
                  console.log("0");
              }
             else if(event.keyCode == 38 && direction !=3){  // REASON FOR !=NUMBER IS IF USER GOING LEFT, IT SHOULD NOT BE ABLE TO GO TO RIGHT(TURN 180 DEGRESS)
                  direction=1;
                  console.log("1");
              }

              else if(event.keyCode == 39 && direction!=0){
                  direction=2;
                  console.log("2");
              }

              else if(event.keyCode == 40 && direction !=1){
                  direction=3;
                  console.log("3");
              }




}


///***************************************************UPDATE snack position************************************************************* */
      updateSnakeList = function() {
      for(var i=snakeList.length-1;i>=0;i--) {  // we begin on the end of the array for exampel 3 values, we begin in i=2 and loop backward 
        if (direction == 0) {
          if (i==0) {
            snakeList[i].x = snakeList[i].x - 5;
          }
          else {
            snakeList[i].x = snakeList[i-1].x;  // last part of the snack body will become the one infront of it
            snakeList[i].y = snakeList[i-1].y;  // if array 3 values, the snackList[2].y will become snackList[1]
          }
        }
        else if (direction == 1) {
          if (i==0) {
            snakeList[i].y = snakeList[i].y - 5; // -5 if i =0 then the snack body will atlest move -5px in - direction
          }
          else {
            snakeList[i].x = snakeList[i-1].x;
            snakeList[i].y = snakeList[i-1].y;
          }
        }
        else if (direction == 2) {
          if (i==0) {
            snakeList[i].x = snakeList[i].x + 5;
          }
          else {
            snakeList[i].x = snakeList[i-1].x;
            snakeList[i].y = snakeList[i-1].y;
          }
        }
        else if (direction == 3) {
          if (i==0) {
            snakeList[i].y = snakeList[i].y + 5;
          }
          else {
            snakeList[i].x = snakeList[i-1].x;
            snakeList[i].y = snakeList[i-1].y;
          }
        }
      }
    }


//******************************************************************************************************************************** */




//*****************************************COllision***************************************************** */



    testCollision = function(snk,fd) {
        return ((snk.x <= fd.x + food.width) &&
                (fd.x <= snk.x + snakeBody.width) &&
                (snk.y <= fd.y + food.height) &&
                (fd.y <= snk.y + snakeBody.height));
      }
  
  testCollisionSnake = function(snake1, snake2) {
      return ((Math.abs(snake1.x-snake2.x)<5)&&
            (Math.abs(snake1.y-snake2.y)<5));
  }





//********************************************************************************************************************************************* */




//*****************************************game boundiries ***************************************************** */



    checkSnakePosition = function(){    // 
        if ( snakeList[0].x >500){     // if the head part is x 500(all the way on the edge to the right then it should come from left side x=0;)
            snakeList[0].x=0;
        }
        else if ( snakeList[0].x <0){
            snakeList[0].x=500;
        }
        else if ( snakeList[0].y >500){
            snakeList[0].y=0;
        }
        else if ( snakeList[0].y <0){
            snakeList[0].y=500;
        }
        
    }
//*********************************************************************************************************************************************
   
isGameOver = function () {
        for (i in snakeList) {
            if(i == 0)
            continue;
            if(testCollisionSnake(snakeList[0], snakeList[i])){
              droppingSound.play();
                clearInterval(intervalVar);
                ctx.fillText("Game over! Click to restard",140,250);
                return;
            }
        }
    }







    
       updateSnakePosition = function() {
      ctx.clearRect(0,0,WIDTH,HEIGHT);
      ctx.drawImage(SnakeBackground,0,0,500,500);

  
      
      while(eaten) {
        var pos_x = Math.random()*485+5;
        var pos_y = Math.random()*485+5;
        foodList[0] = {x:pos_x,y:pos_y};
        eatingSound.play();
        eaten =false;
      }
      foodList.forEach(drawFood);
        snakeList.forEach(drawSnake);   // after it has cleared the screen and deleted the snake, it will than draw another snake. 
        
    


if (testCollision(snakeList[0],foodList[0])) {
        foodList = [];
        eaten = true;
        score += 1;
        var new_X,new_y;
        if (direction == 0) {
          new_X = snakeList[0].x - 20;
          new_y = snakeList[0].y;
        }
        else if (direction == 1) {
          new_X = snakeList[0].x;
          new_y = snakeList[0].y - 20;
        }
        else if (direction == 2) {
          new_X = snakeList[0].x + 20;
          new_y = snakeList[0].y;
        }
        else if (direction == 3) {
          new_X = snakeList[0].x;
          new_y = snakeList[0].y + 20;
        }
        snakeList.unshift({x:new_X,y:new_y});
      }





      ctx.fillText("Score: " +score,420,30)
      isGameOver();
      
      
         updateSnakeList();  // call another function
         checkSnakePosition();
     }







