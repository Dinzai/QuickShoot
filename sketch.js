
up = false;
down = false;
left = false;
right = false;
hasShot = false;
let screenWidth = 800;
let screenHeight = 800;

class bullet
{

  constructor(x, y, size, angle)
  {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = angle;
    this.isActive = true;
  }

  Update(time)
  {
    this.x += cos(this.angle) * time;
    this.y += sin(this.angle) * time;

    if(this.x > screenWidth || this.x < 0 || this.y < 0 || this.y > screenHeight)
    {
      this.isActive = false;
    }

  } 

  Drawable()
  {
    fill(255,0,0);
    circle(this.x, this.y, this.size);
  }

}

class Player 
{

  allBullets = [];

  constructor(x,y,size)
  {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 0.25;
  }

  calculateAngle()
  {
    let distanceX = mouseX - this.x;
    let distanceY = mouseY - this.y;

    let angle = atan2(distanceY, distanceX);
    return angle;
    
  }

  shootBullet()
  {
    let temp = this.calculateAngle();
    
    for(let i = 0; i < this.allBullets.length; i++)
    {
      if(this.allBullets[i].isActive == false)
      {
        this.allBullets.splice(i, 1);
      }
    }

    if(hasShot)
    {
      this.allBullets.push(new bullet(this.x + this.size/2, this.y + this.size/2, 10, temp));
      hasShot = false;
    }
  }


  Update(time)
  {

    for(let i = 0; i < this.allBullets.length; i++)
    {
      this.allBullets[i].Update(time);
    }
    print(this.allBullets.length);

    if(this.y > this.size / 4)
    {  
      if(up)
      {
        this.y -= this.speed * time;

      }
    }

    if(this.y < screenHeight - this.size * 1.2)
    { 
      if(down)
      {
        this.y += this.speed * time;

      }
    }
    if(this.x < screenWidth - this.size * 1.2)
    { 
      if(right)
      {
        this.x += this.speed * time;

      }
    }
    if(this.x > 0)
    { 
      if(left)
      {
        this.x -= this.speed * time;
      }
    }
    this.shootBullet();
  }

  Drawable()
  {

    for(let i = 0; i < this.allBullets.length; i++)
    {
      this.allBullets[i].Drawable();
    }

    fill(0,0,255);
    rect(this.x,this.y, this.size, this.size);
  }


}

function mousePressed()
{
  hasShot = true;
}


function keyPressed()
{
  if(key == 'w')
  {
    up = true;
  }
  if(key == 's')
  {
    down = true;
  }
  if(key == 'a')
  {
    left = true;
  }
  if(key == 'd')
  {
    right = true;
  }

}

function keyReleased()
{
  if(key == 'w')
  {
    up = false;
  }
  if(key == 's')
  {
    down = false;
  }
  if(key == 'a')
  {
    left = false;
  }
  if(key == 'd')
  {
    right = false;
  } 


}

let myPlayer; 

function setup() {
  createCanvas(screenWidth, screenHeight);
  myPlayer = new Player(200, 200, 20);
}

function draw() {
  background(220);
  myPlayer.Update(deltaTime);
  myPlayer.Drawable();
}
