const axios = require("axios")

const SDK_VERSION = require("../package.json").version
const UNO_VERSION = "2.9.0"
const FUSELIBS_VERSION = "2.9.0"
const LAST_VERSION = "2.8.0"

async function getChangelog(url) {
    const request = await axios.get(url)
    const data = request.data
    const start = data.indexOf("<h3>", data.indexOf("<h2>Changes since"))
    const end = data.indexOf("</div>", start)
    return data.substring(start, end)
}

async function main() {
    const uno = await getChangelog(`https://github.com/fuse-open/uno/releases/tag/v${UNO_VERSION}`)
    const fuselibs = await getChangelog(`https://github.com/fuse-open/fuselibs/releases/tag/v${FUSELIBS_VERSION}`)
    console.log(`### [Install](https://www.npmjs.com/package/fuse-sdk)

\`\`\`
npm install fuse-sdk@${SDK_VERSION}
\`\`\`

### Changes since v${LAST_VERSION}

### Fuselibs ${FUSELIBS_VERSION}

<details>
<summary>Click to see the full changelog</summary>
${fuselibs}
</details>

### Uno ${UNO_VERSION}

<details>
<summary>Click to see the full changelog</summary>
${uno}
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
