import fs from "fs";

function linesFromFile() {
    let data = fs.readFileSync('input.txt').toString('utf-8');
    return data.split("\n");
}

function getGamePower(game) {
    const colours = game.split(/[,;]/);

    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;
    colours.forEach(colour => {
        const parts = colour.split(" ");
        if (parts[0] === '') {
            parts.shift();
        }
        parts[0] = parseInt(parts[0]);
        if (parts[1] === 'red') {
            minRed = parts[0] > minRed ? parts[0] : minRed;
        } else if (parts[1] === 'green') {
            minGreen = parts[0] > minGreen ? parts[0] : minGreen;
        } else if (parts[1] === 'blue') {
            minBlue = parts[0] > minBlue ? parts[0] : minBlue;
        }
    });
    return minRed * minGreen * minBlue;
}

function getTotalPower(games) {
    let totalPower= 0;

    games.forEach((game) => {
        const currentGamePower = getGamePower(game);
        totalPower = totalPower + currentGamePower;


    });

    return totalPower;
}

const games = linesFromFile();

console.log(`total power: ${getTotalPower(games)}`)