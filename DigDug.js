//Global variables
var canvas = document.getElementById("dig");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
//dig.style.border = '5px solid #F77'; // adjust as needed
var score = 0;
var STAGE_HEIGHT = canvas.height;
var STAGE_WIDTH = canvas.width;
var animId;
var time_scale = 0.006;
var t0;
var dt;
var walls = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var player;
var dragons = new Array();
var goggles = new Array();
var stones = new Array();
var speedUp;
var damageUp;
var spriteDelay = 0;
var loaded = 0;
window.onload = init;

//starts the game only when all images are loaded in
function assetLoaded()
{
    loaded+=1;
    if (loaded == 20)
        {
            initAnim(); 
            loaded = 0;
        }
}

//loads in the images for every object in the game
function readyImages()
{
    var img1 = new Image();
        img1.src = "img/dragonL.png";
        img1.onload = assetLoaded();
    var img2 = new Image();
        img2.src = "img/dragonR.png";
        img2.onload = assetLoaded();
    var img3 = new Image();
        img3.src = "img/gogglesL.png";
        img3.onload = assetLoaded();
    var img4 = new Image(); 
        img4.src = "img/gogglesR.png";
        img4.onload = assetLoaded();
    var img5 = new Image();
        img5.src = "img/meL.png";
        img5.onload = assetLoaded();
    var img6 = new Image();
        img6.src = "img/meR.png";
        img6.onload = assetLoaded();
    var img7 = new Image();
        img7.src = "img/weaponD.png";
        img7.onload = assetLoaded();
    var img8 = new Image();
        img8.src = "img/weaponL.png";
        img8.onload = assetLoaded();
    var img9 = new Image();
        img9.src = "img/weaponR.png";
        img9.onload = assetLoaded();
    var img10 = new Image();
        img10.src = "img/weaponU.png";
        img10.onload = assetLoaded();
    var img11 = new Image();
        img11.src = "img/invisiblewall.png";
        img11.onload = assetLoaded();
    var img12 = new Image();
        img12.src = "img/orangewall.png";
        img12.onload = assetLoaded();
    var img13 = new Image();
        img13.src = "img/redorangewall.png";
        img13.onload = assetLoaded();
    var img14 = new Image();
        img14.src = "img/redwall.png";
        img14.onload = assetLoaded();
    var img15 = new Image();
        img15.src = "img/yellowwall.png";
        img15.onload = assetLoaded();
    var img16 = new Image();
        img16.src = "img/dragonI.png";
        img16.onload = assetLoaded();
    var img17 = new Image();
        img17.src = "img/gogglesI.png";
        img17.onload = assetLoaded();
    var img18 = new Image();
        img18.src = "img/stone.png";
        img18.onload = assetLoaded();
    var img19 = new Image();
        img19.src = "img/speedUp.png";
        img19.onload = assetLoaded();
    var img20 = new Image();
        img20.src = "img/damageUp.png";
        img20.onload = assetLoaded();
}
//initializes game
function init()
{
    addEventListener('keydown', onDown, false);
    addEventListener('keyup',onUp,false);
    //adds array of walls
    initGrid();
    player = new Character();
    for (var i = 0; i < 2; i++)
    {
        dragons[i] = new Dragon();
    }
    dragons[0].x = 52;
    dragons[0].y = 300;
    dragons[1].x = 500;
    dragons[1].y = 173;
    
    for (var i = 0; i < 2; i++)
    {
        goggles[i] = new Goggles();
    }
    goggles[0].x = 200;
    goggles[0].y = 562;
    goggles[1].x = 466;
    goggles[1].y = 726;
    
    for (var i = 0; i < 3; i++)
    {
        stones[i] = new Stone();
    }
    
    //places stones are random locations
    stones[0].x = Math.random()*STAGE_WIDTH-stones[0].width;
    stones[0].y = Math.random()*(STAGE_HEIGHT-STAGE_HEIGHT/4)+100;
    stones[1].x = Math.random()*STAGE_WIDTH-stones[0].width;
    stones[1].y = Math.random()*(STAGE_HEIGHT-STAGE_HEIGHT/4)+100;
    stones[2].x = Math.random()*STAGE_WIDTH-stones[0].width;
    stones[2].y = Math.random()*(STAGE_HEIGHT-STAGE_HEIGHT/4)+100;
    
    //places powerups at random locations
    speedUp = new SpeedUp();
    speedUp.x = Math.random()*STAGE_WIDTH-speedUp.width;
    speedUp.y = Math.random()*(STAGE_HEIGHT-STAGE_HEIGHT/4)+100;
    damageUp = new DamageUp();
    damageUp.x = Math.random()*STAGE_WIDTH-damageUp.width;
    damageUp.y = Math.random()*(STAGE_HEIGHT-STAGE_HEIGHT/4)+100;
    readyImages();

}


//clears the map and updates the score
function clearRect()
{
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.fillRect(0,0,STAGE_WIDTH,STAGE_HEIGHT);
    ctx.closePath();
    //fills in sky
    ctx.fillStyle = "#3399ff"
    ctx.beginPath();
    ctx.fillRect(0,0,STAGE_WIDTH,STAGE_HEIGHT/8)
    ctx.closePath();
    updateScore();
}

//draws the walls
function drawGrid()
{
    for (var i = 0; i < 48; i++)
    {
        for (var j = 0; j < 56; j++)
        {
            walls[i][j].draw(); 
        }
    }
}

//creates each wall object and marks out starting clear space
function initGrid()
{
    
    for (var i = 0; i < 48; i++) //rows
    {
        
        for (var j = 0; j < 56; j++) //columns
        {
            walls[i][j] = new Wall();
            walls[i][j].x = walls[i][j].width*j;
            walls[i][j].y = (STAGE_HEIGHT/8)+walls[i][j].height*i;
            

            
             
            if (i > 10)
            {
                if (walls[i][j].invisible == false)
                {
                    walls[i][j].image.src = "img/orangewall.png";
                }
                
            }
            if (i > 24)
            {
               if (walls[i][j].invisible == false)
                {
                    walls[i][j].image.src = "img/redorangewall.png";
                }
               
            }
            if (i > 36)
            {
               if (walls[i][j].invisible == false)
                {
                    walls[i][j].image.src = "img/redwall.png";
                }
                
            }
            
            //center pillar
            if (i <= 24)
            {
                //center pillar
                if (j > 23 && j < 28)
                {
                    walls[i][j].invisible = true;
                    walls[i][j].image.src = "img/invisiblewall.png";
                }
                //center pillar expansion
                if ((i > 20)&& (j >= 20 && j <= 31))
                {
                    walls[i][j].invisible = true;
                    walls[i][j].image.src = "img/invisiblewall.png";
                }
            }
            //upper right line
            if (i > 3 && i < 8)
            {
                if (j > 35 && j < 48)
                {
                    walls[i][j].invisible = true;
                    walls[i][j].image.src = "img/invisiblewall.png";
                }
            }
            //upper left line
            if (i > 4 && i < 21)
            {
                if (j > 3 && j < 8)
                {
                    walls[i][j].invisible = true;
                    walls[i][j].image.src = "img/invisiblewall.png";
                }
            }
            //lower left line
            if (i > 29 && i < 34)
            {
                if (j > 7 && j < 24)
                {
                    walls[i][j].invisible = true;
                    walls[i][j].image.src = "img/invisiblewall.png";
                }
            }
            //lower right line
            if (i > 27 && i < 45)
            {
                if (j > 35 && j < 40)
                {
                    walls[i][j].invisible = true;
                    walls[i][j].image.src = "img/invisiblewall.png";
                }
            }
        }
    }
}

//wall object
function Wall()
{
    this.image = new Image();
    this.image.ready = false;
    this.imgSrc = "img/yellowwall.png";
    this.image.src = this.imgSrc;
    this.invisible = false;
    this.color = "yellow";
    this.x;
    this.y;
    this.width = STAGE_WIDTH/52;
    this.height = STAGE_HEIGHT/60;
    this.hasUpdated = false;
}

//draws the wall
Wall.prototype.draw = function()
{
    ctx.drawImage(this.image,this.x,this.y);
    
}

//character object
function Character()
{
    this.originalImg = new Image();
    this.originalImg.src = "img/meR.png";
    this.image = new Image();
    this.image.ready = false;
    this.imgSrc = "img/meR.png";
    this.image.src = this.imgSrc;
    this.spriteWidth = 104;
    this.x = 315;
    this.y = 425;
    this.currX = 0;
    this.currY = 0;
    this.width = 52;
    this.height = 60;
    this.scale = 1;
    this.rightPressed = false;
    this.leftPressed = false;
    this.upPressed = false;
    this.downPressed = false;
    this.speed = 2;
    this.usingWeapon = false;
    this.weapon;
    this.lastMoved = 0; // 0 - right, 1 - up, 2 - left, 3 - down
    this.lives = 3;
    this.score = 3000;
    this.kills = 0;
    this.damage = 0.008;
}

//draws the character
Character.prototype.draw = function()
{
    ctx.drawImage(this.image,
					this.currX,this.currY,            		// sprite upper left positino	
					this.width,this.height, 		// size of a sprite 72 x 96
					this.x,this.y,  	// canvas position
					this.scale*this.width,this.scale*this.height      // sprite size scale
					);
}

//moves the character
//bounds checking, weapon checking
//calls draw or rotate
//calls collision checking
Character.prototype.move = function()
{
    if (this.usingWeapon == true)
    {
        this.weapon = new Weapon();
    }
    if (this.rightPressed)
    {
        if (this.x < STAGE_WIDTH-this.width)
        {
            this.x +=this.speed;
            this.image.src = "img/meR.png";
        }
    }
    else if (this.leftPressed)
    {
        if (this.x > 0)
        {
            this.x -=this.speed;
            this.image.src = "img/meL.png";
        }
    }
    else if (this.upPressed)
    {
        if (this.y > STAGE_HEIGHT/8 - this.height)
        this.y -=this.speed;
    }
    else if (this.downPressed)
    {
        if (this.y < STAGE_HEIGHT - 2*this.height-6)
        {
            this.y+=this.speed;
        }
    }
    
    if (this.y < STAGE_HEIGHT/8 - this.height)
    {
        this.y = STAGE_HEIGHT/8 - this.height;
    }
    if (this.y > STAGE_HEIGHT - 2*this.height-6)
    {
        this.y = STAGE_HEIGHT - 2*this.height-6;
    }
    
    if (this.lastMoved == 1 || this.lastMoved == 3||this.upPressed || this.downPressed)
    {
        this.rotate();
    }
    else
    {
        this.draw();
    }
    
    this.collision();
}

//checks collision with walls, enemies, powerups and stones
Character.prototype.collision = function()
{
    //goes through array of walls
    for (var i = 0; i < 48; i++)
    {
        for (var j = 0; j < 56; j++)
        {
            if (!walls[i][j].invisible)
            {
                //checking collision
                if ((walls[i][j].x > this.x) && (walls[i][j].x < this.x+this.width))
                {
                    if ((walls[i][j].y >= this.y) && (walls[i][j].y < this.y+this.height))
                    {
                        walls[i][j].image.src = "img/invisiblewall.png";
                        walls[i][j].invisible = true;
                        walls[i][j].hasUpdated = true;
                        this.score-=1;
                    }
                }
                
            }
        }
    }
    
    //goes through array of dragons
    for (var i = 0; i < dragons.length; i++)
    {
        if (this.x > dragons[i].x-this.width && this.x < dragons[i].x+dragons[i].width)
        {
            if (this.y > dragons[i].y-this.height && this.y < dragons[i].y+dragons[i].height)
            {
                this.lives-=1;
                this.x = 315;
                this.y = 425;
                this.lastMoved = 0;
                this.score-=500;
            }
        }
    }
    //goes through array of gogggles
    for (var i = 0; i < goggles.length; i++)
    {
        if (this.x > goggles[i].x-this.width && this.x < goggles[i].x+goggles[i].width)
        {
            if (this.y > goggles[i].y-this.height && this.y < goggles[i].y+goggles[i].height)
            {
                this.lives-=1;
                this.x = 315;
                this.y = 425;
                this.lastMoved = 0;
                this.score-=500;
            }
        }
    }
    
    //goes through array of stones
    for (var i = 0; i < stones.length; i++)
    {
        if (stones[i].falling && stones[i].doesNothing < 0)
        {
            if (this.x > stones[i].x-this.width && this.x < stones[i].x+stones[i].width)
            {
                if (this.y > stones[i].y-this.height && this.y < stones[i].y+stones[i].height)
                {
                    this.lives-=1;
                    this.x = 315;
                    this.y = 425;
                    this.lastMoved = 0;
                    this.score-=500;
                }
            }
        }
    }
}

//rotates and draws the character the specified rotation
Character.prototype.rotate = function()
{
    ctx.save();
    var angle;
    if (!this.rightPressed && !this.leftPressed && this.y > STAGE_HEIGHT/8 - this.height &&this.lastMoved != 0 && this.lastMoved !=2)
    {
        if (this.upPressed||this.lastMoved == 1)
        {
            this.image.src = "img/meR.png"
            angle = 270;
        }
        else if (this.downPressed||this.lastMoved == 3)
        {
            this.image.src = "img/meR.png";
            angle =  90;
        }
    }

    else
    {
        //angle = 0;
    }
    ctx.translate(this.x+this.width/1.5,this.y+this.height/2);
    ctx.rotate(angle*Math.PI/180);
    ctx.drawImage(this.image,
					this.currX,this.currY,            		// sprite upper left positino	
					this.width,this.height, 		// size of a sprite 72 x 96
					-(this.width/2),-(this.height/2),  	// canvas position
					1*this.width,1*this.height      // sprite size scale
					);
    ctx.restore();
    
}

//dragon object
function Dragon()
{
    this.image = new Image();
    this.image.ready = false;
    this.imgSrc = "img/dragonR.png";
    this.image.src = this.imgSrc;
    this.spriteWidth = 104;
    this.x;
    this.y;
    this.currX = 0;
    this.currY = 0;
    this.width = 52;
    this.height = 60;
    this.scale = 1;
    this.speed = .5;
    this.right = true;
    this.canMove = true;
    this.ghost = false;
    this.randomValue = 1;
    this.moveUp = true;
    this.moveRight = true;
}

//draws the dragon and calls the move function
Dragon.prototype.draw = function()
{
    if (this.right == false && this.ghost == false)
    {
        this.image.src = "img/dragonL.png";
    }
    else if (this.right == true && this.ghost == false)
    {
        this.image.src = "img/dragonR.png";
    }
    else
    {
        this.image.src = "img/dragonI.png";
    }
     ctx.drawImage(this.image,
					this.currX,this.currY,            		// sprite upper left positino	
					this.width,this.height, 		// size of a sprite 72 x 96
					this.x,this.y,  	// canvas position
					this.scale*this.width,this.scale*this.height      // sprite size scale
					);
    if (this.canMove)
    {
        this.move();
    }
}

//creates a random value to determine of the enemy can phase through walls toward the player
Dragon.prototype.move = function()
{
    if (this.randomValue > 99900 || this.ghost)
    {
        this.image.src = "img/dragonI.png";
        this.ghost = true;
        if (this.x > player.x)
        {
            this.x-=this.speed;
            this.right = false;
        }
        if (this.x < player.x)
        {
            this.x+=this.speed;
            this.right = true;
        }
        if (this.y > player.y)
        {
            this.y -=this.speed;
        }
        if (this.y < player.y)
        {
            this.y+=this.speed;
        }
    }
    this.randomValue = Math.floor(Math.random()*100000)+1;
    
    //checks collision with falling stones
    for (var i = 0; i < stones.length; i++)
    {
        if (stones[i].falling&& stones[i].doesNothing < 0)
        {
            if (this.x > stones[i].x-this.width && this.x < stones[i].x+stones[i].width)
            {
                if (this.y > stones[i].y-this.height && this.y < stones[i].y+stones[i].height)
                {
                    //removes enemy if they get hit and increases player's score
                    this.canMove = false;
                    this.speed = 0;
                    this.x = STAGE_WIDTH*2;
                    this.y = STAGE_HEIGHT*2;
                    player.kills+=1;
                }
            }
        }
    }
}

//goggles object
function Goggles()
{
    this.image = new Image();
    this.image.ready = false;
    this.imgSrc = "img/gogglesR.png";
    this.image.src = this.imgSrc;
    this.spriteWidth = 104;
    this.x;
    this.y;
    this.currX = 0;
    this.currY = 0;
    this.width = 52;
    this.height = 60;
    this.scale = 1;
    this.speed = .7;
    this.right = true;
    this.canMove = true;
    this.randomValue = 1;
    this.ghost = false;
    this.moveRight = true;
    this.moveUp = true;
}

//draws the enemy and calls its move function
Goggles.prototype.draw = function()
{
    if (this.right == false && this.ghost == false)
    {
        this.image.src = "img/gogglesL.png";
    }
    else if (this.right == true && this.ghost == false)
    {
        this.image.src = "img/gogglesR.png";
    }
    else
    {
        this.image.src = "img/gogglesI.png";
    }
     ctx.drawImage(this.image,
					this.currX,this.currY,            		// sprite upper left positino	
					this.width,this.height, 		// size of a sprite 72 x 96
					this.x,this.y,  	// canvas position
					this.scale*this.width,this.scale*this.height      // sprite size scale
					);
    if (this.canMove)
    {
        this.move();
    }
}

//creates a random value to determine of the enemy can phase through walls toward the player
Goggles.prototype.move = function()
{
    if (this.randomValue > 99900 || this.ghost)
    {
        this.image.src = "img/gogglesI.png";
        this.ghost = true;
        if (this.x > player.x)
        {
            this.x-=this.speed;
            this.right = false;
        }
        if (this.x < player.x)
        {
            this.x+=this.speed;
            this.right = true;
        }
        if (this.y > player.y)
        {
            this.y -=this.speed;
        }
        if (this.y < player.y)
        {
            this.y+=this.speed;
        }
    }
    this.randomValue = Math.floor(Math.random()*100000)+1;
    
    //checks for collision with falling stones
    for (var i = 0; i < stones.length; i++)
    {
        if (stones[i].falling&& stones[i].doesNothing < 0)
        {
            if (this.x > stones[i].x-this.width && this.x < stones[i].x+stones[i].width)
            {
                if (this.y > stones[i].y-this.height && this.y < stones[i].y+stones[i].height)
                {
                    //removes enemy if they get hit and increases player's score
                    this.canMove = false;
                    this.speed = 0;
                    this.x = STAGE_WIDTH*2;
                    this.y = STAGE_HEIGHT*2;
                    player.kills +=1;
                }
            }
        }
    }
    
}
//Weapon object
function Weapon()
{
    this.image = new Image();
    this.image.ready = false;
    this.width;
    this.height;
    if (player.lastMoved == 0)
    {
        this.image.src = "img/weaponR.png";
        this.width = 104; 
        this.height = 15;
        this.x = player.x+player.width/2;
        this.y = player.y+player.height/3;
    }
    else if (player.lastMoved == 2)
    {
        this.image.src = "img/weaponL.png";
        this.width = 104;
        this.height = 15;
        this.x = player.x-this.width*1.8;
        this.y = player.y+player.height/3;
    }
    else if (player.lastMoved == 1)
    {
        this.image.src = "img/weaponU.png";
        this.width = 15;
        this.height = 104;
        this.x = player.x+player.width/2;
        this.y = player.y-3*player.height+5;
    }
    else if (player.lastMoved == 3)
    {
        this.image.src = "img/weaponD.png";
        this.width = 15;
        this.height = 104;
        this.x = player.x+player.width/2-10;
        this.y = player.y+player.height-30;
    }
    this.spriteWidth = this.width;
    this.spriteHieght = this.height;
    this.currX = 0;
    this.currY = 0;
    this.scale = 2;
    this.damage = player.damage;
}

//draws the weapon
Weapon.prototype.draw = function()
{
    ctx.drawImage(this.image,
					this.currX,this.currY,            		// sprite upper left positino	
					this.width,this.height, 		// size of a sprite 72 x 96
					this.x,this.y,  	// canvas position
					this.scale*this.width,this.scale*this.height      // sprite size scale
					);
    this.enemyCollision();
}
//checks to see if weapon collides with an enemy
//if not, all enemies damage and size are reset to normal
Weapon.prototype.enemyCollision = function()
{
    //goes through arrays of dragons
    for (var i = 0; i < dragons.length; i++)
    {
        if (dragons[i].x+dragons[i].width >= this.x && dragons[i].x<= this.x+1.8*this.width)
        {
            if (dragons[i].y+dragons[i].height >= this.y && dragons[i].y <= this.y+1.8*this.height)
            {
                dragons[i].canMove = false;
                dragons[i].scale+=this.damage;
                if (dragons[i].scale > 1.5)
                {
                    dragons[i] = new Dragon();
                    player.score += 100;
                    player.kills+=1;
                }
            }
            else 
            {
                dragons[i].scale = 1;
                dragons[i].canMove = true;
            }
        }
        else 
        {
            dragons[i].scale = 1;
            dragons[i].canMove = true;
        } 
    }
    //goes through array of goggles
    for (var i = 0; i < goggles.length; i++)
    {
        if (goggles[i].x+goggles[i].width >= this.x && goggles[i].x<= this.x+1.8*this.width)
        {
            if (goggles[i].y+goggles[i].height >= this.y && goggles[i].y <= this.y+1.8*this.height)
            {
                goggles[i].canMove = false;
                goggles[i].scale+=this.damage;
                if (goggles[i].scale > 1.5)
                {
                    goggles[i] = new Goggles();
                    player.score+=100;
                    player.kills+=1;
                }
            }
            else
            {
                goggles[i].scale = 1;
                goggles[i].canMove = true;
            }
        }
        else
        {
            goggles[i].scale = 1;
            goggles[i].canMove = true;
        }
    }         
}

//stone object
function Stone()
{
    this.image = new Image();
    this.image.ready = false;
    this.imgSrc = "img/stone.png";
    this.image.src = this.imgSrc;
    this.x;
    this.y;
    this.width = 52;
    this.height = 60;
    this.currX = 0;
    this.currY = 0;
    this.scale = 1;
    this.isFalling = false;
    this.speed = 1;
    this.doesNothing = 40;
}

//draws the stone
Stone.prototype.draw = function()
{
     ctx.drawImage(this.image,
					this.currX,this.currY,            		// sprite upper left positino	
					this.width,this.height, 		// size of a sprite 72 x 96
					this.x,this.y,  	// canvas position
					this.scale*this.width,this.scale*this.height      // sprite size scale
					);
    
}

//checks to see if walls are invisible below it, and if so, then it begins to fall
Stone.prototype.move = function()
{
    var allInvisible = false;
    for (var i = 0; i < 48; i++)
    {
        for (var j = 0; j < 56; j++)
        {
            if (walls[i][j].x >= this.x && walls[i][j].x <= this.x+this.width-walls[i][j].width)
            {
                if (walls[i][j].y >=this.y+this.height-walls[i][j].height && walls[i][j].y <=this.y+this.height)
                {
                    if (walls[i][j].invisible)
                    {
                        allInvisible = true;
                    }
                    else
                    {
                        allInvisible = false;
                        break;
                    }
                }
            }
        }
    }
    if (allInvisible)
    {
        if (this.y < 774)
        {
            this.doesNothing -=1;
            this.falling = true;
            this.y+=this.speed; 
        }
        else
        {
            this.falling = false;
            this.doesNothing = 40;
        }
    }
    else
    {
        this.falling = false;
        this.doesNothing = 40;
    }
}

//speedup object
function SpeedUp()
{
    this.image = new Image();
    this.image.ready = false;
    this.imgSrc = "img/speedUp.png";
    this.image.src = this.imgSrc;
    this.x = 340;
    this.y = 350;
    this.width = 52;
    this.height = 60;
    this.currX = 0;
    this.currY = 0;
    this.scale = 1;
}

//checks collision with player
SpeedUp.prototype.collision = function()
{
    if (this.x > player.x-this.width && this.x < player.x+player.width)
            {
                if (this.y > player.y-this.height && this.y < player.y+player.height)
                {
                    //increases player speed and score
                    this.x = STAGE_WIDTH*2;
                    this.y = STAGE_HEIGHT*2;
                    player.speed*=2;
                    player.score+=100;
                }
            }
}

//draws the object
SpeedUp.prototype.draw = function()
{
     ctx.drawImage(this.image,
					this.currX,this.currY,            		// sprite upper left positino	
					this.width,this.height, 		// size of a sprite 72 x 96
					this.x,this.y,  	// canvas position
					this.scale*this.width,this.scale*this.height      // sprite size scale
					);
}

//damageup object
function DamageUp()
{
    this.image = new Image();
    this.image.ready = false;
    this.imgSrc = "img/damageUp.png";
    this.image.src = this.imgSrc;
    this.x = 400;
    this.y = 400;
    this.width = 52;
    this.height = 60;
    this.currX = 0;
    this.currY = 0;
    this.scale = 1;
}

//checks collision with player
DamageUp.prototype.collision = function()
{
    if (this.x > player.x-this.width && this.x < player.x+player.width)
            {
                if (this.y > player.y-this.height && this.y < player.y+player.height)
                {
                    //increases player damage and score
                    this.x = STAGE_WIDTH*2;
                    this.y = STAGE_HEIGHT*2;
                    player.damage*=3;
                    player.score+=100;
                }
            }
}

//draws the object
DamageUp.prototype.draw = function()
{
     ctx.drawImage(this.image,
					this.currX,this.currY,            		// sprite upper left positino	
					this.width,this.height, 		// size of a sprite 72 x 96
					this.x,this.y,  	// canvas position
					this.scale*this.width,this.scale*this.height      // sprite size scale
					);
}

//intializes animation
function initAnim()
{
	t0 = new Date().getTime(); 
	animFrame();
}

//creates animation frame
function animFrame()
{
	//animId = requestAnimationFrame( animFrame, canvas ); 
	animId = requestAnimationFrame( animFrame ); 
	
	// better to request/schedule the next frame right away.
	onTimer(); 
}

//performs game actions on a timer
function onTimer()
{
	// measure actual elapsed time.
	var t1 = new Date().getTime();     // returns milliseconds.
	dt = time_scale * ( t1 - t0 ) ;    // convert it to whatever time scale.
	t0 = t1;
	if ( dt > 0.2 ) 
	{
		dt = 0 		// reset. something wacky is going on here.
	};	
	
    gameTick();
	
}

//runs every tick to handle movement and collision
function gameTick()
{
    //clears the screen
    clearRect();
    
    //updates sprites to control how often their animation updates
    if (spriteDelay == 50)
    {
        player.currX+=player.width;
        if (player.currX >= player.spriteWidth)
        {
            player.currX = 0;
        }
        for (var i = 0; i < dragons.length; i++)
        {
            dragons[i].currX+=dragons[i].width;
            if (dragons[i].currX >=dragons[i].spriteWidth)
            {
                dragons[i].currX = 0;
            }
        }
        for (var i = 0; i < goggles.length; i++)
        {
            goggles[i].currX+=goggles[i].width;
            if (goggles[i].currX >=goggles[i].spriteWidth)
            {
                goggles[i].currX = 0;
            }
        }
        spriteDelay = 0;
    }
    spriteDelay += 1;
    drawGrid();
    player.move();
    for (var i = 0; i < dragons.length; i++)
    {
        dragons[i].draw();
        if (player.weapon == null)
        {
            dragons[i].canMove = true;
            dragons[i].scale = 1;
        }
    }
    for (var i = 0; i < goggles.length; i++)
    {
        goggles[i].draw();
        if (player.weapon == null)
        {
            goggles[i].canMove = true;
            goggles[i].scale = 1;
        }
    }
    if (player.weapon != null)
    {
        player.weapon.draw();
        player.weapon.x+=1;
    }
    moveEnemies();
    for (var i = 0; i < stones.length; i++)
    {
        stones[i].draw();
        stones[i].move();
    }
    
    damageUp.collision();
    damageUp.draw();
    speedUp.collision();
    speedUp.draw();

    
    checkForWin();
}

//stops the animation
function stop()
{
	cancelAnimationFrame( animId );
    clearRect();
    if (player.kills == 4)
    {
        ctx.fillText("You Win!",270,425);
    }
    else
    {
        ctx.fillText("Game Over.",270,425);
    }
    ctx.fillText("Score: " + player.score, 270,470);
}

//moves enemies in their set starting paths
function moveEnemies()
{
        //moving enemies
    if (dragons[0].y >= 190 && dragons[0].moveUp == true && dragons[0].ghost == false && dragons[0].canMove)
    {
        dragons[0].y-=dragons[0].speed;
    }
    if (dragons[0].y == 190 && dragons[0].ghost == false && dragons[0].canMove)
    {
        dragons[0].moveUp = false;
    }
    if (dragons[0].y <= 368 && dragons[0].moveUp == false && dragons[0].ghost == false && dragons[0].canMove)
    {
        dragons[0].y+=dragons[0].speed;
    }
    if (dragons[0].y == 368 && dragons[0].ghost == false && dragons[0].canMove)
    {
        dragons[0].moveUp = true;
    }
    
    if (dragons[1].x < 570 && dragons[1].moveRight == true && dragons[1].ghost == false && dragons[1].canMove)
    {
        dragons[1].x+=dragons[1].speed;
    }
    if (dragons[1].x == 570 && dragons[1].ghost == false && dragons[1].canMove)
    {
        dragons[1].right = false;
        dragons[1].moveRight = false;
    }
    if (dragons[1].x > 475 && dragons[1].moveRight == false && dragons[1].ghost == false && dragons[1].canMove)
    {
        dragons[1].x-=dragons[1].speed;
    }
    if (dragons[1].x == 475 && dragons[1].ghost == false && dragons[1].canMove)
    {
        dragons[1].right = true;
        dragons[1].moveRight = true;
    }
    
    if (goggles[0].x <= 260 && goggles[0].moveRight == true && goggles[0].ghost == false && goggles[0].canMove)
    {
        goggles[0].x+=goggles[0].speed;
    }
    if (goggles[0].x >= 260 && goggles[0].ghost == false && goggles[0].canMove)
    {
        goggles[0].right = false;
        goggles[0].moveRight = false;
    }
    if (goggles[0].x >= 105 && goggles[0].moveRight == false && goggles[0].ghost == false && goggles[0].canMove)
    {
        goggles[0].x-=goggles[0].speed;
    }
    if (goggles[0].x < 105 && goggles[0].ghost == false && goggles[0].canMove)
    {
        goggles[0].right = true;
        goggles[0].moveRight = true;
    }
    
    if (goggles[1].y > 535 && goggles[1].moveUp == true && goggles[1].ghost == false && goggles[1].canMove)
    {
        goggles[1].y-=goggles[1].speed;
    }
    if (goggles[1].y < 535 && goggles[1].ghost == false && goggles[1].canMove)
    {
        goggles[1].moveUp = false;
    }
    if (goggles[1].y < 725 && goggles[1].moveUp == false && goggles[1].ghost == false && goggles[1].canMove)
    {
        goggles[1].y+=goggles[1].speed;
    }
    if (goggles[1].y > 725 && goggles[1].ghost == false && goggles[1].canMove)
    {
        goggles[1].moveUp = true;
    }
}

//updates the player score and draws lives in the bottom left of the screen
function updateScore()
{
    if (player.score < 0)
    {
        player.score = 0;
    }
    ctx.fillText("Score: " + player.score, STAGE_WIDTH-170, STAGE_HEIGHT-23);

    if (player.lives > 1)
    {
                ctx.drawImage(player.originalImg,
					0,0,            		// sprite upper left positino	
					player.width,player.height, 		// size of a sprite 72 x 96
					10,STAGE_HEIGHT-65,  	// canvas position
					player.scale*player.width,player.scale*player.height      // sprite size scale
					);
    }
    if (player.lives > 2)
    {
                ctx.drawImage(player.originalImg,
					0,0,            		// sprite upper left positino	
					player.width,player.height, 		// size of a sprite 72 x 96
					15+player.width,STAGE_HEIGHT-65,  	// canvas position
					player.scale*player.width,player.scale*player.height      // sprite size scale
					);
    }
}

//checks for end case - player kills all enemies, or player runs out of lives
function checkForWin()
{
    if (player.kills == 4 || player.lives <=0)
    {
        stop();
    }
}

//handles actions for key presses
function onDown(evt)
{
    if (evt.keyCode == 39 || evt.keyCode == 68) //right or D key
    {
        player.rightPressed = true;
        player.lastMoved = 0;
    }
    else if (evt.keyCode == 37 || evt.keyCode == 65) //left or A key
    {
        player.leftPressed = true;
        player.lastMoved = 2;
    }
    else if (evt.keyCode == 38 || evt.keyCode == 87) //up or W key
    {
        player.upPressed = true;
        player.lastMoved = 1;
    }
    else if (evt.keyCode == 40 || evt.keyCode == 83) //down or S key
    {
        player.downPressed = true;
        player.lastMoved = 3;
    }
    else if (evt.keyCode == 32) //space
    {
        player.usingWeapon = true;
    }
}

//handles actions for key releases
function onUp(evt)
{
    if (evt.keyCode == 39 || evt.keyCode == 68) //right key
    {
        player.rightPressed = false;
    }
    else if (evt.keyCode == 37 || evt.keyCode == 65) //left key
    {
        player.leftPressed = false;
        
    }
    else if (evt.keyCode == 38 || evt.keyCode == 87) //up key
    {
        player.upPressed = false;
        
    }
    else if (evt.keyCode == 40 || evt.keyCode == 83) //down key
    {
        player.downPressed = false;
        
    }
    else if (evt.keyCode == 32) //space
    {
        player.usingWeapon = false;
        player.weapon = null;
    }
}