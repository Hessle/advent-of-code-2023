import fs from "fs";

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

function getStepAmount(nodes, instructions) {
    let stepAmount = 19098;
    let instruction;
    let nextNode = 'TQZ';
    do {

        instruction = parseInt(instructions[stepAmount % instructions.length]);
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].name === nextNode) {
                nextNode = nodes[i].directions[instruction];
                break;
            }
        }
        stepAmount = stepAmount + 1;
    } while (nextNode.charAt(2) !== 'Z')

    return stepAmount
}

const nodes = getNodeObjects("network.txt");
const instructions = getInstructions("instructions.txt");
console.log("stepAmount: ", getStepAmount(nodes, instructions));