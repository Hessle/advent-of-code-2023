import fs from "fs";

const universeWidth = 141;
const totalGalaxies = 438;

function universeFromFile(fileName) {
    return fs.readFileSync(fileName).toString('utf-8');
}

function getPositionOfGalaxy(universe, index) {

    let position = universe.split('#', index).join('#').length + 1;
    let horizontal = position % universeWidth;
    let vertical = Math.floor(position / universeWidth);
    return {x: horizontal, y: vertical}
}

function getMilsCrossed(currentGalaxy, targetGalaxy) {

    const xAxisMillionBorders = [57, 69, 76, 93, 96, 109, 118];
    const yAxisMillionBorders = [6, 50, 59, 67, 119];

    let HorMilsBeforeCurrent = 0;
    let xAxisMilsBeforeTarget = 0;
    let yAxisMilsAboveCurrent = 0;
    let yAxisMilsAboveTarget = 0;

    yAxisMillionBorders.forEach(pos => {
        if (pos < currentGalaxy.x) {
            HorMilsBeforeCurrent++;
        }
        if (pos < targetGalaxy.x) {
            xAxisMilsBeforeTarget++;
        }
    })

    xAxisMillionBorders.forEach(pos => {

        if (pos < currentGalaxy.y) {
            yAxisMilsAboveCurrent++;
        }
        if (pos < targetGalaxy.y) {
            yAxisMilsAboveTarget++;
        }
    })
    const horizontalCrossed = Math.abs(HorMilsBeforeCurrent - xAxisMilsBeforeTarget);
    const verticalCrossed = Math.abs(yAxisMilsAboveCurrent - yAxisMilsAboveTarget);
    return horizontalCrossed + verticalCrossed;
}

function getTotalDistance(universe) {
    let totalDistance = 0;
    let currentGalaxy;
    let targetGalaxy;
    let milsCrossed;
    let xDelta;
    let yDelta;

    for (let i = 1; i < totalGalaxies; i++) {
        currentGalaxy = getPositionOfGalaxy(universe, i);
        for (let j = i + 1; j <= totalGalaxies; j++) {
            targetGalaxy = getPositionOfGalaxy(universe, j);
            milsCrossed = getMilsCrossed(currentGalaxy, targetGalaxy);
            xDelta = Math.abs(targetGalaxy.x - currentGalaxy.x);
            yDelta = targetGalaxy.y - currentGalaxy.y; // we go from top to bottom. target is never above.
            totalDistance = totalDistance + xDelta + yDelta + (milsCrossed * 999999);
        }
    }

    return totalDistance;
}

const universe = universeFromFile('expanded-universe-2.txt'); // actually same result as input but visually clearer
console.log("total distance:", getTotalDistance(universe));

