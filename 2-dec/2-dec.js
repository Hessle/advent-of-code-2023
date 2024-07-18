import fs from "fs";

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

function linesFromFile() {
    let data = fs.readFileSync('input.txt').toString('utf-8');
    return data.split("\n");
}

function checkValid(colours) {
    let isValid = true;
    colours.forEach(colour => {
        const parts = colour.split(" ");
        if(parts[0] === ''){
            parts.shift();
        }
        let testNr;
        if (parts[1] === 'red') {
            testNr = MAX_RED;
        } else if (parts[1] === 'green') {
            testNr = MAX_GREEN;
        } else if (parts[1] === 'blue' ) {
            testNr = MAX_BLUE;
        }
        console.log("parts: ", parts);
        if (parts[0] > testNr) {
            isValid = false;
        }
    })
    return isValid;
}

function totalEligibleGames(games) {
    let sumGameIds= 0;

    games.forEach((game, i) => {
        const pulls = game.split(";");
        const colours = game.split(/[,;]/);
        if(checkValid(colours)){
            console.log("game on line", (i+1),":", game, "is valid");
            sumGameIds = sumGameIds + (i+1);
        }

    });

    return sumGameIds;
}

const games = linesFromFile();

console.log(`gameIds Total: ${totalEligibleGames(games)}`)