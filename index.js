var begun = false;
var handVal = 0;
var aceChosen = true;
var card1Value = -1;
var card2Value = -1;
var ace1Value = 0;
var ace2Value = 0;
var card1 = [];
var card2 = [];
var dealerHand = 0;

init();

function init() {
  $(".card-holder").empty();
  $("#narrator").text("");
  $("#dealer-stuff").text("Dealer Total: ")
  $("#your-stuff").text("Your Total: ")

  handVal = 0;

  $(".restart-button-holder").css("visibility", "hidden");
  $(".button-holder").css("visibility", "visible");

  var card1Value = 0;

  var card2Value = 0;


  deal();

}
function deal() {


  card1 = makeCard();
  card2 = makeCard();

  while(card2[0] === card1[0] && card2[1] === card1[1]){
    card2 = makeCard();
  }

  var card1Value = card1[1];
  var card1Suit = card1[0];
  var card2Value = card2[1];
  var card2Suit = card2[0];

  valueOfCard(card1Value, 1);
  valueOfCard(card2Value, 2);

  if(card1Value === 1){
    handVal = card2Value;
  }
  if(card2Value === 1){
    handVal = card1Value;
  }

  drawCard(card1Value, card1Suit);
  drawCard(card2Value, card2Suit);

  $("#your-stuff").empty();
  $("#your-stuff").append("Your Total: " + handVal);
}
function makeCard() { //returns suit and value
  var cardSuit = Math.floor((Math.random() * 4) + 1);
  var cardSuitName = "";

  var cardValue = Math.floor((Math.random() * 13) + 1);
  return [cardSuit, cardValue];
}

function drawCard(val, suit) {
  var cardSuitName = "";
  switch(suit){
    case 1:
      cardSuitName = "spades";
      break;
    case 2:
      cardSuitName = "clubs";
      break;
    case 3:
      cardSuitName = "hearts"
      break;
    case 4:
      cardSuitName = "diamonds"
      break;
  }
  $(".card-holder").append("<img src='img/Cards/"+val+"_of_"+cardSuitName+".png' class='card'>");

}

function valueOfCard(cv, aceNum) {
  console.log(cv);
  if(cv > 1 && cv < 11){
    handVal += cv;
    console.log(handVal);

  }else if(cv >= 11){
    handVal += 10;
    console.log(handVal);

  }else{
      aceChosen = false;
      ace(aceNum);
  }

}

function waitForIt() {
  if (!aceChosen) {
    setTimeout(waitForIt,500);
  } else {
    console.log("ace has been chosen");
  }
}

function ace(aceNum) {
  console.log(handVal);

  aceChosen = false;
  $(".ace-sheet").css("visibility", "visible");
  $(".ace-button-holder").css("visibility", "visible");
  $(".regulars").css("visibility", "hidden");

  if(!aceChosen){
    waitForIt();
  }
  $("#ten-button").click(function () {
    $(".ace-sheet").css("visibility", "hidden");
    $(".ace-button-holder").css("visibility", "hidden");
    $(".regulars").css("visibility", "visible");
    handVal += 11;
    console.log(handVal);
    $("#your-stuff").empty();
    $("#your-stuff").append("Your Total: " + handVal);
  });
  $("#one-button").click(function () {
    $(".ace-sheet").css("visibility", "hidden");
    $(".ace-button-holder").css("visibility", "hidden");
    $(".regulars").css("visibility", "visible");
        handVal += 1;
        $("#your-stuff").empty();
        $("#your-stuff").append("Your Total: " + handVal);

  });
}

document.getElementById("hit-button").addEventListener("click", function () {

  var newCard = makeCard();
  console.log(card2[0] + " " + newCard[1]);
  while((newCard[0] === card2[0] || newCard[0] === card1[0]) && (newCard[1] === card2[1]  || newCard[1]=== card1[1])){
    newCard = makeCard();
  }
  valueOfCard(newCard[1], 2);
  drawCard(newCard[1], newCard[0]);
  $("#your-stuff").empty();


  if(handVal > 21){
    $("#narrator").text("YOU LOSE");
    $(".button-holder").css("visibility", "hidden");
    $(".restart-button-holder").css("visibility", "visible");
  }

  $("#your-stuff").empty();
  $("#your-stuff").append("Your Total: " + handVal);

})

document.getElementById("stay-button").addEventListener("click", function () {

  $(".button-holder").css("visibility", "hidden");
  dealerHand = 16 + (Math.floor(Math.random() * 5));
  $("#dealer-stuff").text("Dealer Total: "+dealerHand)
  if(handVal > dealerHand){
    $("#narrator").text("YOU WIN");
  }else{
    $("#narrator").text("YOU LOSE");
  }
  $(".restart-button-holder").css("visibility", "visible");
});

document.getElementById("restart-button").addEventListener("click", function () {
  location.reload();
});
