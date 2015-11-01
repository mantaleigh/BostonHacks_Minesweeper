$(document).ready(function() { 

    var b = createBoard(9, 9, 10);
    addBoard(b);

    function createBoard(r, c, numMines) {

    // Create board size depending on input
    var minePositions = [];
    var board = [];
    for(var i = 0; i < c; i++) { 
      board[i] = [];
      for (var j = 0; j < r; j++) board[i][j] = new Cell(i, j);
    } 

    // Choose mine locations randomly
    var minesPlaced = 0;
    while (minesPlaced < numMines){ 
      var x = Math.floor(Math.random()*c); 
      var y = Math.floor(Math.random()*r);
      if (!board[x][y].isMine) { 
        board[x][y].isMine = true;
        minePositions.push([x,y]);
        if (x > c-1) {
          board[x-1][y].content++;
          if (y > r-1) { 
            board[x-1][y-1].content++;
          }
          if (y < 0) board[x-1][y+1].content++;
        }
        if (y < r-1) board[x][y+1].content++;
        if (y > 0) board[x][y-1].content++;
        if (x < c-1) { 
          board[x+1][y].content++;
          if (y < r-1) board[x+1][y+1].content++;
          if (y > 0) board[x+1][y-1].content++;
        }
        minesPlaced++;
      }
    }

    console.log(minePositions);
    // Make sure mines are placed correctly
    for (var i = 0; i < minePositions.length; i++) { 
      board[minePositions[i][0]][minePositions[i][1]].isMine = true;
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
             var img = document.createElement('img');
             img.src = boardData[i][j].imgsrc;
             cell.appendChild(img);
             cell.className = "cell";
          }
        }
      }

    // cell object
    function Cell(x, y) { 
      this.x = x;
      this.y = y;
      this.imgsrc = 'img/unclicked.png';
      this.content = 0; 
      this.isMine = false; 
    } 

});