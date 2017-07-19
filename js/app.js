// wait for the DOM to finish loading

var numberOfClick = 0;
var marker = "X";
var arrayOfBoard = [];
var gameRunning = true;
function createArrayOfBoard(){
  for (var i = 0; i < 3; i++){
    arrayOfBoard[i] = [];
  }
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      arrayOfBoard[i][j] = "";
    }
  }
}
function addingId(){
  var arrayOfId = [];
  for (var i = 0; i < 3; i++){
    for ( var j = 0; j < 3; j++){
      arrayOfId.push(i + "-" + j);
    }
  }
  $.each($(".box"), function(i){
    $(this).attr("id", arrayOfId[i]);
    $(this).text("");
  });
}
function reset(){
  numberOfClick = 0;
  marker = "X";
  gameRunning = true;
  $("#textForWinner").text("");
}


$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function
  $("#textForWinner").text("It's" +marker + "turn.");
  function checkResult(){
  var arrayToWinByX = [];
  for ( var i = 0; i < 3; i++){
    arrayToWinByX.push("X");
  }
  var arrayToWinByO= [];
  for ( var i = 0; i < 3; i++){
    arrayToWinByO.push("Y");
  }
  var arrayToTestEquality = [];
  for (var i = 0; i < 3; i++){
    arrayToTestEquality = [];
    for (var j = 0; j < 3; j++){
      arrayToTestEquality.push(arrayOfBoard[i][j]);
    }
    if (isArrayEqual(arrayToTestEquality, arrayToWinByX) || isArrayEqual(arrayToTestEquality, arrayToWinByO)){
      winnerCall(marker);
      return false;
    }
  }
  for (var i = 0; i < 3; i++){
    arrayToTestEquality = [];
    for ( var j = 0; j < 3; j++){
      arrayToTestEquality.push(arrayOfBoard[j][i]);
    }
    if (isArrayEqual(arrayToTestEquality, arrayToWinByX) || isArrayEqual(arrayToTestEquality, arrayToWinByO)){
      winnerCall(marker);
      return false;
    }
  }
  arrayToTestEquality = [];
  for (var j = 0; j < 3; j++){
    arrayToTestEquality.push(arrayOfBoard[j][j]);
  }
  if (isArrayEqual(arrayToTestEquality, arrayToWinByX) || isArrayEqual(arrayToTestEquality, arrayToWinByO)){
    winnerCall(marker);
    return false;
  }
  arrayToTestEquality = [];
		for (var i = 0, var j = 2; i < 3, j >= 0; i++, j--){
		 	arrayToTestEquality.push(arrayOfBoard[i][j]);
	 	}
	 	if(isArrayEqual(arrayToTestEquality, arrayToWinByX) || isArrayEqual(arrayToTestEquality,arrayToWinByO)){
				winnerCall(marker);
				return false;
		}
  var draw = true;
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (arrayOfBoard[i][j] === ""){
        draw = false;
      }
    }
  }
  if(draw){
    $("#textForWinner").text("Game draw!!!");
    return false;
  }
  return true;
  }
function isArrayEqual(array1, array2){
  if (array1.length !== array2.length){
    return false;
  } else {
    for (var i = 0; i < array1.length; i++){
      if (array1[i] === array2[i]){
        continue;
      } else {
        return false;
      }
    }
    return true;
  }
}
function winnerCall(winner){
  $("#textForWinner").text("winner is " + winner);
}
createArrayOfBoard();
addingId();
$(document).on("click", function(event){
  if (gameRunning){
    var clickedPlace = $(event.target);
    var clickedPlaceId = clickedPlace.attr("id");
    if ( clickedPlaceId && clickedPlace.text()=== ""){
    var placeValue = clickedPlaceId.split("-");
    var x = placeValue[0];
    var y = placeValue[1];
    arrayOfBoard[x][y] = marker;
    $("#" + clickedPlaceId).text(marker);
    console.log("The turn is: " +  marker);
    gameRunning = checkResult();
    if (gameRunning){
      numberOfClick++;
      if (numberOfClick % 2 === 0){
        marker = "X";
      } else {
        marker = "O";
      }
      $("#textForWinner").text(marker + "turn!!");
    }
    }
  }
});
});
