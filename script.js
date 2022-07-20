class Tile {
    constructor() {
        this.flagged = false;
    }

    toggleFlag() {
        this.flagged = !this.flagged;
    }
}

let G_NUM_OF_MINES = 40;

function newBoard(width, height, numOfMines) {
    let field = Array.apply(null, Array(height)).map(x=>{
        return Array.apply(null, Array(width)).map(function() {return new Tile()})
    })

    G_NUM_OF_MINES = numOfMines;

    let fieldDOM = document.getElementById("field");

    // delete old nodes
    fieldDOM.innerHTML = '';

    // todo style #field width and height based on the ratio of width/height
    let largestVMin = 80;
    if (width>height) {
        let ratio = height/width;
        fieldDOM.style.width = largestVMin.toString() + "vmin";
        fieldDOM.style.height = (ratio * largestVMin.toString())+"vmin";
    } else {
        let ratio = width/height;
        fieldDOM.style.width = (ratio * largestVMin.toString())+"vmin";
        fieldDOM.style.height = largestVMin.toString() + "vmin";
    }

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




newBoard(13,42,99);


document.getElementById("new-game").addEventListener("click", function() {
    switch (document.getElementById("size").value) {
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