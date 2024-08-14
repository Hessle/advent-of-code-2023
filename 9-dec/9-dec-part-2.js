import fs from "fs";

function getValueLists() {
    let data = fs.readFileSync('input.txt').toString('utf-8').split("\n");
    let values = [];
    data.forEach(line => {
        let valueList = line.split(" ").map(value => {
            return parseInt(value);
        });
        values.push(valueList);
    });
    return values;
}

function gotGrowth(list) {
    let stillGrowing = false;
    for(let i = 0; i< list.length; i++){
        if(list[i] !== 0) {
            stillGrowing = true;
            break;
        }
    }
    return stillGrowing;
}

function getPrediction(list) {

    let predictionArray = [];
    let currentList = list;

    while (gotGrowth(currentList)) {
        predictionArray.push(currentList[0]);
        let deeperList = [];

        for (let i = 0; i < currentList.length -1; i++) {
            deeperList.push(currentList[i+1] - currentList[i]);

        }

        currentList = deeperList;


    }
    let prediction = predictionArray[predictionArray.length -1];
    for(let i=predictionArray.length-1; i>0; i--){

        prediction = predictionArray[i-1] - prediction;

    }

    return prediction;
}

function getPredications(valueLists) {
    let predictionSum = 0;
    valueLists.forEach(list => {
        let prediction = getPrediction(list);

        predictionSum = prediction + predictionSum;
    });

    return predictionSum;
}

const valueLists = getValueLists();
console.log("This is the prediction sum: ",getPredications(valueLists));