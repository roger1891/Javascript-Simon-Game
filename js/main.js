$(document).ready(function(){
  //variables
  var count = 0;
  var possibilties = ["#btn-0", "#btn-1", "#btn-2", "#btn-3"];
  var currentGame = [];
  var player = [];
  var btn0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var btn1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var btn2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var btn3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  var sound = [btn0, btn1, btn2, btn3];
  var strict = false;

  //sidebar functionality
  var sidebarToggle = function(menuId){
    $("#" + menuId).click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });    
  };
  
  //open sidebar
  sidebarToggle("menu-toggle");
  
  //close sidebar
  sidebarToggle("close-menu");
  
  //new game
  var newGame = function() {
    clearGame();
  }
  
  //clear game
  var clearGame = function () {
    currentGame = [];
    count = 0;
    addCount();
  }
  
  function nextLevel() {
    addCount();
  }
  
  //add count to round board
  var addCount = function() {
    count++;
    $("#timer").addClass("btn-hover");
    
    setTimeout(function(){
      $("#timer").removeClass("btn-hover").html(count);
    }, 200);
    
    generateMove();
  }
  
  //generating a move
  var generateMove = function() {
    var randomNumber = possibilties[(Math.floor(Math.random()*4))];
    console.log(randomNumber);
    currentGame.push(randomNumber);
    
    showMoves();
  }
  
  //show moves
  var showMoves = function() {
    var i = 0;
    var moves = setInterval(function(){
      playGame(currentGame[i]);
      console.log(currentGame[i]);
      i++;
      if(i >= currentGame.length) {
        clearInterval(moves);
      }
    }, 600);
    
    clearPlayer();
  }
  
  //play the game
  var playGame = function(field){  
    var strNum = field.replace( /^\D+/g, '');
    var theNum = parseInt(strNum);   
    $(field).addClass("btn-hover");
    console.log(theNum)
    sound[theNum].play();
    setTimeout(function(){
      $(field).removeClass("btn-hover");
    }, 300);
  }
  
  //clear player
  var clearPlayer = function() {
    player = [];
  }
  

   //player button clicks
  $(".my-btn").click(function(){
    var $input = $(this);
    var attrString = $input.attr("id");
    //only get number from id attribute
    var strNum = attrString.replace( /^\D+/g, '');
    //convert theNumber from string to number
    var theNum = parseInt(strNum);
    var field = "#" + attrString;
    console.log("input" + field);
    player.push(field);
    playerTurn(field);
  }); 
  
  //player turn
  var playerTurn = function(x) {
    if(player[player.length - 1] !== currentGame[player.length - 1]) {
      if(strict)  {
        alert("Try again from scratch");
        newGame();
      }  
      else {
        alert("Wrong move! Try again");
        showMoves();
      }
    }
    else {
      console.log("Good MOve!");
      console.log(currentGame);
      var strNum = x.replace( /^\D+/g, '');
      var theNum = parseInt(strNum);   
      console.log(theNum)
      sound[theNum].play(); 

      var check = player.length === currentGame.length;
      if(check) {
        if(count ==20) {
          alert("You won! Nice!");
        }
        else {
          alert("Next round!");
          nextLevel();
        }
      }
    }
  }
  
  
  //off game function
  var offGame = function() {
    $("#timer").removeClass("btn-hover").html(0);
    //disable button after click
    $(".my-btn").prop("disabled", true);
    //make disabled button visible via css
    $(".my-btn").css("cursor", "not-allowed");   
  }
 
  //off game
  offGame();
  
  //game toggle
  $('#gameStat').change(function() {
    if($(this).prop('checked') == true){
      console.log("on") ;
      $(".my-btn").prop("disabled", false);
      //make disabled button visible via css
      $(".my-btn").css("cursor", "pointer");          
      newGame();
    }
    else {
      offGame();
    }
  });
  
  //reset game
  $("#reset").click(function(){
    newGame();
  });

  //strict mode
  $('#strictMode').change(function() {
    if($(this).prop('checked') == true){
      strict = true;
    }
    else {
      strict = false;
    }
  }); 
  
});