var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feed_Dog;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastfed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy_dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed_Dog =createButton("Feed Dog");
  feed_Dog.position(800,125);
  feed_Dog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  
  //write code to read fedtime value from the database 
 
 feed = database.ref('FeedTime');
 database.ref('FeedTime').on("value",function(data){
 lastfed = data.val();
 })
  //write code to display text lastFed time here
  fill(255,255,254);
  textSize(15);
  if(lastfed >=12){
    console.log(lastfed)
    text("Last Feed :"+lastfed %12 +"PM", 350,30);
  }
  else if(lastfed ==0){
    console.log(lastfed)
    text("Last Feed :12 AM", 350,30);
  }
  else{
    console.log(lastfed)
    text("Last Feed :"+lastfed +"AM", 350,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){

dog.addImage(happyDog);
//write code here to update food stock and last fed time
//getTime();
var food_stock_val = foodObj.getFoodStock();
if(food_stock_val<=0){
foodObj.updateFoodStock(food_stock_val*0)
dog.addImage(sadDog);
}
else{
  foodObj.updateFoodStock(food_stock_val-1)
  
}

  
database.ref('/').update({
Food : foodObj.getFoodStock(),
FeedTime : hour()
})
 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

