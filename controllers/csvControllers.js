const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");

exports.getCsvData = async () => {
    return new Promise((resolve, reject) => {
        const path_to_csv = './components/generated.csv';
        let data = [];
        let headers = [];
        let response = [];

        fs.createReadStream(path_to_csv)
            .pipe(parse({ delimiter: "," }))
            .on("data", function (row) {
                data.push(row);
                //console.log(row);
            })
            .on("close", function () {
                headers = data.shift();
                //console.log(headers)
                headers[0] = headers[0].replace(/\uFEFF/, '')
                for (let row of data) {
                let tempData = Object.assign.apply({}, headers.map((v, i) => ({
                        [v]: row[i] ? row[i].toString().trim() : null
                    })
                    ));
                
                
                response.push(tempData);

                }

                // console.log("finished");
                // console.log(response);
                resolve(response);
            })
            .on("error", function (error) {
                console.log(error.message);
                reject(error);
            });

    });
}

exports.updateCsvData = async (data) => {
    return new Promise((resolve, reject) => {

    if (!data || !data.fileData || data.fileData.length == 0) {
        reject('Invalid Data');
    }
    const fileData  = data.fileData;

    const columns = Object.keys(fileData[0]);
    const path_to_csv = './components/generated.csv';

    const writableStream = fs.createWriteStream(path_to_csv);
    const stringifier = stringify({ header: true, columns: columns });

    for(let row of fileData) {
        stringifier.write(row);
    }
    stringifier.pipe(writableStream).on('close', () => {
        resolve(true);
    }).on('error', (err) => {
        reject(err);
    });

    resolve(true)
});
}
