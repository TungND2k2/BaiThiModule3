const fs = require('fs');

const _handle = {}

_handle.getTemplate = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath,'utf8', (err, data) => {
            if (err) {
                reject(err.message)
            }
            resolve(data)
        })
    })
}

module.exports = _handle;