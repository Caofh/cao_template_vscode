
const path = require('path');

const util = {
  getExtensionFileAbsolutePath: function (context, relativePath) {
    return path.join(context.extensionPath, relativePath);
  }
}


module.exports = util