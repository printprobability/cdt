import {resolve} from "path"
import {readFileSync, existsSync, mkdirSync, writeFileSync} from "fs"
import {EOL} from "os"
import {getByKey, getDataTypesOf} from "./utils"

// **************************************************************
// Main
// **************************************************************

/**
 * Analyze table schema based on real data
 *
 * @param data
 * @param idKey
 * @param dataKey
 */
const analyzeTableSchema = (data: [], idKey: string, dataKey: string | null = null): { [key: string]: string } => {
  // Output
  const output = {}
  // Get the first piece of data
  const obj = getByKey(data[0], dataKey)

  // Iterate through each property
  for (let [key, value] of Object.entries(obj)) {
    // Check if this is an idKey
    if (key === idKey) {
      // Save type
      output[key] = 'DataTypes.UUID'
      // Continue to next key
      continue
    }

    // Save the type of this value
    let type = getDataTypesOf(value)

    // If type is truthy, save it and continue
    if (type) output[key] = type
    // Continue if type is not null
    if (type !== null) continue

    // Scan further (max is 100 objects)
    for (let i = 1; i < data.length; i++) {
      // Get data object
      const next = getByKey(data[i], dataKey)
      // Get the valid type of the key in the next piece of data
      type = getDataTypesOf(next[key])

      // Break if type is undefined
      if (type === undefined) break
      // Save type and fallback to 'string' if it is a null
      output[key] = 'DataTypes.STRING'
      // Break if type is truthy
      if (type) break
    }
  }

  return output
}

/**
 * Analyze JSON file and return file schema
 *
 * @param path
 * @param idKey
 * @param dataKey
 */
const analyzeJSONFile = (path: string, idKey: string, dataKey: string | null = null): { [key: string]: string } => {
  // Import data from JSON file
  const data = JSON.parse(readFileSync(path, 'utf8'))
  // Analyze data and retrieve table schema
  return analyzeTableSchema(data, idKey, dataKey)
}

/**
 * Build model script
 *
 * @param modelName
 * @param schema
 * @param idKey
 */
const buildModelScript = (modelName: string, schema: string, idKey: string): string => [
  `import {DataTypes, type Sequelize, type Model} from 'sequelize'`,
  ``,
  `export default function (sequelize: Sequelize): Model {`,
  `  return sequelize.define(`,
  `    '${modelName}',`,
  `    {`,
  ...Object.entries(schema).map(([k, v]) => `      ${k}: {type: ${v}${idKey === k ? ', primaryKey: true' : ''}},`),
  `    }`,
  `  )`,
  `}`
].join(EOL)

// **************************************************************
// Args
// **************************************************************

// JSON file
const jsonFile = process.argv[2]
if (!jsonFile) {
  console.error("Error: Require JSON data file!")
  process.exit()
}

// Model name
const modelName = process.argv[3]
if (!modelName) {
  console.error("Error: Require model name!")
  process.exit()
}

// Id key
const idKey = process.argv[4]
if (!modelName) {
  console.error("Error: Require id key!")
  process.exit()
}

// Data key
const dataKey = process.argv[5] || null

// Get schema
const schema = analyzeJSONFile(resolve(jsonFile), idKey, dataKey)
// Build model script
const script = buildModelScript(modelName, schema, idKey)

// Get models folder path
const modelsFolder = resolve('models')
// Check if models folder exists
if (!existsSync(modelsFolder)) mkdirSync(modelsFolder)

// Model file
const modelFile = resolve(modelsFolder, `${modelName}.ts`)
// Write script
writeFileSync(modelFile, script, {flag: 'w+', encoding: 'utf-8'})

console.warn(`Model created successfully: ${modelFile}`)
