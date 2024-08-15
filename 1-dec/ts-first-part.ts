import * as fs from 'fs';

function linesFromFile() {
    let data = fs.readFileSync('input.txt').toString('utf-8');
    return data.split("\n");
}
function getNumber(line:string, flipString= false): string {
    if(flipString){
        line = line.split("").reverse().join("");
    }
    const nrRegex = /\d/;

    const match = line.match(nrRegex);
    return match !== null ? match[0] : "0";
}

function getTotal(lines: string[]) {
    let number1;
    let number2;
    let lineNumber;
    let total= 0;
    lines.forEach((line) => {
        number1 = getNumber(line);
        number2 = getNumber(line, true);
        lineNumber = parseInt(number1 + number2);
        total = total + lineNumber;
    });
    return total;
}
const lines = linesFromFile();
console.log(`total is: ${getTotal(lines)}`);

