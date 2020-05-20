'use strict';
const MINE = '💣';
const WINNER = '😎';
const LOOSER = '😮';
const NORMAL = '😃';
const FLAG = '🚩';

var gBoard;
var gLevel;
var gGame;
var gIsFirstClick;
var gStartTime;
var gStopwatchIntervalId;
var gCount;



function init(diff, mines) {
    console.log(diff, mines);
    gGame = {
        isOn: false,
        showCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gIsFirstClick = true;
    gCount = 0;
    // clerBoard()
    updateLevel(diff, mines)
    gBoard = buildBoard(diff);
    console.table(gBoard);
    renderBoard(gBoard);
    document.querySelector('.imoge').innerHTML = NORMAL;
    clearInterval(gStopwatchIntervalId);

}

function updateLevel(size, mines) {
    gLevel = {
        size: size,
        mines: mines
    }
    // renderBoard(gBoard)

}

function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = `cell ${cell.isMine}`;
            var tdId = `cell-${i}-${j}`;
            strHTML += `<td id ="${tdId}" class="${className}" onclick="cellclicked(this,event,${i},${j})"></td>`
        }
        strHTML += '</tr>';
    }
    var elTbody = document.querySelector('tbody');
    elTbody.innerHTML = strHTML;
    var elMineCells = document.querySelectorAll('.true');
    for (var i = 0; i < elMineCells.length; i++) {
        var elMineCell = elMineCells[i];
        elMineCell.innerHTML = `<span>${MINE}</span>`;
        var elSpan = document.querySelector('span');
        elSpan.style.display = 'none';
    }
}

function setMinesNegsCount(cellI, cellJ, mat) {
    var neighborsMinesSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[i][j].isMine) neighborsMinesSum++;
        }
    }
    if (neighborsMinesSum === 0) neighborsMinesSum = '';
    mat[cellI][cellJ].minesAroundCount = neighborsMinesSum;
    console.dir(mat[cellI][cellJ]);
    var elCell = document.getElementById(`cell-${cellI}-${cellJ}`);
    elCell.innerText = neighborsMinesSum
}

function cellclicked(elCell, event, i, j) {
    console.dir(typeof event);
    if (gIsFirstClick) {
        gIsFirstClick = false;
        console.log('first');
        if (gBoard[i][j].isMine) {
            console.log('wrong!');
            return
        } else {
            getRandomMinesLocation()
            gStartTime = Date.now();
            gStopwatchIntervalId = setInterval(getGameTime, 100);
            gBoard[i][j].isShown = true;
            setMinesNegsCount(i, j, gBoard);
            elCell.style.backgroundColor = 'white';
        }
    } else if (!gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true;
        console.log(gBoard[i][j].isShown);
        setMinesNegsCount(i, j, gBoard);
        elCell.style.backgroundColor = 'white';
        gCount++
        console.log(gCount);

    } else {
        var elMines = document.querySelectorAll('.true');
        // console.log(elMines);
        for (var i = 0; i < elMines.length; i++) {
            var elMine = elMines[i]
            elMine.style.backgroundColor = 'red';
            var elSpans = document.querySelectorAll('span');
            for (var j = 0; j < elSpans.length; j++) {
                var elSpan = elSpans[j];
                elSpan.style.display = 'block';
            }

            // console.log(elMine);
        }
        document.querySelector('.imoge').innerHTML = LOOSER;
        console.log('GAME OVER');
        clearInterval(gStopwatchIntervalId);
    }
    if (gCount === gLevel.size ** 2 - gLevel.mines) {
        document.querySelector('.imoge').innerHTML = WINNER;
        clearInterval(gStopwatchIntervalId);
    }
}

function getRandomMinesLocation() {
    console.log(gLevel.mines);
    for (var i = 0; i < gLevel.mines; i++) {
        console.log('hihi');

        var coordI = getRandomIntInclusive(0, gLevel.size - 1)
        var coordJ = getRandomIntInclusive(0, gLevel.size - 1)
        gBoard[coordI][coordJ].isMine = true;
        renderBoard(gBoard);
    }
}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}





