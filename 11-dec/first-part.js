import fs from "fs";

const universeWidth = 146;
// const universeWidth = 9;
const totalGalaxies = 438;
// const totalGalaxies = 4;


function universeFromFile(fileName) {
    return fs.readFileSync(fileName).toString('utf-8');
}

function getPositionOfGalaxy(universe, index) {

    let position = universe.split('#', index).join('#').length + 1;
    let horizontal = position % universeWidth;
    let vertical = Math.floor(position / universeWidth);
    return {horizontal: horizontal, vertical: vertical}
}

function getTotalDistance(universe) {
    let totalDistance = 0;
    let currentGalaxy;
    let targetGalaxy;

    for (let i = 1; i < totalGalaxies; i++) {
        currentGalaxy = getPositionOfGalaxy(universe, i);
        for (let j = i+1; j <= totalGalaxies; j++) {
            targetGalaxy = getPositionOfGalaxy(universe, j);
            let horDistance = Math.abs(targetGalaxy.horizontal - currentGalaxy.horizontal);
            let vertDistance = targetGalaxy.vertical - currentGalaxy.vertical;
            totalDistance = totalDistance + horDistance + vertDistance;
        }
    }

    return totalDistance;
}

const universe = universeFromFile('expanded-universe.txt');
console.log("total distance:", getTotalDistance(universe));

