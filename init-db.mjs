import {resolve} from "path"
import {existsSync, openSync, closeSync, readFileSync, unlinkSync} from "fs"
import Database from 'better-sqlite3'
import {da} from "vuetify/locale";

// **************************************************************
// Config
// **************************************************************

// Force script execution
const FORCE_EXECUTION = true
// Number of records of bulk insert
const BULK_INSERT_SIZE = 2000

// **************************************************************
// Constant
// **************************************************************

// SQL type for 'id'
const SQL_ID = 'VARCHAR(36) PRIMARY KEY'
// SQL type for 'string'
const SQL_STRING = 'TEXT'
// SQL type for 'number'
const SQL_NUMBER = 'INT'
// SQL type for 'boolean'
const SQL_BOOLEAN = 'TINYINT'

// **************************************************************
// Utility
// **************************************************************

/**
 * Get value by key of object (support dot notation)
 *
 * @param {object} object
 * @param {string | null} by
 * @returns {*}
 */
const getByKey = (object, by = null) => {
  // If no key is provided, return the object
  if (by === null) return object
  // Split key by first dot
  const key = by.split(/(?<=^[^.]*)\./g)
  // Terminate condition
  if (key.length < 2) return object[key[0]]

  return getByKey(object[key[0]], key[1])
}

/**
 * Check if this type is valid
 *
 * @param {string} type
 * @returns {boolean}
 */
const isValidType = (type) => ['string', 'number', 'boolean'].includes(type)

/**
 * Get type of data
 *
 * @param {any} data
 * @returns {undefined|"boolean"|"number"|"string"}
 */
const getTypeOf = (data) => {
  // If data is null, consider it as a string
  if (data === null) return null
  // Get type of data
  const type = typeof data

  // If type is valid, return it
  if (isValidType(type)) return type
  else if (type === 'bigint') return 'number'

  return undefined
}

/**
 * Create new list with no duplicates
 *
 * @param {array} list
 * @param {string} by
 * @returns {array}
 */
const removeDuplicateByKey = (list, by) => {
  console.warn(list)
  // Output
  const output = []
  // Existence map
  const isExisted = {}
  // Iterate over list
  for (const item of list) {
    // Get id
    const id = getByKey(item, by)
    // Check if this item is existed, then skip it
    if (isExisted[id]) continue

    // Mark as existed
    isExisted[id] = true
    // Push to output
    output.push(item)
  }

  return output
}

// **************************************************************
// Main
// **************************************************************

// Get database file path
const databaseFile = resolve('database.sqlite')
// Check if force to execute script
if (FORCE_EXECUTION) unlinkSync(databaseFile)
// Check if file not exists
if (!existsSync(databaseFile)) {
  // Create file
  closeSync(openSync(databaseFile, 'w'))
}

/**
 * Analyze table schema based on real data
 *
 * @param {[]} data
 * @param {string} idKey
 * @param {string|null} dataKey
 * @returns {{[key:string]: 'id'|'string'|'number'|'boolean'}}
 */
const analyzeTableSchema = (data, idKey, dataKey = null) => {
  // Output
  const output = {}
  // Get the first piece of data
  const obj = getByKey(data[0], dataKey)

  // Iterate through each property
  for (let [key, value] of Object.entries(obj)) {
    // Check if this is an idKey
    if (key === idKey) {
      // Save type
      output[key] = 'id'
      // Continue to next key
      continue
    }

    // Save the type of this value
    let type = getTypeOf(value)

    // If type is truthy, save it and continue
    if (type) output[key] = type
    // Continue if type is not null
    if (type !== null) continue

    // Scan further (max is 100 objects)
    for (let i = 1; i < data.length; i++) {
      // Get data object
      const next = getByKey(data[i], dataKey)
      // Get the valid type of the key in the next piece of data
      type = getTypeOf(next[key])

      // Break if type is undefined
      if (type === undefined) break
      // Save type and fallback to 'string' if it is a null
      output[key] = type || 'string'
      // Break if type is truthy
      if (type) break
    }
  }

  return output
}

/**
 * Convert a type to SQL type
 *
 * @param {'id'|'string'|'number'|'boolean'} type
 * @returns {string}
 */
const convertToSQLType = (type) => {
  switch (type) {
    case 'id':
      return SQL_ID
    case 'number':
      return SQL_NUMBER
    case 'boolean':
      return SQL_BOOLEAN
    default :
      return SQL_STRING
  }
}

/**
 * Serialize a data to SQL data
 *
 * @param {'id'|'string'|'number'|'boolean'} type
 * @param {any} data
 * @returns {any}
 */
const serializeToSQLData = (type, data) => {
  if (data === null) return 'null'
  switch (type) {
    case 'number':
    case 'boolean':
      return data
    default :
      return `'${data.replace(/'/g, `''`)}'`
  }
}

/**
 * Build create query
 *
 * @param {string} name
 * @param {{[key:string]: 'string'|'number'|'boolean'}} schema
 * @returns {string}
 */
const buildCreateQuery = (name, schema) =>
  `CREATE TABLE ${name}(` +
  Object.entries(schema).map(([field, type]) => `${field} ` + convertToSQLType(type)).join(', ') +
  `);\n`

/**
 * Build bulk insert query
 *
 * @param {string} name
 * @param {{[key:string]: 'string'|'number'|'boolean'}} schema
 * @param {object[]} data
 * @param {string} dataKey
 * @returns {*}
 */
const buildBulkInsertQuery = (name, schema, data, dataKey = null) => {
  // Table fields
  const fields = Object.keys(schema)
  // Base of insert query
  let insertBase = `INSERT INTO ${name}(${fields.join(', ')}) VALUES `
  // Query
  let query = insertBase
  // VALUES segments
  const valuesSegments = []

  // Iterate through each object in data
  for (let i = 0; i < data.length; i++) {
    // Check if [valuesSegments] reach 2000 items, then
    if (i && i % BULK_INSERT_SIZE === 0) {
      // Apply VALUES to query and append new batch
      query += `${valuesSegments.join(', ')};\n${insertBase}`
      // Clear [valuesSegments]
      valuesSegments.length = 0
    }

    // Retrieve list of values from data object based on [fields]
    const valueSegment = fields.map(field => serializeToSQLData(schema[field], getByKey(data[i], dataKey)[field]))
    // Join [valueSegment] with comma to create a single VALUE statement and push to [valuesSegments]
    valuesSegments.push(`(${valueSegment.join(', ')})`)
  }

  return query + `${valuesSegments.join(', ')};\n`
}

const buildCreateForeignKeyQuery = (owner, owned, key, dataKey = null) => {}

/**
 * Analyze JSON file and create a SQL query
 *
 * @param {string} path
 * @param {string} tableName
 * @param {string} idKey
 * @param {string|null} dataKey
 * @returns {string}
 */
const analyzeJSONFile = (path, tableName, idKey, dataKey = null) => {
  // Get id dot notation
  const notation = (dataKey ? `${dataKey}.` : '') + idKey

  // Import data from JSON file
  const data = removeDuplicateByKey(JSON.parse(readFileSync(path, 'utf8')), notation)
  // Analyze data and retrieve table schema
  const schema = analyzeTableSchema(data, idKey, dataKey)

  return ''
    + buildCreateQuery(tableName, schema)
    + buildBulkInsertQuery(tableName, schema, data, dataKey)
}

// Query
let query = ''
  + analyzeJSONFile(resolve('dldt_data/books.json'), 'books', 'id', 'book_data')
  + analyzeJSONFile(resolve('dldt_data/extracted_character_data.json'), 'characters', 'char_id')

// Create database instance
const db = (new Database(databaseFile))
db.pragma('foreign_keys = ON');
db.exec(query)
console.warn(db.prepare('SELECT * FROM books').all().length)
