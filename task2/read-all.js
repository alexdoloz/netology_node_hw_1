const fs = require('fs');
const path = require('path');
const { read } = require('../task1/file-promise');

module.exports = (directory) => {
    return new Promise((resolve, reject) => {
        fs.readdir(directory, "utf8", (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            Promise.all(
                files.map(name => read(path.join(directory, name)))
            ).then(allContents => {
                const result = allContents.map((content, index) => {
                    return {
                        name: files[index],
                        content: content
                    };
                });
                resolve(result);
            }).catch(readErr => reject(readErr))
        });
    });
};

