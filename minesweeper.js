$(document).ready(function() { 

  var b = createBoard(15, 15, 10);
  addBoard(b);

  function createBoard(r, c, numMines) {
    var minePositions = [];
    // the easy board is 9x9 and has 10 mines
    var board = [];
    for(var i = 0; i < c; i++) { 
      board[i] = [];
      for (var j = 0; j < r; j++) board[i][j] = 0;
    } 
    // not pretty
    // select 10 random positions to put a mine and place it there (spot has X)
    var minesPlaced = 0;
    while (minesPlaced < numMines){ 
      var x = Math.floor(Math.random()*c); 
      var y = Math.floor(Math.random()*r);
      if (board[x][y] != 'X') { 
        board[x][y] = 'X';
        minePositions.push([x,y]);
        if (x > c-1) {
          board[x-1][y]++;
          if (y > r-1) { 
            board[x-1][y-1]++;
          }
          if (y < 0) board[x-1][y+1]++;
        }
        if (y < r-1) board[x][y+1]++;
        if (y > 0) board[x][y-1]++;
        if (x < c-1) { 
          board[x+1][y]++;
          if (y < r-1) board[x+1][y+1]++;
          if (y > 0) board[x+1][y-1]++;
        }
        minesPlaced++;
      }
    }

    console.log(minePositions);

    for (var i = 0; i < minePositions.length; i++) { 
      board[minePositions[i][0]][minePositions[i][1]] = 'X';
    }
    console.log(board);
    return board;
  }

// working on this
  function addBoard(boardData) {
    var mainDiv = $('#board');
    var result = "<table border=1>";
    for (var i = 0; i < boardData.length; i++) { 
      result += "<tr>";
      for (var j = 0; j < boardData[i].length; j++) { 
         result += "<td>"+boardData[i][j] + "</td>";
      }
      result = result + "</tr>";
    }
    mainDiv.append(result);
  }

})