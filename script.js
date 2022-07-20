let G_NUM_OF_MINES = 40;
let G_NUM_FLAGGED_MINES = 0;
let gameOver = false;
newBoard(9,9,10);

function newBoard(width, height, numOfMines) {

    G_NUM_OF_MINES = numOfMines;
    G_NUM_FLAGGED_MINES = 0

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

            tile.addEventListener("click", revealTile)

            tile.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                toggleTileFlag(e)
                return false;
            }, false);

            fieldDOM.appendChild(tile);
        }
    }
}






document.getElementById("new-game").addEventListener("click", function() {
    switch (document.getElementById("size").value) {
        case "s":
            newBoard(9,9,10);
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
    gameOver = false;
})

function toggleTileFlag(e) {
    if (gameOver) {return;}
    e.target.classList.toggle("flagged");
}

function revealTile(e) {
    if (gameOver) {return;}
    gameOver = true;
    e.target.classList.toggle("clicked")

    // get data representation of field
    let listOfTiles = Array.from(document.getElementById("field").childNodes);
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    shuffle(listOfTiles)


    // put mines on tiles in order clicked tile > non-flagged tiles > flagged tiles
    listOfTiles.sort(function(a, b) {
        let getPriority = function(n) {
            if (n.classList.contains("clicked")) {
                return 3;
            // } else if (!n.classList.contains("flagged")) {
            //     return 2;
            } else {
                return 1;
            }
        }
        return (getPriority(b) - getPriority(a));
    })

    for (let i = 0; i < G_NUM_OF_MINES; i++) {
        listOfTiles[i].classList.toggle("mine");
        console.log("foo")
    }
    console.log(listOfTiles)
}