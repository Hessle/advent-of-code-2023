import fs from "fs";

// this code is inefficient but if the patterns were not repeating, it would be necessary.
// it would take approx 5 years for this code to run on my machine to find the answer.
// Luckily, I was less patient and decided to check for patterns. And there was... see part-2-alt.js

function getNodeObjects(fileName) {
    const data = fs.readFileSync(fileName).toString('utf-8');
    const nodeLines = data.split("\n");
    let nodes = [];
    nodeLines.forEach(line => {
        let node = {};
        node.name = line.substring(0, 3);
        node.directions = [];
        node.directions.push(line.substring(7, 10));
        node.directions.push(line.substring(12, 15));
        nodes.push(node);
    });
    return nodes;
}

function getInstructions(fileName) {
    return fs.readFileSync(fileName).toString('utf-8').split("");
}

function areAllGhostAtExit(ghosts){
    let allGhostsAtExit = true;
    for(let i = 0; i < ghosts.length; i++){
        if(ghosts[i].charAt(2) !== 'Z') {
            allGhostsAtExit = false;
            break;
        }
    }
    return allGhostsAtExit;
}

function getStepAmount(nodes, instructions) {
    let stepAmount = 0;
    let instruction;
    let ghostPositions = ['LCA','NVA','GCA','SXA','AAA','GMA'];
    while (!areAllGhostAtExit(ghostPositions)) {
        instruction = parseInt(instructions[stepAmount % instructions.length]);
        for (let i = 0; i < ghostPositions.length; i++) {
            for (let j = 0; j < nodes.length; j++) {
                if (nodes[j].name === ghostPositions[i]) {
                    ghostPositions[i] = nodes[j].directions[instruction];
                    break;
                }
            }
        }
        stepAmount = stepAmount + 1;
    }

    return stepAmount
}

const nodes = getNodeObjects("network.txt");
const instructions = getInstructions("instructions.txt");
console.log("stepAmount: ", getStepAmount(nodes, instructions));