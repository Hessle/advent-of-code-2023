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
        let lineObject = {line:".." + line + ".."};
        if (i > 0) {
            lineObject.previousLine = ".." + lines[i - 1] + "..";
        }
        if (i < lines.length - 1) {
            lineObject.nextLine = ".." + lines[i + 1] + "..";
        }
        lineObjects.push(lineObject);
    });
    return lineObjects;
}

function addGearIndices(objects) {
    for (const object of objects) {
        object.gearIndices = [];
        for (let i = 0; i < object.line.length; i++) {
            if (/\*/.test(object.line[i])) {
                object.gearIndices.push(i);
            }
        }
    }
    return objects;
}

function getNmrsOnOtherLine(index, line){
    let foundNrs= [];
    let targetChars = line.substring(index-1, index+2);
    let areTwoNumbers = /\d\D\d/.test(targetChars);
    let firstDigitPosition = targetChars.search(/\d/);
    let lastDigitPosition = 2 - targetChars.split("").reverse().join('').search(/\d/);
    if(areTwoNumbers){
        let parts = line.substring(0, index).split(/[/.*=&@$%\-+#]+/);
        let firstNumber = parts[parts.length-1];
        let secondNumber = line.substring(index+1).replace(/(^\d+)(.+$)/i,'$1');
        foundNrs.push(firstNumber,secondNumber);
    } else if (firstDigitPosition > -1 ) {
        // if firstDigitPosition is not 0 that means that number starts from firstDigit in targetRange.
        if (firstDigitPosition >= 1) {
            let substr= line.substring(index-1 + firstDigitPosition);
            let parts = substr.split(/[/.*=&@$%\-+#]+/);
            let foundNr = parts[0];
            foundNrs.push(foundNr);
        }
        // if firstDigitPosition is 0 then the number ends around the gear (because nummers are 999 or less)
        else if(firstDigitPosition === 0 ){

            let substr = line.substring(0, index+lastDigitPosition);
            let reverseSubstr = substr.split('').reverse().join('');
            let parts = reverseSubstr.split(/[/.*=&@$%\-+#]+/);
            let foundNr = parts[0].split('').reverse().join('');

            foundNrs.push(foundNr);
        }

    }
    return foundNrs;
}

function getNmrsOnOwnLine(index, line){
    let foundNrs = [];
    if (/\d/.test(line.charAt(index-1))){
        let parts = line.substring(0, index).split(/[/.*=&@$%\-+#]+/);
        let numberBeforeGear = parts[parts.length-1];
        foundNrs.push(numberBeforeGear);
    }
    if (/\d/.test(line.charAt(index+1))){
        let parts = line.substring(index+1).split(/[/.*=&@$%\-+#]+/);
        let numberAfterGear = parts[0];
        foundNrs.push(numberAfterGear);
    }
    return foundNrs;
}
function getConnectedNrs(index, object){
    let foundNrs= [];
    if(object.previousLine){
        let prevLineNrs= getNmrsOnOtherLine(index, object.previousLine);
        prevLineNrs.forEach(nr =>{
            foundNrs.push(nr);
        });
    }
    if(object.nextLine){
        let nextLineNrs= getNmrsOnOtherLine(index, object.nextLine);
        nextLineNrs.forEach(nr =>{
            foundNrs.push(nr);
        });
    }
    let ownLineNrs= getNmrsOnOwnLine(index, object.line);
    ownLineNrs.forEach(nr =>{
        foundNrs.push(nr);
    });
    return foundNrs;
}

function getTotalGearPower(objects) {
    let gearPower=0;
    objects.forEach(object => {
        object.gearIndices.forEach(index => {
            let connectedNrs = getConnectedNrs(index, object);
            if(connectedNrs.length === 2){
                gearPower = gearPower + (connectedNrs[0] * connectedNrs[1]);
            }
        });
    });
    return gearPower;
}

const lines = linesFromFile();
const lineObjects = getLineObjects(lines);
const linesWithGearIndices = addGearIndices(lineObjects);
console.log(`total Numbers ${getTotalGearPower(linesWithGearIndices)}`);
