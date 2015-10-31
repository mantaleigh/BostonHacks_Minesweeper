$(document).ready(function() { 

  var b = createEasyBoard();
  addBoard(b);

  function createEasyBoard() {
    // the easy board is 9x9 and has 10 mines
    var board = [];
    for(var i = 0; i < 9; i++) { 
      board[i] = [];
      for (var j = 0; j < 9; j++) board[i][j] = 0;
    } 
    // not pretty
    // select 10 random positions to put a mine and place it there (spot has true)
    var minesPlaced = 0;
    while (minesPlaced < 10){ 
      var x = Math.floor(Math.random()*9); 
      var y = Math.floor(Math.random()*9);
      if (board[x][y] != true) { 
        board[x][y] = true;
        if (x > 0) {
          board[x-1][y]++;
          if (y > 0) { 
            board[x-1][y-1]++;
          }
          if (y < 8) board[x-1][y+1]++;
        }
        if (y < 8) board[x][y+1]++;
        if (y > 0) board[x][y-1]++;
        if (x < 8) { 
          board[x+1][y]++;
          if (y < 8) board[x+1][y+1]++;
          if (y > 0) board[x+1][y-1]++;
        }
        minesPlaced++;
      }
    }
    console.log(board);
    return board;
  }

// working on this
  function addBoard(boardData) {
    var mainDiv = $('#board');
    var result = "<table border=1>";
    for (var i = 0; i < 9; i++) { 
      result += "<tr>";
      for (var j = 0; j < 9; j++) { 
         result += "<td>"+boardData[i][j] + "</td>";
      }
      result = result + "</tr>";
    }
    mainDiv.append(result);
  }

})