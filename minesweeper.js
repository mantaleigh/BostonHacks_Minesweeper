$(document).ready(function () {

    var NUM_ROWS = 8;
    var NUM_COLS = 8;
    var NUM_MINES = 11;
    var NUM_SWIPES = 11;

    var b = createBoard(NUM_ROWS, NUM_COLS, NUM_MINES);
    addBoard(b);

    function createBoard(r, c, numMines) {
        $('#timer').timer({
            duration: '60m0s',
            callback: function () {
                var scoreboard = document.getElementById("#scores");
                scoreboard.innerText = "<h1>Time is out!</h1>";
                scoreboard.style.visibility = 'visible';
            }
        });
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

                if (y > 0) board[x][y - 1].content++;
                if (y < r - 1) board[x][y + 1].content++;
                if (x > 0 && y > 0) board[x - 1][y - 1].content++;
                if (x > 0) board[x - 1][y].content++;
                if (x > 0 && y < r - 1) board[x - 1][y + 1].content++;
                if (x < c - 1 && y > 0) board[x + 1][y - 1].content++;
                if (x < c - 1) board[x + 1][y].content++;
                if (x < c - 1 && y < r - 1) board[x + 1][y + 1].content++;

                minesPlaced++;
            }
        }

        // console.log(minePositions);
        // Make sure mines are placed correctly
        for (var i = 0; i < minePositions.length; i++) {
            board[minePositions[i][0]][minePositions[i][1]].isMine = true;
            board[minePositions[i][0]][minePositions[i][1]].content = 'X';
        }
        // console.log(board);
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
                row.append(cell);
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

    var output = $("#output");


    var options = {
        enableGestures: true
    };

    var controller = Leap.loop(options, function (frame) {
        //console.log(frame.hands.length);
        if (NUM_SWIPES == 0) {
            alert('No More Disarms :(');
            console.log("No More Disarms :(");
            var scoreboard = document.getElementById("scores");
            $('#timer').timer('pause');
            var time = $('#timer').data('seconds');
            scoreboard.innerHTML = "Time taken: " + time;
            scoreboard.style.visibility = 'visible';
            end();
        }
        var rightHand = null;
        var leftHand = null;

        if (frame.hands.length > 0) {
            for (var j = 0; j < frame.hands.length; j++) {
                var hand = frame.hands[j];
                if (hand.type == "right") rightHand = hand;
                if (hand.type == "left") leftHand = hand;
                // console.log(hand.type);
            }

            if (rightHand != null && rightHand.valid) {

                var indexFinger = null;
                for (var i = 0; i < rightHand.fingers.length; i++) {
                    finger = rightHand.fingers[i];
                    if (finger.type == 1) indexFinger = finger;
                    //console.log(finger);
                }
                var circle = $("#circle");
                circle.css('left', indexFinger.dipPosition[0] * 1.5);
                circle.css('bottom', indexFinger.dipPosition[1] * 1.8);
                var tdArray = check_finger(parseInt(circle.css('left'), 10) + 5, parseInt(circle.css('bottom'), 10) - 5);


                if (tdArray) {
                    var tdObj = tdArray[0];
                    var r = tdArray[1];
                    var c = tdArray[2];
                    if (frame.valid && frame.gestures.length > 0) {
                        frame.gestures.forEach(function (gesture) {
                            var handIds = gesture.handIds;
                            handIds.forEach(function (handId) {
                                if (gesture.type == "circle") {

                                    if (b[r][c].isMine) {
                                        alert('found a mine at ' + r + ", " + c);
                                        var scoreboard = document.getElementById("scores");
                                        $('#timer').timer('pause');
                                        var time = $('#timer').data('seconds');
                                        scoreboard.innerHTML = "<br><br><br><br><br><br><br><p style='font-weight:bold; font-size:20px'>Time taken: " + time + " seconds</p>";
                                        scoreboard.style.visibility = 'visible';
                                        //alert('found a mine at ' + r + ", " + c);
                                        tdObj.style.backgroundImage = "url('img/mine.jpg')";
                                        //tdObj.innerHTML = "!!!";
                                        console.log('You lost. Trump won. Boo.');
                                        end();
                                    } else {
                                        if (b[r][c].content != 0) tdObj.innerHTML = b[r][c].content;
                                        else uncoverBlanks(r, c);
                                        var color = 'black';
                                        if (b[r][c].content == 1) color = 'blue';
                                        if (b[r][c].content == 2) color = 'green';
                                        if (b[r][c].content == 3) color = 'red';
                                        if (b[r][c].content == 4) color = 'purple';
                                        if (b[r][c].content == 5) color = 'maroon';
                                        if (b[r][c].content == 6) color = 'orange';
                                        tdObj.style.color = color;
                                        tdObj.style.backgroundColor = 'gray';
                                    }
                                } else if (leftHand != null && rightHand != null && leftHand.valid && gesture.type == "screenTap" && NUM_SWIPES > 0) {

                                    if (b[r][c].isMine == true) {
                                        console.log("Congratulations! You fired Donald Trump!");
                                        b[r][c].isMine = false;
                                        tdObj.style.backgroundImage = "/img/mine.jpg";
                                    } else {
                                        if (b[r][c].content != 0) {
                                            tdObj.innerHTML = b[r][c].content;
                                        }
                                        var color = 'black';
                                        if (b[r][c].content == 1) color = 'blue';
                                        if (b[r][c].content == 2) color = 'green';
                                        if (b[r][c].content == 3) color = 'red';
                                        if (b[r][c].content == 4) color = 'purple';
                                        if (b[r][c].content == 5) color = 'maroon';
                                        if (b[r][c].content == 6) color = 'orange';
                                        tdObj.style.color = color;
                                        tdObj.style.backgroundColor = 'gray';
                                    }
                                    NUM_SWIPES--;
                                    console.log("Number of disarms left: " + NUM_SWIPES);
                                }
                            });
                        });
                    }
                }
            }
        }
    });

    function uncoverBlanks(x, y) {

        // tdObj.style.backgroundColor = 'gray';

    }

    function end() {
        controller.disconnect();
    }

    function check_finger(x, y) {
        // 50 is hardcoded into the css
        var cIndex = Math.floor(x / 50);
        var rIndex = Math.floor(-1 * ((y / 50) - 12.5)); // weirdly hardcoded???? idk
        // console.log(cIndex, rIndex);

        if (rIndex < NUM_ROWS && rIndex >= 0 && cIndex < NUM_COLS && cIndex >= 0) {
            return [$('table')[0].rows[rIndex].cells[cIndex], rIndex, cIndex];
        }
        return null; // a td object is not being hovered over
    }

});