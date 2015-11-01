$(document).ready(function () {

    var b = createBoard(10, 10, 11);
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
                if (boardData[i][j].imgsrc) img.src = boardData[i][j].imgsrc;
                cell.appendChild(img);
                cell.className = "cell";
            }
        }
    }

    // cell object
    function Cell(x, y) {
        this.x = x;
        this.y = y;
        this.imgsrc;
        this.content = 0;
        this.isMine = false;
        this.clicked = false;
    }

});

//--------------------
/*

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
                var circle = document.getElementById("circle");
                circle.style.left = finger.dipPosition[0] * 1.5;
                circle.style.bottom = finger.dipPosition[1] * 1.8;
                //selected returns the column and the row
                var selected = check_finger(finger.dipPosition);
                if (finger.dipPosition[2] <= 0) {
                    if (board[selected[0]][selected[1]].isMine == true) {
                        alert("BOO");
                    } else {
                        document.getElementById(board[selected[0]] + "-" + [selected[1]]).imgsrc = "img/" + board[selected[0]][selected[1]].content + ".png";
                    }

                } else if (finger.dipPosition[2] > 0 && (board[selected[0]][selected[1]].clicked == false)) {
                    document.getElementById(board[selected[0]] + "-" + [selected[1]]).imgsrc = "img/hover.png";
                }

                if (hand.pinchStrength > 0.7) {
                    if (board[selected[0]][selected[1]].isMine == true) {
                        document.getElementById(selected[0] + "-" + selected[1]).imgsrc = "img/mine.png";
                    } else {
                        document.getElementById(selected[0] + "-" + selected[1]).imgsrc = "img/" + board[selected[0]][selected[1]].content + ".png";

                    }
                    for (var f = 0; f < tenFramesBack.fingers.length; f++) {
                        if (tenFramesBack.fingers[f].type == 1) {
                            if (tenFramesBack.fingers[f].dipPosition[2] - finger.dipPosition[2] < -50) {
                                break;
                                //    mineArray[selected].size = 160;
                                //Delete -- bugged
                                //if (finger.dipPosition[2] > 150) {
                                //  mineArray[selected] = mineArray[mineArray.length - 1];
                                //mineArray.length -= 1;
                                //}

                            }
                            //   mineArray[selected.size] = 60

                        }
                    }
                }
            }
        }
    }
    frameString += handString;
    frameString += fingerString;


    output.innerHTML = frameString;
});

function check_finger(pos) {
    for (var i = 0; i < board[i].length; i++) {
        if (((mineArray[i].xpos - 5) < pos[0] + 200 < (mineArray[i].xpos + 5)) && ((mineArray[i].ypos - 5) < pos[1] + 250 < (mineArray[i].ypos + 5))) {
            console.log(mineArray[i].xpos - 5, pos[0], pos[1]);
            return i;
        }
    }
}
*/