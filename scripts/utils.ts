/**
 * Get value by key of object (support dot notation)
 *
 * @param {object} object
 * @param {string | null} by
 * @returns {*}
 */
export const getByKey = (object: object, by: string | null = null): any => {
  // If no key is provided, return the object
  if (by === null) return object
  // Split key by first dot
  const key = by.split(/(?<=^[^.]*)\./g)
  // Terminate condition
  if (key.length < 2) return object[key[0]]

  return getByKey(object[key[0]], key[1])
}

/**
 * Get Sequelize DataTypes of data
 *
 * @param data
 */
export const getDataTypesOf = (data: any): string | null | undefined => {
  // If data is null, consider it as a string
  if (data === null) return null

  // Check type and return DataType
  switch (typeof data) {
    case 'number':
      return 'DataTypes.NUMBER'
    case 'boolean':
      return 'DataTypes.BOOLEAN'
    case 'string':
      // Try to parse to Date
      return isNaN(Date.parse(data)) ? 'DataTypes.STRING' : 'DataTypes.DATE'
    default:
      return undefined
  }
}

/**
 * Capitalize string
 *
 * @param string
 * @returns {string}
 */
export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Create new list with no duplicates
 *
 * @param list
 * @param by
 */
export const removeDuplicateByKey = (list: [], by: string): [] => {
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
