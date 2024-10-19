import {sequelize, Book, Character} from "~/models";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import type {Model} from "sequelize";
import {removeDuplicateByKey} from "~/scripts/utils";

// Sync
await sequelize.sync({force: true, alter: true});

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

// Import books.json
await bulkInsert(Book, readData(resolve('dldt_data/books.json')), 'id', 'book_data')
// Import extracted_character_data.json
await bulkInsert(Character, readData(resolve('dldt_data/extracted_character_data.json')), 'char_id')
