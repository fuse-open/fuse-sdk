const fs = require("fs");
const path = require("path");

function findup(suffix) {
    for (let dir = __dirname, parent = undefined;;
             dir = path.dirname(dir)) {

        if (dir == parent)
            throw Error(`${suffix} was not found`);

        parent = dir;
        const file = path.join(dir, suffix);

        if (fs.existsSync(file))
            return file;
    }
}

function findNodeModule(name) {
    const package = findup(`node_modules/${name}/package.json`);
    return path.dirname(package);
}

function patchConfig(file) {
    const config = fs.readFileSync(file).toString();
    if (config.indexOf("IsRoot: false") > 0)
        return;

    // Load parent config (fuse-sdk).
    const relative = path.relative(process.cwd(), file);
    console.log(`patching ${relative}`);
    fs.appendFileSync(file, "\n// Load parent config");
    fs.appendFileSync(file, "\nIsRoot: false\n");
}

// Patch Uno config.
const uno = findNodeModule("@fuse-open/uno");
patchConfig(path.join(uno, ".unoconfig"));
