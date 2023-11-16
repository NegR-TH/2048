const boardmap = document.getElementById('board');
const scoreBox = document.getElementById('scor');
const bestScoreBox = document.getElementById('Best')
const Wl = document.getElementById('winLoose')
var score = 0;
var bestScore = 0;

const board = [];
function illustrateBoard() {
    for (let i = 1; i <= 4; i++) {
        board[i] = [];
        const tr = document.createElement('tr');
        for (let j = 1; j <= 4; j++) {
            const td = document.createElement('td');
            board[i][j] = {
                td,
                value: 0,
            };
            td.id = `${i}_${j}`;
            tr.append(td)
        }
        boardmap.append(tr);
    }
    randomtile();
    colour();
    randomtile();
    colour();
    scoreBox.innerText = score
    playerBestScore()
}
function colour() {
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            var td = board[i][j].td
            if (board[i][j].value === 0) {
                td.style.backgroundColor = 'rgba(89, 37, 37, 0.541)';
                td.innerText = ''
            }
            if (board[i][j].value === 2) {
                td.style.backgroundColor = 'rgba(207, 54, 177, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 4) {
                td.style.backgroundColor = 'rgba(54, 161, 207, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 8) {
                td.style.backgroundColor = 'rgba(67, 47, 180, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 16) {
                td.style.backgroundColor = 'rgba(47, 180, 67, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 32) {
                td.style.backgroundColor = 'rgba(172, 47, 47, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 64) {
                td.style.backgroundColor = 'rgba(220, 228, 117, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 128) {
                td.style.backgroundColor = 'rgba(148, 69, 16, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 256) {
                td.style.backgroundColor = 'rgba(193, 35, 182, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 512) {
                td.style.backgroundColor = 'rgba(31, 207, 154, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 1024) {
                td.style.backgroundColor = 'rgba(35, 193, 130, 0.781)';
                td.innerText = board[i][j].value;
            }
            if (board[i][j].value === 2048) {
                td.style.backgroundColor = 'rgba(207, 31, 31, 0.781)';
                td.innerText = board[i][j].value;
            }
        }
    }
}
function randomtile() {
    const emptyTile = [];
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            if (board[i][j].value === 0) {
                emptyTile.push({ i, j })
            }
        }
    }
    const val = [2, 2, 2, 4, 2, 2, 4, 2, 2, 2]
    const randomValue = val[Math.floor(Math.random() * val.length)]
    const randomTile = emptyTile[Math.floor(Math.random() * emptyTile.length)]
    board[randomTile.i][randomTile.j].value = randomValue;
}
function checkBoard() {
    var emptyCells = []
    var count = 0
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j < 4; j++) {
            let firstTile = board[i][j];
            let seccondTile = board[i][j + 1];
            if (firstTile.value !== 0) {
                if (seccondTile.value !== 0) {
                    if (firstTile.value === seccondTile.value) {
                        count++
                        continue;
                    }
                }
            }
            if (firstTile.value === 0) {
                emptyCells.push(firstTile)
                continue;
            }
        }
    }
    if (emptyCells.length === 0 && count === 0) {
        winOrloose('loose')
    }
    return
}
function winOrloose(situation) {
    if (situation === 'win') {
        Wl.innerText = 'you won!!!'
        Wl.style.color = 'rgb(46,218,118)'
    }
    if (situation === 'loose') {
        Wl.innerText = 'you loose!!!'
        Wl.style.color = 'rgb(174, 77, 101)'
    }
}
function playerBestScore() {
    bestScore = localStorage.getItem('bestScoreData') || 0;
    if (score > bestScore) {
        bestScore = String(score);
        localStorage.removeItem('bestScoreData');
        localStorage.setItem('bestScoreData', bestScore)
    }
    bestScoreBox.innerText = bestScore;
}
function shiftLeft() {
    checkBoard()
    for (let z = 0; z < 3; z++) {
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j < 4; j++) {
                let firstTile = board[i][j];
                let seccondTile = board[i][j + 1];
                if (board[i][j].value === 0) {
                    firstTile.value = seccondTile.value;
                    seccondTile.value = 0
                }
            }
        }
    }
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j < 4; j++) {
            let firstTile = board[i][j];
            let seccondTile = board[i][j + 1];
            if (seccondTile.value !== 0) {
                if (seccondTile.value === firstTile.value) {
                    let newVal = firstTile.value * 2
                    firstTile.value = newVal;
                    seccondTile.value = 0;
                    score += newVal;
                    scoreBox.innerText = score;
                    if (newVal === 2048) {
                        winOrloose('win')
                    }
                }
                else if (seccondTile.value !== firstTile.value) {
                    continue;
                }
            }
        }
    }
    for (let z = 0; z < 3; z++) {
        for (let i = 1; i <= 4; i++) {
            for (let j = 1; j < 4; j++) {
                let firstTile = board[i][j];
                let seccondTile = board[i][j + 1];
                if (board[i][j].value === 0) {
                    firstTile.value = seccondTile.value;
                    seccondTile.value = 0
                }
            }
        }
    }
    randomtile();
    colour();
}
function shiftRight() {
    checkBoard()
    for (let z = 0; z < 3; z++) {
        for (let i = 1; i <= 4; i++) {
            for (let j = 4; j > 1; j--) {
                let firstTile = board[i][j]
                let seccondTile = board[i][j - 1];
                if (board[i][j].value === 0) {
                    firstTile.value = seccondTile.value;
                    seccondTile.value = 0
                }
            }
        }
    }
    for (let i = 1; i <= 4; i++) {
        for (let j = 4; j > 1; j--) {
            let firstTile = board[i][j]
            let seccondTile = board[i][j - 1];
            if (seccondTile.value !== 0) {
                if (seccondTile.value === firstTile.value) {
                    let newVal = firstTile.value * 2
                    firstTile.value = newVal;
                    seccondTile.value = 0;
                    score += newVal;
                    scoreBox.innerText = score;
                    if (newVal === 2048) {
                        winOrloose('win')
                    }
                }
                else if (seccondTile.value !== firstTile.value) {
                    continue;
                }
            }
        }
    }
    for (let z = 0; z < 3; z++) {
        for (let i = 1; i <= 4; i++) {
            for (let j = 4; j > 1; j--) {
                let firstTile = board[i][j]
                let seccondTile = board[i][j - 1];
                if (board[i][j].value === 0) {
                    firstTile.value = seccondTile.value;
                    seccondTile.value = 0
                }
            }
        }
    }
    randomtile();
    colour();
}
function shiftUp() {
    checkBoard()
    for (let z = 0; z < 3; z++) {
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j <= 4; j++) {
                let firstTile = board[i][j]
                let seccondTile = board[i + 1][j];
                if (board[i][j].value === 0) {
                    firstTile.value = seccondTile.value;
                    seccondTile.value = 0
                }
            }
        }
    }
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j <= 4; j++) {
            let firstTile = board[i][j]
            let seccondTile = board[i + 1][j];
            if (seccondTile.value !== 0) {
                if (seccondTile.value === firstTile.value) {
                    let newVal = firstTile.value * 2
                    firstTile.value = newVal;
                    seccondTile.value = 0;
                    score += newVal;
                    scoreBox.innerText = score;
                    if (newVal === 2048) {
                        winOrloose('win')
                    }
                }
                else if (seccondTile.value !== firstTile.value) {
                    continue;
                }
            }
        }
    }
    for (let z = 0; z < 3; z++) {
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j <= 4; j++) {
                let firstTile = board[i][j]
                let seccondTile = board[i + 1][j];
                if (board[i][j].value === 0) {
                    firstTile.value = seccondTile.value;
                    seccondTile.value = 0
                }
            }
        }
    }
    randomtile();
    colour();
}
function shiftDown() {
    checkBoard()
    // remove zero:
    for (let z = 0; z < 3; z++) {
        for (let i = 4; i > 1; i--) {
            for (let j = 1; j <= 4; j++) {
                let firstTile = board[i][j]
                let seccondTile = board[i - 1][j];
                if (board[i][j].value === 0) {
                    firstTile.value = seccondTile.value;
                    seccondTile.value = 0
                }
            }
        }
    }
    // merging tiles:
    for (let i = 4; i > 1; i--) {
        for (let j = 1; j <= 4; j++) {
            let firstTile = board[i][j]
            let seccondTile = board[i - 1][j];
            if (seccondTile.value !== 0) {
                if (seccondTile.value === firstTile.value) {
                    let newVal = firstTile.value * 2
                    firstTile.value = newVal;
                    seccondTile.value = 0;
                    score += newVal;
                    scoreBox.innerText = score;
                    if (newVal === 2048) {
                        winOrloose('win')
                    }
                }
                else if (seccondTile.value !== firstTile.value) {
                    continue;
                }
            }
        }
    }
    // again remove zero:
    for (let z = 0; z < 3; z++) {
        for (let i = 4; i > 1; i--) {
            for (let j = 1; j <= 4; j++) {
                let firstTile = board[i][j]
                let seccondTile = board[i - 1][j];
                if (board[i][j].value === 0) {
                    firstTile.value = seccondTile.value;
                    seccondTile.value = 0
                }
            }
        }
    }
    randomtile();
    colour();
}
document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.key === 'ArrowLeft') shiftLeft();
    else if (e.key === 'ArrowRight') shiftRight();
    else if (e.key === 'ArrowUp') shiftUp('up');
    else if (e.key === 'ArrowDown') shiftDown('down');
})
illustrateBoard();