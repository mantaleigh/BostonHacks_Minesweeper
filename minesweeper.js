$(document).ready(function () {

    var NUM_ROWS = 10; 
    var NUM_COLS = 10; 
    var NUM_MINES = 11;

    var b = createBoard(NUM_ROWS, NUM_COLS, NUM_MINES);
    addBoard(b);

    function createBoard(r, c, numMines) {

        // Create board size depending on input
        var minePositions = [];
        var board = [];
        for (var i = 0; i < c; i++) {
            board[i] = [];
            for (var j = 0; j < r; j++) board[i][j] = new Cell(i, j);
        }

        // Choose mine locations randomly
        var minesPlaced = 0;
        while (minesPlaced < numMines) {
            var x = Math.floor(Math.random() * c);
            var y = Math.floor(Math.random() * r);
            if (!board[x][y].isMine) {
                board[x][y].isMine = true;
                minePositions.push([x, y]);
                if (x > c - 1) {
                    board[x - 1][y].content++;
                    if (y > r - 1) {
                        board[x - 1][y - 1].content++;
                    }
                    if (y < 0) board[x - 1][y + 1].content++;
                }
                if (y < r - 1) board[x][y + 1].content++;
                if (y > 0) board[x][y - 1].content++;
                if (x < c - 1) {
                    board[x + 1][y].content++;
                    if (y < r - 1) board[x + 1][y + 1].content++;
                    if (y > 0) board[x + 1][y - 1].content++;
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
    } // close createBoard

    // Method that dynamically creates a board depending on size.
    function addBoard(boardData) {
        // Fetch table reference  
        var table = $("#board");
        // Add rows and cells
        for (var i = 0; i < boardData.length; i++) {
            var row = $('<tr>');
            table.append(row);
            for (var j = 0; j < boardData[i].length; j++) {
                var cell = $("<td>");
                if (!boardData[i][j].isMine) cell.innerHTML = boardData[i][j].content;
                else cell.innerHTML = "X";
                row.append(cell);
                
                // var img = document.createElement('img');
                // if (boardData[i][j].imgsrc) img.src = boardData[i][j].imgsrc;
               // cell.append(img);
                // cell.addClass("cell");
            }
        }
    } // close addBoard

    // cell object
    function Cell(x, y) {
        this.x = x;
        this.y = y;
        this.imgsrc;
        this.content = 0;
        this.isMine = false;
        this.clicked = false;
    } // close cell


    var options = {
          enableGestures: true
      };


      var output = $("#output");

        function concatData(id, data) {
            return id + ": " + data + "<br>";
        }

        function concatJointPosition(id, position) {
            return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
        }

        var frameString = "",
            handString = "",
            fingerString = "";
        var hand, finger;

        var options = {
            enableGestures: true
        };

      var controller = Leap.loop(options, function (frame) {
          var currentFrame = frame;
          var previousFrame = controller.frame(1);
          var tenFramesBack = controller.frame(20);

          frameString = "";
          frameString += concatData("num_hands", frame.hands.length);
          frameString += concatData("num_fingers", frame.fingers.length);
          frameString += "<br>";

          for (var i = 0, len = frame.hands.length; i < len; i++) {
              hand = frame.hands[i];
              handString = concatData("hand_type", hand.type);
              handString += concatData("confidence", hand.confidence);
              handString += concatData("pinch_strength", hand.pinchStrength);
              handString += concatData("grab_strength", hand.grabStrength);

              handString += '<br>';
              for (var j = 0, len2 = hand.fingers.length; j < len2; j++) {
                  finger = hand.fingers[j];
                  if (finger.type == 1) {
                      fingerString = finger.dipPosition + "<br>";
                      var circle = $("#circle");
                      circle.css('left',finger.dipPosition[0] * 1.5);
                      circle.css('bottom', finger.dipPosition[1] * 1.8);
                      var tdArray = check_finger(parseInt(circle.css('left'), 10)+5, parseInt(circle.css('bottom'), 10)-5);
                      
                      if (tdArray) { 
                        var tdObj = tdArray[0];
                        //console.log(tdObj); // testing
                       // tdObj.style.backgroundColor = 'orange';
                        //console.log(hand.pinchStrength);
                        if (hand.pinchStrength > .8) { 
                          tdObj.style.backgroundColor = 'red';
                        }
                      }
                      
                  }
              }
          }
          frameString += handString;
          frameString += fingerString;
          output.innerHTML = frameString;
      });


      function check_finger(x, y) {
        // 50 is hardcoded into the css
        var cIndex = Math.floor(x/50);
        var rIndex = Math.floor(-1*((y/50)-12.5)); // weirdly hardcoded???? idk
        //console.log(cIndex, rIndex);

        if (rIndex < NUM_ROWS && rIndex >= 0 && cIndex < NUM_COLS && cIndex >= 0) {
          return [$('table')[0].rows[rIndex].cells[cIndex], rIndex, cIndex];
        }
        return null; // a td object is not being hovered over
      }

});