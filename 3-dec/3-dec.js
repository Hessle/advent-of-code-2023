// get numbers in object {number, line, lineNr}
// for each number check current line directly in front and after
// for each number check line above and beneath.

import fs from "fs";

function linesFromFile() {
    let data = fs.readFileSync('input.txt').toString('utf-8');
    return data.split("\n");
}

function getLineObjects(lines) {
    let lineObjects = [];
    lines.forEach((line, i) => {
        let lineObject = {line: line};
        if (i > 0) {
            lineObject.previousLine = lines[i - 1];
        }
        if (i < lines.length - 1) {
            lineObject.nextLine = lines[i + 1];
        }
        lineObjects.push(lineObject);
    });
    return lineObjects;
}

function addNumberIndices(objects) {
    for (const object of objects) {
        object.numberIndices = [];
        let numberIndexStart;
        let numberIndexEnd;
        for (let i = 0; i < object.line.length; i++) {
            if (/\d/.test(object.line[i])) {
                if (i === 0  || /\d/.test(object.line[i-1])===false) {
                    numberIndexStart = i;
                }
                if (/\d/.test(object.line[i+1])===false) {
                    numberIndexEnd = i;
                }
                if(numberIndexStart > -1 && numberIndexEnd > -1){
                    object.numberIndices.push({numberIndexStart,numberIndexEnd});
                    numberIndexStart=-1;
                    numberIndexEnd=-1;
                }
            }
        }
    }
    return objects;
}

function determineLine (line, index){
    const regx = new RegExp(/[/*=&@$%\-+#]+/);
    const substr = line.substring(index.numberIndexStart - 1, index.numberIndexEnd + 2);
    return regx.test(substr);
}

function getTotalNumbers(objects) {
    let totalValidNumbers = 0;
    objects.forEach(object => {
        console.log(object);
        object.numberIndices.forEach(index => {
            const Nr = parseInt(object.line.substring(index.numberIndexStart, index.numberIndexEnd + 1));
            const ownLineResult = determineLine(object.line, index);
            const previousLineResult = object.previousLine ? determineLine(object.previousLine, index) : false;
            const nextLineResult = object.nextLine ? determineLine(object.nextLine, index): false;
            if (ownLineResult || previousLineResult || nextLineResult ) {
                totalValidNumbers = totalValidNumbers + Nr;
            }
        });
    });
    return totalValidNumbers;
}

const lines = linesFromFile();
const lineObjects = getLineObjects(lines);
const linesWithNumberIndices = addNumberIndices(lineObjects);
console.log(`total Numbers ${getTotalNumbers(linesWithNumberIndices)}`);
