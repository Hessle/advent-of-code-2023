import fs from "fs";

function linesFromFile(fileName) {
    let data = fs.readFileSync(fileName).toString('utf-8');
    return data.split("\n");
}

function getSeedLists(fileName) {
    let seedLists = [];
    let data = fs.readFileSync(fileName).toString('utf-8');
    let seedsData = data.split(";");
    seedsData.forEach(seedObject => {
        seedLists.push(seedObject.split(" "));
    })
    return seedLists;
}

function getOriginToDestionations(lines) {
    let originToDestArrays = [];
    lines.forEach(line => {
        let elements = line.split(' ').map(Number);
        originToDestArrays.push(elements);
    });
    return originToDestArrays;
}

function checkSeed(seed, seedLists){
    let found = false;
    seedLists.forEach(list => {
        let lowerBound = parseInt(list[0]);
        let upperBound = parseInt(list[0]) + parseInt(list[1]);

       if(parseInt(seed) >= lowerBound && parseInt(seed)< upperBound) {
           console.log(seed, "is between", lowerBound, " and ",upperBound);
           found = true;
       }
    });
    return found;
}
function getLowestLocation() {
    let location = 0;
    let targetLocation;
    let match = false;

    while (targetLocation === undefined) {
        location++;

        const humid = converter(location, humidToLoc);
        const temp = converter(humid, TempToHumid);
        const light = converter(temp,lightToTemp);
        const water = converter(light,waterToLight);
        const fert = converter(water, fertToWater);
        const soil = converter(fert, soilToFert);
        const seed = converter(soil,seedToSoils);
        match = checkSeed(seed, seedLists);
        if (match === true) {
            targetLocation = location;
        }
    }
    return targetLocation;
}

function converter(target, map) {

    let found = false;
    let destination;
    map.forEach(row => {
        if (target >= row[0] && target < row[0] + row[2]) {
            found = true;
            destination = row[1] + target - row[0];
        }
    })
    if (!found) {
        destination = target;
    }
    return destination;
}

const seedToSoilLines = linesFromFile("seed-to-soil.txt");
const soilToFertLines = linesFromFile("soil-to-fertilizer.txt");
const fertToWaterLines = linesFromFile("fertilizer-to-water.txt");
const waterToLightLines = linesFromFile("water-to-light.txt");
const lightToTempLines = linesFromFile("light-to-temperature.txt");
const TempToHumidLines = linesFromFile("temperature-to-humidity.txt");
const humidToLocLines = linesFromFile("humidity-to-location.txt");

const seedToSoils = getOriginToDestionations(seedToSoilLines);
const soilToFert = getOriginToDestionations(soilToFertLines);
const fertToWater = getOriginToDestionations(fertToWaterLines);
const waterToLight = getOriginToDestionations(waterToLightLines);
const lightToTemp = getOriginToDestionations(lightToTempLines);
const TempToHumid = getOriginToDestionations(TempToHumidLines);
const humidToLoc = getOriginToDestionations(humidToLocLines);

const seedLists = getSeedLists('seeds-part2.txt');

console.log("lowest location that has a seed: ", getLowestLocation(seedLists));