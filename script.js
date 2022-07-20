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

    // todo style #field width and height based on the ratio of width/height

    //set styling taking into account the new nodes
    fieldDOM.style.gridTemplateRows = "repeat("+height.toString()+", 1fr)";
    fieldDOM.style.gridTemplateColumns = "repeat("+width.toString()+", 1fr)";

    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            let tile = document.createElement("div");
            tile.classList.toggle("tile")
            fieldDOM.appendChild(tile);
        }
    }
}

newBoard(9,9,1);


document.getElementById("new-game").addEventListener("click", function() {
    let size = document.getElementById("size").value
    switch (size) {
        case "s":
            newBoard(9,9,1);
            break;
        case "m":
            newBoard(16,16,40);
            break;
        case "l":
            newBoard(32,16,99);
            break;
        default:
            console.log("INVALID SIZE ENTERED: " + size)
            return;
    }
})