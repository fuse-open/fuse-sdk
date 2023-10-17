const axios = require("axios")

const SDK_VERSION = require("../package.json").version
const UNO_VERSION = "3.0.0-beta.10"
const FUSELIBS_VERSION = "3.0.0-beta.9"
const LAST_VERSION = "2.9.0"

async function getChangelog(url) {
    const request = await axios.get(url)
    const data = request.data
    const start = data.indexOf("<h3>", data.indexOf("<h2>Changes since"))
    const end = data.indexOf("</div>", start)
    return data.substring(start, end)
}

/** Returns a list of patch versions, e.g. 2.9.2 => [2.9.2, 2.9.1, 2.9.0] */
function getPatchVersions(version) {
    const versions = [version]
    const versionParts = version.split(".")
    const patchParts = versionParts[2].split("-")

    for (let patch = Number.parseInt(patchParts[0]); --patch >= 0;) {
        patchParts[0] = patch.toString()
        versionParts[2] = patchParts.join("-")
        versions.push(versionParts.join("."))
    }

    return versions
}

async function main() {
    const uno = await Promise.all(getPatchVersions(UNO_VERSION).map(v => getChangelog(`https://github.com/fuse-open/uno/releases/tag/v${v}`)))
    const fuselibs = await Promise.all(getPatchVersions(FUSELIBS_VERSION).map(v => getChangelog(`https://github.com/fuse-open/fuselibs/releases/tag/v${v}`)))
    console.log(`### [Install](https://www.npmjs.com/package/fuse-sdk)

\`\`\`
npm install fuse-sdk@${SDK_VERSION}
\`\`\`

### Changes since v${LAST_VERSION}

### Fuselibs ${FUSELIBS_VERSION}

<details>
<summary>Click to see the full changelog</summary>
${fuselibs.join("\n\n")}
</details>

### Uno ${UNO_VERSION}

<details>
<summary>Click to see the full changelog</summary>
${uno.join("\n\n")}
</details>`)
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
