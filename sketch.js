//Create variables here
var dogimg, dogimg2,dog
var database
var foodstock,food
var foodObject;
var addfood;
var lastFed;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodObject = new Food();
  dog = createSprite(250,400,15,15);
  
  
  dog.addImage(dogImg);
  dog.scale = 0.25;
  foodstock = database.ref('Food')
  foodstock.on("value",readStock)
  
  feed = createButton("Feed the Dog")
  feed.position(650,90);
  feed.mousePressed(feedDog);
  addfood = createButton("Add Food")
  addfood.position(750,90)
  addfood.mousePressed(addFood)
} 


function draw() {  
  background(46,139,87);
  foodObject.display();
  FeedTime = database.ref('FeedTime')
  FeedTime.on("value",function(data) {
    lastFed = data.val()
  })
  fill("white")
  textSize(20)
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed%12 + " PM",350,30);
  } else if(lastFed = 0) {
    text("Last Feed : 12 AM",350,30)
  } else {
    text("Last Feed: " + lastFed + "AM",350,30);
  }
  drawSprites();                                                                            
  //add styles here 
}


function readStock(data) {
  food = data.val();
  foodObject.updateFoodStock(food);

}

function addFood() {
  
  database.ref('/').update({
    Food : food + 1
  })
}

function feedDog() {
  dog.addImage(dogImg2);
  milk = createSprite(150,380,10,10)
  milk.addImage(foodObject.image)
  milk.scale = 0.1
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref('/').update({
    Food : foodObject.getFoodStock(),
    FeedTime : hour()
  }) 
    
  
}
