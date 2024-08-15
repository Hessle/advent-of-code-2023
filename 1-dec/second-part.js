import * as fs from 'fs';

const textNumbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

function linesFromFile() {
    let data = fs.readFileSync('input.txt').toString('utf-8');
    return data.split("\n");
}

function replaceFirst(line) {
    let lowestNumberIndex = line.match(/\d/).index;

    let firstNumberFound;
    textNumbers.forEach(number => {
        if(line.indexOf(number) < lowestNumberIndex && line.indexOf(number) !== -1 ){
            lowestNumberIndex = line.indexOf(number);
            firstNumberFound = number;
        }
    });
    return line.replace(firstNumberFound, textNumbers.indexOf(firstNumberFound).toString());
}
function replaceLast(line) {

    // What I should have done was just reverse the string and the textNumbers.
    // That way I could have reused the replaceFirst function again...
    // Now on line 39 I declare that all "seven" string can be replaced,
    // which works because the textnumbers don't overlap with themselves only other textnumbers
    let highestNumberIndex = 0;
    let lastNumberFound;
    textNumbers.forEach(number => {
        if(line.lastIndexOf(number) > highestNumberIndex){
            highestNumberIndex = line.lastIndexOf(number);
            lastNumberFound = number;
        }
    });
    if (highestNumberIndex === 0) {
        return line;
    } else {
        const regexForNr = new RegExp(lastNumberFound, "gm");
        return line.replace(regexForNr, textNumbers.indexOf(lastNumberFound).toString());
    }

}

function replaceTexts(lines) {
    let linesWithoutTexts = [];
    lines.forEach(line => {
        let lineWithoutFirstText = replaceFirst(line);
        let lineWithoutBothTexts = replaceLast(lineWithoutFirstText);

        linesWithoutTexts.push(lineWithoutBothTexts);
    });
    return linesWithoutTexts;
}

function getNumber(line, flipString = false) {
    const nrRegex = /\d/;

    if (flipString) {
        line = line.split("").reverse().join("");
    }

    const numberFound = line.match(nrRegex);

    return numberFound[0];
}

function getTotal(lines) {
    let number1;
    let number2;
    let lineNumber;
    let total = 0;
    let countedNumbers = 0;

    lines.forEach((line) => {
        number1 = getNumber(line);
        number2 = getNumber(line, true);
        lineNumber = parseInt(number1 + number2);
        total = total + lineNumber;
        countedNumbers++;
    });

    return total;
}

const lines = linesFromFile();
const linesWithoutTexts = replaceTexts(lines);

console.log(`total is: ${getTotal(linesWithoutTexts)}`);

