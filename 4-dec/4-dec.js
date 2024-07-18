import fs from "fs";

function linesFromFile() {
    let data = fs.readFileSync('input.txt').toString('utf-8');
    return data.split("\n");
}

function getCardObjects(lines) {
    let scratchCards = [];
    lines.forEach(line => {
        let cards = line.split("|");
        let scratchCard = {};
        scratchCard.winningNumbers = cards[0].split(" ").filter((card) => /\d/.test(card));
        scratchCard.playerNumbers = cards[1].split(" ").filter((card) => /\d/.test(card));
        scratchCards.push(scratchCard);
    });
    return scratchCards;
}

function getPoints(cards) {
    let totalPoints= 0;
    cards.forEach(card => {
        let gotPoints = false;
        let cardPoints = 0;
        card.playerNumbers.forEach(nr => {
           if(card.winningNumbers.indexOf(nr)> -1 ){
              if(gotPoints){
                  cardPoints = cardPoints * 2;
              } else{
                  gotPoints = true;
                  cardPoints = 1;
              }
           }
        });
        totalPoints = totalPoints + cardPoints;

    });
    return totalPoints;
}

const lines = linesFromFile();
const cardObjects = getCardObjects(lines);
console.log("cards: ", cardObjects);
console.log(`Points ${getPoints(cardObjects)}`);