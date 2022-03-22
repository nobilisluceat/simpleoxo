var mass = new Array(); // general mass
var mass_x = new Array(); // x mass
var mass_o = new Array(); // o mass

var currentPlayer = "X"

set_state(currentPlayer)


var isWin = false


function init() {
    for (let x = 1; x <= 9; x++) {
        let field = document.getElementById(x)
        field.onclick = click
    }
}

function set_field(x, currentPlayer) {
    let field = document.getElementById(x)
    field.innerText = currentPlayer
}

function set_state(currentPlayer, isWin) {
    if (!isWin) {
        let state = document.getElementById("currentState")
        state.innerText = currentPlayer + " Turn"
    }

    else {
        let state = document.getElementById("currentState")
        state.innerText = currentPlayer + " Wins"
    }
}

function click() {
    let x = Number(this.id)
    console.log("x = " + x)

    if (this.innerText != "") {
        console.log("occupied")
    }
    else {

        set_field(x, currentPlayer)

        mass.push(x)
        if (currentPlayer === 'X') {
            mass_x.push(x);
        }
        else {
            mass_o.push(x)
        }
    }

    if (currentPlayer === 'X') {
        checkVictory(mass_x, currentPlayer)
    }
    else {
        checkVictory(mass_o, currentPlayer)
    }


    if (!isWin) {
        currentPlayer = currentPlayer == "X" ? "O" : "X" 
        set_state(currentPlayer, false)
   
    }
    else {
        prepNewGame()
    }

}


// check victory
function checkVictory(points, currentPlayer) {

    var srt1 = 0; // check 1 row
    var srt2 = 0; // check 2 row
    var srt3 = 0; // check 3 row

    var st1 = 0; // check 1 collumn
    var st2 = 0; // check 2 collumn
    var st3 = 0; // check 3 collumn

    var d1 = 0; // check 1 diagonal
    var d2 = 0; // check 2 diagonal


    for (var i = 0; i < points.length; i++) {
        switch (points[i]) {
            case 1: { srt1++; st1++; d1++; break; }
            case 2: { srt1++; st2++; break; }
            case 3: { srt1++; st3++; d2++; break; }
            case 4: { srt2++; st1++; break; }
            case 5: { srt2++; st2++; d1++; d2++; break; }
            case 6: { srt2++; st3++; break; }
            case 7: { srt3++; st1++; d2++; break; }
            case 8: { srt3++; st2++; break; }
            case 9: { srt3++; st3++; d1++; break; }
        }

        console.log(currentPlayer + " " + d1 + " "+ d2)

        if (srt1 == 3 || srt2 == 3 || srt3 == 3) {
            endgame(currentPlayer)
            console.log(currentPlayer + " win by str")
            isWin = true
        }
        if (st1 == 3 || st2 == 3 || st3 == 3) {
            endgame(currentPlayer)
            console.log(currentPlayer + " win by st")
            isWin = true        
        }
        if (d1 == 3 || d2 == 3) {
            endgame(currentPlayer)
            console.log(currentPlayer + " win by diag")
            isWin = true
        }
    }

    if (mass.length === 9 && !isWin) {
        draw()
    }



}

function prepNewGame() {
    mass.length = 0
    mass_x.length = 0
    mass_o.length = 0

    for (let i = 1; i <= 9; i++) {
        let field = document.getElementById(i)
        field.innerText = ""
    }

    currentPlayer = 'X'

    set_state(currentPlayer)

    isWin = false
    


}


function endgame(currentPlayer) {
    alert(currentPlayer + " Wins")
}

function draw() {
    alert("draw")



}
