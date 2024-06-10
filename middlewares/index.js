const fs = require("fs");
function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}: ${rq.ip} ${rq.method} ${rq.path} New request made!\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
