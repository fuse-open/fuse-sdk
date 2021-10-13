const fs = require("fs");
const path = require("path");

const json = fs.readFileSync(path.join(__dirname, "..", "package.json"));
const package = JSON.parse(json);

// https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
function isAllowed(version) {
    return version.startsWith("~") ||
            !isNaN(version[0]) ||
            version.startsWith("https://");
}

let failed = 0;

for (let name in package.dependencies) {
    if (!isAllowed(package.dependencies[name])) {
        console.error(`package.json: The version number of ${name} must start with ~ or a number`);
        failed++;
    }
}

if (failed) {
    console.log("\nWe want to upgrade only patch versions of Uno, Fuselibs and other dependencies.");
    console.log("Minor version upgrades require a new Fuse SDK release to be made.");
}

process.exit(failed);
