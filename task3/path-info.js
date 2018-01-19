const fs = require('fs');

function getObjectType(stats) {
    if (stats.isFile()) {
        return "file";
    }
    if (stats.isDirectory()) {
        return "directory";
    }
}

function pathInfo(path, callback) {
    fs.stat(path, (err, stats) => {
        if (err) {
            callback(err, null);
            return;
        }
        const result = { path, type: getObjectType(stats) };
        if (result.type == "file") {
            fs.readFile(path, "utf8", (err, contents) => {
                if (err) {
                    callback(err);
                    return;
                }
                result.content = contents;
                callback(null, result);
            });
        }
        if (result.type == "directory") {
            fs.readdir(path, "utf8", (err, files) => {
                if (err) {
                    callback(err);
                    return;
                }
                result.childs = files;
                callback(null, result);
            });
        }
    });
}

module.exports = pathInfo;