import {readFileSync} from "fs"
import {resolve, parse} from "path"
import type {Model} from "sequelize"

import {_syncPromise, sequelize, Book, Character} from "~/models"
import {removeDuplicateByKey} from "~/scripts/utils"

// Await previous sync
await _syncPromise
// Sync
await sequelize.sync({force: true})

/**
 * Read data from JSON file
 *
 * @param path
 */
const readData = (path: string): [] => JSON.parse(readFileSync(path, 'utf8'))

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

// Import books.json to database
await bulkInsert(Book, readData(resolve('dldt_data/books.json')), 'id', 'book_data')

// Import extracted_character_data.json
const characters = readData(resolve('dldt_data/extracted_character_data.json'))
// Loop and process IIIF link
for (const character of characters) {
  // Split slash (/) and only get the last 5 elements
  const segments = (<string> character['web_url']).split('/').slice(-5)
  // First element will be file name, parse it, get name only, attach the .jpg extension and replace
  segments[0] = parse(segments[0]).name + '.jpg'
  // Add new IIIF address
  segments.unshift('http://printprobability.library.cmu.edu/iiif//page_images')

  // Replace old link with new link
  character['web_url'] = segments.join('/')
}
// Import extracted_character_data.json
await bulkInsert(Character, characters, 'char_id')

// Log
console.warn('Database has been initialized.')
