const uno = require("@fuse-open/uno")

uno(process.argv.slice(2))
    .then(process.exit)
