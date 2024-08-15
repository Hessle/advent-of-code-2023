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

function playARound(cards, starterDeck){
    let nextRound = [];
    cards.forEach((card) => {
        let currentCardInDeck = starterDeck.indexOf(card); // This wouldn't have worked if any of the cards were identical. then I had to add Id's
        let nrHits= 0;
        card.playerNumbers.forEach((nr) => {
            if(card.winningNumbers.indexOf(nr)> -1 ){
                nrHits = nrHits+1;
                nextRound.push(starterDeck[currentCardInDeck+nrHits]);
            }
        });
    });
    return nextRound;
}

function playCards(starterDeck) {
    let playedCards = 0;
    let nrOfRounds = 1;
    let roundOfCards = starterDeck;
    while (roundOfCards[0]) {
        nrOfRounds++;
        playedCards = playedCards + roundOfCards.length;
        roundOfCards = playARound(roundOfCards, starterDeck);
    }

    return playedCards;
}

const lines = linesFromFile();
const starterDeck = getCardObjects(lines);
console.log(`played scatchCards amount is:  ${playCards(starterDeck)}`);