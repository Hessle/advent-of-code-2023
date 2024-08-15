import fs from "fs";

// not really necessary for the solution, but helps visually detect the millions border
const milRow = 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm';

function linesFromFile(fileName) {
    let data = fs.readFileSync(fileName).toString('utf-8');
    return data.split("\n");
}

function expandGalaxy(rows) {
    //vertically
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].indexOf('#') === -1) {
            rows.splice(i, 1, milRow);
            i++;
        }
    }
    console.log(rows);

    // horizontally
    for (let j = 0; j < rows[0].length; j++) {
        let empty = true;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i][j] === '#') {
                empty = false;
                break;
            }
        }
        if (empty === true) {
            for (let k = 0; k < rows.length; k++) {
                let row = rows[k];
                let newRow = [row.slice(0, j), 'm', row.slice(j+1)].join('');
                rows.splice(k, 1, newRow);
            }
            j++;
        }
    }

    fs.writeFile('expanded-universe-2.txt', rows.join('\n'), (err) => {
        // In case of an error throw err.
        if (err) throw err;
    })
}

const rows = linesFromFile('input.txt');
expandGalaxy(rows);


