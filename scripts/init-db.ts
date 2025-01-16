import {readFileSync} from "fs"
import {resolve, parse} from "path"
import type {Model} from "sequelize"
import _ from "lodash"
import {parse as parseCsv} from 'csv-parse/sync';

import {_syncPromise, sequelize, Book, Character, Printer} from "~/models"
import {removeDuplicateByKey} from "~/scripts/utils"

// Await previous sync
await _syncPromise

// Printers need to be deleted
const deletePrinters = [
  'Astwood, John',
  'Dover, Simon',
  'Harper, Thomas',
  'Leybourne, Robert',
  'Thompson, Mary',
  'Coe, Jane',
  'Hearne, Richard',
  'Mathewes, Augustine',
  'Okes, John',
  'Oulton, Richard',
  'Raworth, John',
  'Raworth, Ruth',
]

// *********************************************
// Utility
// *********************************************

/**
 * Read data from JSON file
 *
 * @param path
 */
const readData = (path: string): [] => JSON.parse(readFileSync(path, 'utf8'))

/**
 * Read data from CSV file
 *
 * @param path
 */
const readCSV = (path: string): [] => parseCsv(readFileSync(path, 'utf8'), {skipEmptyLines: true, columns: true})

/**
 * Bulk insert
 *
 * @param model
 * @param data
 * @param idKey
 * @param dataKey
 */
const bulkInsert = async (model: Model, data: [], idKey: string, dataKey: string | null = null): Promise<void> => {
  // Remove duplicate
  const uniqueList = removeDuplicateByKey(data, (dataKey === null ? '' : `${dataKey}.`) + idKey)
  // Batch
  const batch = []

  // Iterate through each piece of data
  for (let i = 0; i < uniqueList.length; i++) {
    // Insert a batch of 2000
    if (i && i % 2000 === 0) {
      // Bulk insert
      await model.bulkCreate(batch)
      // Clear batch
      batch.length = 0
    }

    // Add item to batch
    batch.push(dataKey === null ? uniqueList[i] : uniqueList[i][dataKey])
  }

  // Bulk insert the last batch
  await model.bulkCreate(batch)
}

/**
 * Get lastname from name
 *
 * @param name
 */
const getLastname = (name: string): string => {
  // Get part that contains lastname
  const part = name.split(/\s*\(/)[0].split(/\s*,\s*/)[0]
  // Split by space
  const segments = part.split(/\s/)
  // Get last index
  const last = segments.length - 1

  return segments[last].startsWith('(') ? segments[last - 1] : segments[last]
}

// *********************************************
// Preprocessor
// *********************************************

/**
 * Process character web-url
 *
 * @param character
 */
const processWebUrl = (character: { web_url: string }): void => {
  // Split slash (/) and only get the last 5 elements
  const segments = character['web_url'].split('/').slice(-5)
  // First element will be file name, parse it, get name only, attach the .jpg extension and replace
  segments[0] = parse(segments[0]).name + '.jpg'
  // Add IIIF host (if in development, using routeRules to avoid CORS)
  segments.unshift(_.trimEnd(process.env.APP_ENV === 'development' ? process.env.API_BASE_URL : process.env.IIIF_HOST, '/'), 'iiif//page_images')

  // Replace old link with new link
  character['web_url'] = segments.join('/')
}

/**
 * Process character character_class
 *
 * @param character
 */
const processCharacterClass = (character: { character_class: string, character_group: string }): void => {
  // Split original character_class by _ (underscore)
  const segments = character['character_class'].split('_')

  // Assign first segment as new character_class
  character['character_class'] = segments[0]
  // Assign second segment as character_group
  character['character_group'] = segments[1]
}

/**
 * Process character group_label
 *
 * @param character
 */
const processCharacterGroupLabel = (character: { group_id: string, group_label: string }): void => {
  character['group_label'] = printerMap[character['group_id']]['printer_string']
}

/**
 * Process character unique_id
 *
 * @param character
 */
const processUniqueID = (character: { group_label: string, character_class: string, book_id: string }): void => {
  // Get corresponding book
  const book = bookMap[character['book_id']]['book_data']

  // Get printer lastname
  const printerLastname = _.capitalize(getLastname(character['group_label']).toLowerCase())
  // Get character class
  const characterClass = character['character_class']
  // Get date
  const date = book['pq_year_early']

  // Create cite
  const cite = `${printerLastname}_${characterClass}${date}`
  // Init cite occurrence
  if (!Object.hasOwn(citeOccurrence, cite)) citeOccurrence[cite] = 1
  // Get cite index
  const citeIndex = `${citeOccurrence[cite]++}`.padStart(3, '0')

  // Create unique_id
  character['unique_id'] = `${cite}.${citeIndex}`
}

/**
 * Process character sequence
 *
 * @param character
 */
const processSequence = (character: { sequence: number }): void => {
  character.sequence = _.random(1, 500000)
}

/**
 * Process printer years
 * @param character
 */
const processPrinterYears = (character: { book_id: string, group_id: string }): void => {
  // Get book
  const book = bookMap[character['book_id']]['book_data']
  // Get printer
  const printer = printerMap[character['group_id']]

  // Set printer years
  printer.pq_year_early = Math.min(printer.pq_year_early ?? 2000, book.pq_year_early)
  printer.pq_year_late = Math.max(printer.pq_year_late ?? 0, book.pq_year_late)
}

// *********************************************
// Main
// *********************************************

// Import cdt_printers.csv
const printers = readCSV(resolve('dldt_data/cdt_printers.csv'))

// Construct printer map
const printerMap = {}
// Iterate through each printer and map id to entry
printers.map(printer => printerMap[printer['group_id']] = printer)

// Import books.json
const books = readData(resolve('dldt_data/books.json'))
// Import books.json to database
await bulkInsert(Book, books, 'id', 'book_data')

// Mapping book entry for fast access
const bookMap = {}
// Iterate through each book and map id to entry
books.map((book) => bookMap[book.book_id] = book)

// Cite occurrence
const citeOccurrence = {}
// Import extracted_character_data.json
const characters = readData(resolve('dldt_data/extracted_character_data.json'))
// Loop and process IIIF link
for (const character of characters) {
  // Process IIIF image link
  processWebUrl(character)
  // Process character class
  processCharacterClass(character)
  // Process group label
  processCharacterGroupLabel(character)
  // Process unique ID
  processUniqueID(character)
  // Process sequence
  processSequence(character)
  // Process printer years
  processPrinterYears(character)
}

// const t = deletePrinters.filter(p => printers.some(printer => printer.printer_string === p))
// console.warn(deletePrinters.filter(p => t.indexOf(p) === -1))
// Import extracted_character_data.json
await bulkInsert(
  Character,
  characters.filter(character => deletePrinters.indexOf(character.group_label) === -1),
  'char_id'
)
// Import cdt_printers.csv to database
await bulkInsert(
  Printer,
  printers.filter(printer => deletePrinters.indexOf(printer.printer_string) === -1),
  'group_id'
)
// console.warn(await Character.findAll({ where: { group_label: 'Newcomb, Thomas, Jr.' }, raw: true}))
// Log
console.warn('Database has been initialized.')
