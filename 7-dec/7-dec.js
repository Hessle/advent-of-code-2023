import fs from "fs";

const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

function linesFromFile(fileName) {
    let data = fs.readFileSync(fileName).toString('utf-8');
    let lines = data.split("\n");
    let handsWithBids = []
    lines.forEach(line => {
        handsWithBids.push(line.split(" "));
    });
    return handsWithBids;
}

function getTypeRank(hand) {
    var typeRank = 1;
    let doubleCharList = hand[0].split('').sort().join('').match(/(.)\1+/g);
    if (doubleCharList && doubleCharList.length === 1) {
        typeRank = doubleCharList[0].length;
    }
    if (doubleCharList && doubleCharList.length === 2) {
        typeRank = doubleCharList[0].length === doubleCharList[1].length ? 2.5 : 3.5;
    }
    return typeRank;
}

function getHandsSortedByType(handsWithBids) {
    handsWithBids.forEach(hand => {
        hand[2] = getTypeRank(hand);
    });
    return handsWithBids.sort((a, b) => {
        return a[2] - b[2];
    });
}

function getHandsFullySorted(hands) {
    // explanation:
    // I loop through the whole list 5 times: once for every character in the hand.
    // I sort If the hand types are the same. otherwise I let them be (since they are already sorted on type)
    // I start sorting from the last character and only sort if characters are different
    for (let i = 1; i < 6; i++) {
        hands.sort((a, b) => {
            if (a[2] === b[2]) {
                let aChar = a[0].charAt(a[0].length - i);
                let bChar = b[0].charAt(b[0].length - i);
                if (aChar !== bChar) {
                    let valueAChar = cardValues.indexOf(aChar);
                    let valueBChar = cardValues.indexOf(bChar);
                    return valueAChar - valueBChar;
                }
            }
        })
    }
    return hands;
}

function getNumber(handsFullySorted) {
    let nr = 0;
    let rank;
    let bet;
    handsFullySorted.forEach(hand => {
        rank = handsFullySorted.indexOf(hand) + 1;
        bet = hand[1];
        nr = nr + (bet * rank);
    });
    return nr;
}

const handsWithBids = linesFromFile('input.txt');

const handsSortedByType = getHandsSortedByType(handsWithBids);
const handsFullySorted = getHandsFullySorted(handsSortedByType);

console.log(getNumber(handsFullySorted));