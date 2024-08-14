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
// const rowArrays = rowsFromFile('example.txt');
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

function getNextCoordinates(currentRow, currentColumn, currentOrientation) {

    let char = getChar(currentRow, currentColumn);
    console.log(char);
    let direction = getDirection(currentOrientation, char);
    let newOrientationIndex = (((orientations.indexOf(currentOrientation) + direction) % orientations.length) + orientations.length) % orientations.length
    let newOrientation = orientations[newOrientationIndex];
    let newRow = currentRow;
    let newColumn = currentColumn;
    switch (newOrientation) {
        case 'south':
            newRow = newRow + 1;
            break;
        case 'north':
            newRow = newRow - 1;
            break;
        case 'west':
            newColumn = newColumn + 1;
            break;
        case 'east':
            newColumn = newColumn - 1;
            break;
        default :
            throw Error('no eligible orientation')
    }

    return [newRow, newColumn, newOrientation];
}

function returnedToStart(currentRow, currentColumn) {
    let check= false;
    if(currentRow === 114 && currentColumn === 35) {
        check = true;
    }
    return check;
}

function stepsToGetAround() {

    let currentRow = 114;
    // let currentRow = 1;
    let currentColumn = 35;
    // let currentColumn = 1;
    let currentOrientation = orientations[0];
    let steps = 0;
    do {
        console.log(currentRow, currentColumn, currentOrientation, steps);
        let coordinates = getNextCoordinates(currentRow, currentColumn, currentOrientation);
        currentRow = coordinates[0];
        currentColumn = coordinates[1];
        currentOrientation = coordinates[2];
        steps = steps + 1;

    } while (!returnedToStart(currentRow, currentColumn));

    return steps;

}
console.log("steps to get around:", stepsToGetAround());
