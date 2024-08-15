import fs from "fs";

function rowsFromFile(fileName) {
    let data = fs.readFileSync(fileName).toString('utf-8');
    let rows = data.split("\n");
    let rowArrays = [];
    rows.forEach(row => {
        rowArrays.push(row.split(""));
    })
    return rowArrays;
}

const rowArrays = rowsFromFile('input.txt');
const orientations = ['north', 'west', 'south', 'east'];

function getChar(currentRow, currentColumn) {
    let row = rowArrays[currentRow];

    return row[currentColumn];
}

function getDirection(entree, char) {
    if (char === '|' || char === '-') {
        return 0
    } else if (char === 'F' || char === 'J') {
        if (entree === 'north' || entree === 'south') {
            return 1
        } else {
            return -1
        }
    } else {
        if (entree === 'north' || entree === 'south') {
            return -1
        } else {
            return 1
        }
    }
}

function getNextStepInfo(currentRow, currentColumn, currentOrientation) {

    let char = getChar(currentRow, currentColumn);
    let direction = getDirection(currentOrientation, char); //clockwise = 1, counterclockwise = -1, straight = 0
    let nextOrientationIndex = (((orientations.indexOf(currentOrientation) + direction) % orientations.length) + orientations.length) % orientations.length
    let nextOrientation = orientations[nextOrientationIndex];
    let nextRow = currentRow;
    let nextColumn = currentColumn;
    switch (nextOrientation) {
        case 'south':
            nextRow = nextRow + 1;
            break;
        case 'north':
            nextRow = nextRow - 1;
            break;
        case 'west':
            nextColumn = nextColumn + 1;
            break;
        case 'east':
            nextColumn = nextColumn - 1;
            break;
        default :
            throw Error('no eligible orientation')
    }

    return {row:nextRow, column: nextColumn, orientation:nextOrientation};
}

function returnedToStart(currentRow, currentColumn) {
    let check= false;
    if(currentRow === 114 && currentColumn === 35) {
        check = true;
    }
    return check;
}

function getEnclosedArea() {

    let currentRow = 114;
    let currentColumn = 35;
    let currentOrientation = orientations[3];
    let enclosedElements = 0;
    do {
        let nextStepInfo = getNextStepInfo(currentRow, currentColumn, currentOrientation);
        if(nextStepInfo.orientation === 'west' && currentOrientation !== 'north') {
            enclosedElements = enclosedElements + rowArrays.length - (currentRow + 1);
        }
        if(nextStepInfo.orientation === 'north' && currentOrientation === 'west') {
            enclosedElements = enclosedElements + rowArrays.length - (currentRow + 1);
        }
        if(nextStepInfo.orientation === 'east' && currentOrientation !== 'south') {
            enclosedElements = enclosedElements - (rowArrays.length - currentRow);
        }
        if(nextStepInfo.orientation === 'south' && currentOrientation === 'east') {
            enclosedElements = enclosedElements - (rowArrays.length - currentRow);
        }

        currentRow = nextStepInfo.row;
        currentColumn = nextStepInfo.column;
        currentOrientation = nextStepInfo.orientation;


    } while (!returnedToStart(currentRow, currentColumn));

    return enclosedElements;

}

console.log("enclosed:", getEnclosedArea());
