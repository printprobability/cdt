import {resolve} from 'path'
import {Sequelize} from 'sequelize'

import book from './book'
import character from './character'

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
export const _syncPromise = (async () => await sequelize.sync())();
