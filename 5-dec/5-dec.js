import fs from "fs";

function linesFromFile(fileName) {
    let data = fs.readFileSync(fileName).toString('utf-8');
    return data.split("\n");
}

function getOriginToDestionations(lines){
    let originToDestArrays = [];
    lines.forEach(line =>{
        let elements = line.split(' ').map(Number);
        originToDestArrays.push(elements);
    });
    return originToDestArrays;
}
function getSeeds(fileName) {
    let data = fs.readFileSync(fileName).toString('utf-8');
    let seeds = data.split(" ");
    return seeds.map(Number);
}

function converter(origin, map) {
    let destinations = [];

    origin.forEach(originItem => {
        let found = false;
        map.forEach(row => {
            if(originItem > row[1] && originItem < row[1] + row[2]){
                found = true;
                let destination = row[0] + originItem - row[1];
                destinations.push(destination);
            }
        })
        if (!found) {
            destinations.push(originItem);
        }
    });
    return destinations;
}

const seeds = getSeeds("seeds.txt");
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

const soils = converter(seeds, seedToSoils);
const ferts = converter(soils, soilToFert);
const waters = converter(ferts, fertToWater);
const lights = converter(waters, waterToLight);
const temps = converter(lights, lightToTemp);
const humids = converter(temps, TempToHumid);
const locations = converter(humids, humidToLoc);

console.log(locations);