$(document).ready(function() { 

    var b = createBoard(15, 15, 10);
    addBoard(b);

    function createBoard(r, c, numMines) {

    // Create board size depending on input
    var minePositions = [];
    var board = [];
    for(var i = 0; i < c; i++) { 
      board[i] = [];
      for (var j = 0; j < r; j++) board[i][j] = 0;
    } 

    // Choose mine locations randomly
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
    // Make sure mines are placed correctly
    for (var i = 0; i < minePositions.length; i++) { 
      board[minePositions[i][0]][minePositions[i][1]] = 'X';
    }
    console.log(board);
    return board;
  }

    // Method that dynamically creates a board depending on size.
    function addBoard(boardData) {
        // Fetch table reference  
        var table = document.getElementById("board");
        table.className = "table";
        // Add rows and cells
        for (var i = 0; i < boardData.length; i++) {
          var row = table.insertRow(i);
          row.className = "row";
          for (var j = 0; j < boardData[i].length; j++) {
             var cell = row.insertCell(j);
             cell.innerHTML = boardData[i][j];
             cell.className = "cell";
          }
        }
      }

})