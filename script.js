let G_NUM_OF_MINES = 40;
let G_NUM_FLAGGED_MINES = 0;
let gameOver = false;
let G_W = 9;
let G_H = 9;
newBoard(9,9,10);

function updateFieldDOMScale(width, height) {
    document.getElementById("field-container").style.color="white";
    let fieldDOM = document.getElementById("field");
    let containerFieldDOM = document.getElementById("field-container");
    let containerW = containerFieldDOM.offsetWidth
    let containerH = containerFieldDOM.offsetHeight

    if (containerW>containerH) {
        fieldDOM.style.height = "100%";
        fieldDOM.style.width = fieldDOM.offsetHeight + "px";
    } else {
        fieldDOM.style.width = "100%";
        fieldDOM.style.height = fieldDOM.offsetWidth + "px";
    }
    if (width > height) {
        let ratio = height/width;
        fieldDOM.style.height = fieldDOM.offsetHeight * ratio + "px";
    } else {
        let ratio = width/height;
        fieldDOM.style.width = fieldDOM.offsetWidth * ratio + "px";
    }
}

function newBoard(width, height, numOfMines) {

    G_NUM_OF_MINES = numOfMines;
    G_NUM_FLAGGED_MINES = 0

    let fieldDOM = document.getElementById("field");

    // delete old nodes
    fieldDOM.innerHTML = '';

    let largestVMin = 100;
    let suffix = "%";
    width = Number(width)
    height = Number(height)

    G_W = width;
    G_H = height;

    updateFieldDOMScale(width, height);
    //console.log(fieldDOM.offsetWidth)

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
        case "c":
            let w = document.getElementById("wRange").value;
            let h = document.getElementById("hRange").value;
            let m = document.getElementById("mRange").value;
            newBoard(w,h,m);
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
    document.getElementById("field-container").style.color="red";


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

function showSliders() {
    document.getElementById("wRange").style.display = "block";
    document.getElementById("hRange").style.display = "block";
    document.getElementById("mRange").style.display = "block";
    document.getElementById("wRangeDisplay").style.display = "block";
    document.getElementById("hRangeDisplay").style.display = "block";
    document.getElementById("mRangeDisplay").style.display = "block";
    document.getElementById("wRangeDisplay").innerHTML = "Width: " + document.getElementById("wRange").value;
    document.getElementById("hRangeDisplay").innerHTML = "Height: " + document.getElementById("hRange").value;
    document.getElementById("mRangeDisplay").innerHTML = "Mines: " + document.getElementById("mRange").value;
}

function hideSliders() {
    document.getElementById("wRange").style.display = "none";
    document.getElementById("hRange").style.display = "none";
    document.getElementById("mRange").style.display = "none";
    document.getElementById("wRangeDisplay").style.display = "none";
    document.getElementById("hRangeDisplay").style.display = "none";
    document.getElementById("mRangeDisplay").style.display = "none";
}

hideSliders();
document.getElementById("size").addEventListener("change", function (e) {
    if (e.target.value === "c") {
        showSliders();
    } else {
        hideSliders()
    }
})

document.getElementById("wRange").oninput = function() {
    document.getElementById("wRangeDisplay").innerHTML = "Width: " + this.value;
}

document.getElementById("hRange").oninput = function() {
    document.getElementById("hRangeDisplay").innerHTML = "Height: " + this.value;
}

document.getElementById("mRange").oninput = function() {
    document.getElementById("mRangeDisplay").innerHTML = "Mines: " + this.value;
}

document.getElementById("options").addEventListener("change", function(e) {
    if ((e.target.id === "hRange") || (e.target.id === "wRange")) {
        let w = document.getElementById("wRange").value;
        let h = document.getElementById("hRange").value;
        document.getElementById("mRange").max = Math.floor(w * h * 0.35)
    }
    document.getElementById("mRange").value = Math.min(document.getElementById("mRange").value, document.getElementById("mRange").max)
    document.getElementById("mRangeDisplay").innerHTML = "Mines: " + document.getElementById("mRange").value;
})

window.addEventListener('resize', function(event){
    updateFieldDOMScale(G_W, G_H);
});