const fs = require("fs")

const storeFile = './filestore/simpleStore.json'
const fileEncoding = 'utf8'


const setValue = (key, value) => new Promise(async (resolve, reject) => {
  const allStore = await getValue()

  allStore[key] = value

  fs.writeFile(
    storeFile,
    JSON.stringify(allStore),
    "utf8",
    (err) => {
      err ? reject() : resolve(allStore[key])
    },
  )
})


const getValue = key =>
  new Promise((resolve, reject) => {
    fs.readFile(storeFile, fileEncoding,
      (err, data) => {
        if (err) { reject() } else {
          resolve(
            (key
              ? getParseFileContent(data)[key]
              : getParseFileContent(data)
            ),
          )
        }
      })
  })

function getParseFileContent(data) {
  try {
    return JSON.parse(data || '{}')
  } catch {
    return {}
  }
}

module.exports = { setValue, getValue }
