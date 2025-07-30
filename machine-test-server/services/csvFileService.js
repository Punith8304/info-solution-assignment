import csv from "csv-parser"
import fs from "fs"



//reading csv file which was uploaded to node 
export const csvFileRead = async (path) => {
    const results = []
    return new Promise((resolve, reject) => {
        try {
            //reading the csv file
            fs.createReadStream(path)
                .pipe(csv())
                .on('data', (data) => {

                    //pushing the data row by row into the results array 
                    results.push(data)
                })
                .on('end', () => {

                    //deleting the stored file which is unnecessary after reading data
                    fs.unlinkSync(path)
                    resolve({results, fileUpload: true})
                });
        } catch (error) {
            reject({error, fileUpload: false})
        }
    })
}