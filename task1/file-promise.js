const fs = require('fs');

function read(path) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        }
    );
}

function write(path, content) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(path, content, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(path);
            });
        }
    );
}

module.exports = { read, write };