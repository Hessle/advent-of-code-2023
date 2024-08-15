const races = [
    {time: 60, distance: 475}, 
    {time: 94, distance: 2138}, 
    {time: 78, distance: 1015}, 
    {time: 82, distance: 1650}
]

const bigRace = [
    {time: 60947882, distance: 475213810151650}
]

function getWinningOptions(race) {
    let winningOptionsAmount = 0;
    let speed;
    let timeRacing;
    let traveled;
    for (let i = 1; i < race.time; i++) {
        speed = i;
        timeRacing = race.time - i;
        traveled = speed * timeRacing;
        if (traveled > race.distance) {
            winningOptionsAmount = winningOptionsAmount + 1;
        }
    }

    return winningOptionsAmount;

}

function getMarginOfError(races) {
    let marginOfError = 1;
    let winningOptionForRace;
    races.forEach(race => {
        winningOptionForRace = getWinningOptions(race);
        marginOfError = marginOfError * winningOptionForRace;
    });
    return marginOfError;
}

console.log("part1, smaller races:", getMarginOfError(races));
console.log("part2, big race:", getMarginOfError(bigRace));