import bigml from 'bigml';
import fs from 'fs';
import csv from 'csv';
import passwd from "../passwd";


fs.readFile('./data/eval.csv', function (err, headerData) {
    let headers = [];
    csv.parse(headerData, {from: 1, to: 1}, (err, rows) => {
        rows.forEach(c => {
            headers = [...c];
        });
        fs.readFile('./data/eval.csv', function (err, rowData) {
            csv.parse(rowData, {from: 2}, (err, rows) => {
                let evalData = [];
                rows.forEach((row) => {
                    let obj = {};
                    row.forEach((c, index) => obj[headers[index]] = c);
                    let newRow = {vars: obj, value: obj['ARR_DELAY']};
                    delete newRow.vars['ARR_DELAY'];
                    evalData.push(newRow);
                });

                let connection = new bigml.BigML(passwd.bigmlUsername, passwd.bigmlApiKey);
                let deepnet = new bigml.LocalDeepnet('deepnet/5a5df83feba31d2ec3001473', connection);
                evalData.forEach(r => {
                    deepnet.predict(r.vars, 0, function (error, data) {
                        console.log(`Predicted value: ${Math.ceil(data)} . Real value: ${r.value}. Difference; ${Math.ceil(data)-r.value}`);
                    });
                });

            });
        });
    });
});



