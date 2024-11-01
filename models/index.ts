import {join, resolve} from 'path'
import {Sequelize} from 'sequelize'
import {readdirSync} from 'fs'

import book from './book'
import character from './character'

// ********************************
// Implement
// ********************************

// Extension folder
const EXT_FOLDER = resolve('models', 'ext', process.platform)

// ********************************
// Implement
// ********************************

// Create sequelize object
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: resolve('database.sqlite')
})

// Create model
export const Book = book(sequelize)
export const Character = character(sequelize)

// Relations
Book.hasMany(Character, {foreignKey: 'book_id', onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
Character.belongsTo(Book, {foreignKey: 'book_id', onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})

// Sync
export const _syncPromise = (async () => {
  // Check if hard-sync
  if (process.argv?.includes('--hard-sync')) return await sequelize.sync({force: true})

  try {
    // Sync
    await sequelize.sync()
    // Get connection
    // const connection: {
    //   loadExtension: (file: string, cb: () => void) => void
    // } = (await sequelize.connectionManager.getConnection())
    // // Get all extension in ./ext
    // readdirSync(EXT_FOLDER).forEach((file) => connection.loadExtension(join(EXT_FOLDER, file), () => console.log(`Installed: ${file}`)))
  } catch (error) {
    console.error(error)
  }
})();
