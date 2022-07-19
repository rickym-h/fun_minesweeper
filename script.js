class Tile {
    constructor() {
        this.flagged = false;
    }

    toggleFlag() {
        this.flagged = !this.flagged;
    }
}

let numOfMines = 40;

function newBoard(width, height, numOfMines) {
    let field = Array.apply(null, Array(height)).map(x=>{
        return Array.apply(null, Array(width)).map(function() {return new Tile()})
    })


    let fieldDOM = document.getElementById("field");

    // delete old nodes
    fieldDOM.innerHTML = '';

    //set styling taking into account the new nodes
    fieldDOM.style.gridTemplateRows = "repeat("+height.toString()+", 1fr)";
    fieldDOM.style.gridTemplateColumns = "repeat("+width.toString()+", 1fr)";

    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            let tile = document.createElement("div");

            fieldDOM.appendChild(tile);

        }
    }
}

newBoard(9,9,1);
