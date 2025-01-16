import {get} from "https"
import {createWriteStream, unlink, existsSync, mkdirSync} from "fs"
import {basename, resolve, join, parse} from "path"
import {exec} from "child_process"

// ***************************************
// Constants
// ***************************************

// SQLite Extension URL
const EXT_URL: string[] = [
  'https://raw.githubusercontent.com/sqlite/sqlite/refs/tags/vesion-3.45.1/ext/misc/spellfix.c'
]
// Temp folder path
const TEMP_FOLDER: string = resolve('temp')
// Ext folder path
const EXT_FOLDER: string = resolve('models', 'ext')

// ***************************************
// Function
// ***************************************

/**
 * Download file from url and execute callback after download is finished
 *
 * @param url
 * @param cb
 */
const download = (url: string, cb: (file: string) => void = () => null): void => {
  // Destination
  const dest = resolve('temp', basename(url))
  // Create file base on url
  const file = createWriteStream(dest)

  // Download
  get(url, res => {
    // Write to file
    res.pipe(file)
    // On finished, call cb
    file.on('finish', () => console.log(`Download successfully: ${url}`) || file.close(() => cb(dest)))
  }).on("error", err => console.error(`Can not download ${url}`) || console.error(err) || unlink(dest))
}

/**
 * Compile file with gcc
 *
 * @param file
 */
const compile = (file: string) => {
  // Expand EXT_FOLDER based on platform
  const platformExtFolder = join(EXT_FOLDER, process.platform)
  // Create subfolder if necessary
  if (!existsSync(platformExtFolder)) mkdirSync(platformExtFolder)

  // Output file name
  const output = `${parse(file).name}.${process.platform === "win32" ? 'dll' : 'so'}`
  // Compile command
  const command = `gcc -g${process.platform === "win32" ? '' : ' -fPIC'} -shared "${file}" -o "${join(platformExtFolder, output)}"`

  // Execute command
  exec(command, (error, stdout, stderr) => {
    // Log error
    if (error) return console.error(`Can not compile ${file}: ${stderr}`)

    // Notify
    console.log(`Compile successfully: ${output}`)
    // Remove downloaded file
    unlink(file, () => console.log(`Remove ${file}`))
  })
}

// ***************************************
// Main
// ***************************************

// Check if temp folder not exists
if (!existsSync(TEMP_FOLDER)) mkdirSync(TEMP_FOLDER)
// Check if ext dir not exists
if (!existsSync(EXT_FOLDER)) mkdirSync(EXT_FOLDER)

// Iterate through each url and execute
EXT_URL.forEach((url: string) => download(url, compile))