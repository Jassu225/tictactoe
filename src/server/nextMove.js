let myMove = -1;
let gameState = null;
let gridSize = 3;
let center = Math.floor(gridSize / 2)*gridSize + Math.floor(gridSize / 2) + 1;
let myMoveCount = 0;
let userMoveCount = 0;
let userMove = -1;
let predictedMove = -1;
let min = 0, max = gridSize - 1;
let sequence = '';

function resetVars() {
    center = 5;
    myMove = -1;
    gameState = null;
    gridSize = 3;
    myMoveCount = 0;
    userMoveCount = 0;
    userMove = -1;
    predictedMove = -1;
    myPredictedMove = -1;
} 

function isCenterFree() {
    return gameState[1][1] == "";
}

function saveMove(playerSign, move, moveCount) {
    let position = 0;
    for(let i = 0; i < gridSize && position < move; i++) {
        for(let j = 0; j < gridSize && position < move; j++) {
            position++;
            if(position == move) {
                // store computer move
                gameState[i][j] = playerSign + moveCount; 
            }
        }
    }
}

function isMyFirstMove() {
    return myMoveCount == 0;
}

function saveMyMove() {
    saveMove("C-", myMove, ++myMoveCount);
}

function storeUserMove() {
    saveMove("P-", userMove, ++userMoveCount);
}

function hasMadeSufficientMoves(playerSign) {
    if(playerSign == "C")
        return myMoveCount >= gridSize - 1;
    else if(playerSign == "P")
        return userMoveCount >= gridSize - 1;
    return false;
}

function getOccupancyCountInRow(i, playerSign) {
    let occupancyInRow = 0;
    for(let j = 0; j < gridSize; j++) {
        if(gameState[i][j][0] == playerSign)
            occupancyInRow++;
    }
    return occupancyInRow;
}

function getOccupancyCountInColumn(j, playerSign) {
    let occupancyInColumn = 0;
    for(let i = 0; i < gridSize; i++) {
        if(gameState[i][j][0] == playerSign)
            occupancyInColumn++;
    }
    return occupancyInColumn;
}

function getEmptyCellPositionInRow(i) {
    for(let j = 0; j < gridSize; j++) {
        if(gameState[i][j] == "") {
            return i*gridSize + j + 1;
        }
    }
    return -1;
}

function getEmptyCellPositionInColumn(j) {
    for(let i = 0; i < gridSize; i++) {
        if(gameState[i][j] == "") {
            return i*gridSize + j + 1;
        }
    }
    return -1;
}

function possibilityOfStriking(playerSign) {
    if(!hasMadeSufficientMoves(playerSign)) {
        // moves made by me not sufficient to try for strike
        return false;
    }
    let occupancyInRow = 0, occupancyInColumn = 0;
    let i = 0,j = 0;
    for(i = 0; i < gridSize; i++) { // row-wise checking
        occupancyInRow = getOccupancyCountInRow(i, playerSign);
        if(occupancyInRow == gridSize - 1) {
            predictedMove = getEmptyCellPositionInRow(i);
            // strike case
            if(predictedMove != -1)
                return true;
        }
    }


    for(j = 0; j < gridSize; j++) { // column-wise checking
        occupancyInColumn = getOccupancyCountInColumn(j, playerSign);
        if(occupancyInColumn == gridSize - 1) {
            predictedMove = getEmptyCellPositionInColumn(j);
            // console.log(predictedMove);
            // strike case
            if(predictedMove != -1)
                return true;
        }
    }

    occupancyInRow = 0;
    emptyCellsCount = 0;
    let occupancyInRow_1 = 0, emptyCellsCount_1 = 0, predictedMove_1 = 0; 
    for(i = 0, j = 0; i < gridSize; i++,j++) { // diagonals checking
        if(gameState[i][j][0] == playerSign)
            occupancyInRow++;
        else if(gameState[i][j] == "") {
            emptyCellsCount++;
            predictedMove = i*gridSize + j + 1;
        }

        let i1 = i;
        let j1 = gridSize - 1 - j;
        if(gameState[i1][j1][0] == playerSign)
            occupancyInRow_1++;
        else if(gameState[i1][j1] == "") {
            emptyCellsCount_1++;
            predictedMove_1 = i1*gridSize + j1 + 1;
        }
    }

    if(occupancyInRow == gridSize - 1 && emptyCellsCount == 1) {
        // strike case - principal diagonal
        return true;
    }
    if(occupancyInRow_1 == gridSize - 1 && emptyCellsCount_1 == 1) {
        // strike case - other diagonal
        predictedMove = predictedMove_1;
        return true;
    }

    return false;
}

function tryStrike() {
    return possibilityOfStriking("C");
}

function blockPlayerStrike() {
    return possibilityOfStriking("P");
}

function getOccupancyCountinRowIColumnJ(i,j, playerSign) {
    let occupancyInRow = getOccupancyCountInRow(i, playerSign);
    let occupancyInColumn = getOccupancyCountInColumn(j, playerSign);
    // console.log("occupancy in row "+ i + " - " + occupancyInRow);
    // console.log("occupancy in column "+ j + " - " + occupancyInColumn);
    // remove repeatedly (tiwce) counted corner cell
    if(gameState[i][j][0] == playerSign)
        return occupancyInRow + occupancyInColumn - 1;
    return occupancyInRow + occupancyInColumn;
}

function random(min,max) {
    // selects a number from [min, max]
    return Math.floor((Math.random() * (max + 1)) + min);
}

function checkIthRowJthColumn(i,j, i1, j1) {
    if(i1 != -1 && j1 != -1) {
        // means position already found
        return [ i1, j1];
    }
    let occupancyCount = 0, min = 0, max = gridSize - 1;
    occupancyCount = getOccupancyCountinRowIColumnJ(i, j, "P");
    // console.log(i + " - " + j);
    // console.log(occupancyCount);
    if(occupancyCount == gridSize - 1 && getOccupancyCountinRowIColumnJ(i, j, "C") == 0) { // i.e 2
        do {
            i1 = random(min, max);
            j1 = random(min, max);
            // console.log(i1 + " - " + j1);
        } while((i1 != min && i1 != max) || (j1 != min && j1 != max) || (i1 == (max - i) && j1 == (max - j)) || gameState[i1][j1] != "");
        // console.log("Came out");
    }
    return [ i1, j1];
}

function borderCheck() {
    let i = -1, j = -1, min = 0, max = gridSize - 1;
    let i1 = -1, j1 = -1;
    [ i1, j1] = checkIthRowJthColumn(min, max, i1, j1); // first-row, last-column
    [ i1, j1] = checkIthRowJthColumn(max, max, i1, j1); // last-row, last-column
    [ i1, j1] = checkIthRowJthColumn(max, min, i1, j1); // last-row, first-column
    [ i1, j1] = checkIthRowJthColumn(min, min, i1, j1); // first-row, first-column

    if(i1 != -1 && j1 != -1) {
        // move found
        predictedMove = i1*gridSize + j1 + 1;
        return true;
    }

    return false;
}

function checkCorners() {
    let min = 0, max = gridSize - 1;
    if(gameState[min][min][0] == "P" && gameState[max][max] == "") {
        predictedMove = max*gridSize + max + 1;
        return true;
    }
    if(gameState[min][max][0] == "P" && gameState[max][min] == "") {
        predictedMove = max*gridSize + min + 1;
        return true;
    }
    if(gameState[max][max][0] == "P" && gameState[min][min] == "") {
        predictedMove = min*gridSize + min + 1;
        return true;
    }
    if(gameState[max][min][0] == "P" && gameState[min][max] == "") {
        predictedMove = min*gridSize + max + 1;
        return true;
    }

    return false;
}

function getBoardCornerPositions() {
    let min = 0, max = gridSize - 1;
    let cornerPositions = [];
    cornerPositions.push(min*gridSize + min + 1);
    cornerPositions.push(min*gridSize + max + 1);
    cornerPositions.push(max*gridSize + min + 1);
    cornerPositions.push(max*gridSize + max + 1);
    return cornerPositions;
}

function isUserFirstMoveAndCorner() {
    if(userMoveCount == 1) {
        let cornerPositions = getBoardCornerPositions();
        if(cornerPositions.indexOf(userMove) != -1)
            return true;
    }
    return false;
}

function AvoidOtherDiagonalPositions() {
    let position = -1;
    if(userMove == min*gridSize + min + 1 || userMove == max*gridSize + max + 1) {
        // user made move in principal diagonal
        do {
            position = random(1, gridSize*gridSize);
        } while(position == userMove || position == center || position == min*gridSize + max + 1 || position == max*gridSize + min + 1);
    } else {
        // user made move in non-principal diagonal
        do {
            position = random(1, gridSize*gridSize);
        } while(position == userMove || position == center || position == min*gridSize + min + 1 || position == max*gridSize + max + 1);
    }

    predictedMove = position;
}

function isUserSecondMove() {
    return userMoveCount == 2;
}

function areMovesInOppositeCorners() {
    let min = 0, max = gridSize - 1;
    let cornerPositions = [];
    cornerPositions.push(min*gridSize + min + 1);
    cornerPositions.push(min*gridSize + max + 1);
    cornerPositions.push(max*gridSize + max + 1);
    cornerPositions.push(max*gridSize + min + 1);
    let move1 = sequence[0];
    let move2 = sequence[2];
    return (
        (move1 == cornerPositions[0] && move2 == cornerPositions[2]) ||
        (move1 == cornerPositions[1] && move2 == cornerPositions[3]) ||
        (move1 == cornerPositions[2] && move2 == cornerPositions[0]) ||
        (move1 == cornerPositions[3] && move2 == cornerPositions[1])
    );
}

function chooseMidPositions() {
    let midPositions = [];
    let midPoint = Math.floor(gridSize/2);
    for(let i = 0; i < midPoint; i++) {
        midPositions.push(i*gridSize + midPoint + 1);
        midPositions.push((midPoint + 1)*gridSize - i); // midPoint*gridSize + gridSize - 1 - i + 1
        midPositions.push((gridSize - 1 - i)*gridSize + midPoint + 1);
        midPositions.push(midPoint*gridSize + i + 1);
    }
    let midPositionsIndex = random(0, midPositions.length - 1);
    predictedMove = midPositions[midPositionsIndex];
}

function prepareGameState() {
    gameState = [];
    let player = [
        {
            sign: "P",
            moveCount: 0
        },
        {
            sign: "C",
            moveCount: 0
        }
    ];
    let seq = sequence.split('');
    let position = -1;
    let index = -1;
    // console.log(seq);
    for(let i = 0; i < gridSize; i++) {
        gameState.push([]);
        for(let j = 0; j < gridSize; j++) {
            gameState[i].push("");
            position = i*gridSize + j + 1;
            index = seq.indexOf('' + position);
            // console.log(index);
            if(index != -1) {
                gameState[i][j] =  player[index % 2].sign + "-" + ++player[index % 2].moveCount;
            }
        }
    }
    // console.log(gameState);
}

let thinkNextMove = function(req) {
    // gameState = req.session.gameState;
    sequence = req.body.sequence;
    prepareGameState();
    userMove = parseInt(sequence.substr(-1)); //  last number is user move
    // console.log(sequence);
    
    // store user move 
    storeUserMove();

    // console.log(gameState);

    // ------------ Prediction Algorithm ------------------------
    if(isUserSecondMove() && areMovesInOppositeCorners()) {
        chooseMidPositions();
        myMove = predictedMove;
    } else if(isCenterFree()) { // check center
        myMove = center;
    } else if(tryStrike()) {
        myMove = predictedMove;
        // console.log("try strike");
        // console.log(myMove);
    } else if(blockPlayerStrike()) {
        myMove = predictedMove;
        // console.log("blockPlayerStrike");
        // console.log(myMove);
    } else if(borderCheck()) {
        myMove = predictedMove;
        // console.log("bordercheck");
        // console.log(myMove);
    } else if(checkCorners()) {
        myMove = predictedMove;
        // console.log("check corners");
        // console.log(myMove);
    } else {
        // random move - take corner only if its a first Move
        let i = -1, j = -1, min = 0, max = gridSize - 1;
        do {
            i = random(min, max);
            j = random(min, max);
        } while(gameState[i][j] != "" || (isMyFirstMove() && ((i != min && i != max) || (j != min && j != max))) );
        myMove = i*gridSize + j + 1;
        // console.log("random");
        // console.log(myMove);
    }
    // ------------END Prediction Algorithm ------------------------

    saveMyMove();

    // save game state
    // req.session.gameState = gameState;
    // req.session.save();

    return myMove;
}

module.exports = {thinkNextMove, resetVars};