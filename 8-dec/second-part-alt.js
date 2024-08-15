// Since the original part 2 took to long, I decided that there needed to be a pattern in the network + instructions.
// Apparently this pattern is stupidly easy: You start at 6 different "..A"-nodes which are tightly coupled to only 1 specific "..Z" each.
// After you reach the matching Z-node the first time, you will need to get back to that specific Z-node by making a round trip.
// After some investigation it happens to be that every round trip for all 6 ghosts always take the same amount of steps.
// Moreover, they all take exactly the same amount of steps as getting from the ..A-node to ..Z-node.
// that made the solution very easy:
// We just take the ghost with the longest trip and start multiplying it and check if that number is divisible by every of the other ghosts,
// aka to see which of its round trips would align with all the others'.


// I don't know if there would have been a solvable solution with my equipment if either of these was not true:
// - The ghosts are on a closed loop of 1 specific ..Z-node
// - The patterns of the instructions are specifically designed to make every round trip the same length
// I did not really like this part 2, because there was no reason to assume any of these statements,
// but maybe discovering the pattern was the puzzle...

const highest = 21251;
const others = [11567, 19637, 15871, 21251, 12643, 19099];

function getSteps() {
    let iterations = 0;
    let matchingRoundTrips = false;
    while (!matchingRoundTrips) {
        iterations = iterations + 1;
        matchingRoundTrips = true; // for the legibility would be better to have a different variable to check during the run and assign it to this, but this works as well.
        let value = highest * iterations;
        for (let i = 0; i < others.length; i++) {
            if (value % others[i] !== 0) {
                matchingRoundTrips = false;
                break;
            }
        }
    }
    return highest * iterations;
}

console.log("Amount of Steps:", getSteps());