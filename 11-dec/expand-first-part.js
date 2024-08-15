import fs from "fs";

const emptyRow = '............................................................................................................................................'

function linesFromFile(fileName) {
    let data = fs.readFileSync(fileName).toString('utf-8');
    return data.split("\n");
}

function expandGalaxy(rows) {
    //vertically
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].indexOf('#') === -1) {
            rows.splice(i+1, 0, emptyRow);
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
            console.log('column empty', j);
            for (let k = 0; k < rows.length; k++) {
                console.log(rows[k]);
                let row = rows[k];
                let newRow = [row.slice(0, j), '.', row.slice(j)].join('');
                rows.splice(k, 1, newRow);
            }
            j++;
        }
    }

    fs.writeFile('expandedGalaxy.txt', rows.join('\n'), (err) => {
        // In case of an error throw err.
        if (err) throw err;
    })
}

const rows = linesFromFile('input.txt');
expandGalaxy(rows);


