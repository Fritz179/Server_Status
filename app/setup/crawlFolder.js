const fs = require('fs');
const {join} = require('path')

module.exports = (directory = __dirname, onFile, path = '') => {
  fs.opendir(directory, async (err, dir) => {
    if (err) {
      console.log(directory, path);
      throw new Error(err)
    }

    for await (const dirent of dir) {
      if (dirent.isDirectory()) {
        module.exports(join(directory, dirent.name), onFile, join(path, dirent.name))
      } else if (dirent.isFile()) {
        onFile(join(path, dirent.name), join(directory, dirent.name))
      } else {
        console.log('unknown dirent:', dirent);
      }
    }
  })
}
