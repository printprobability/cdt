import {Character} from "~/models";

type CharacterClass = {character_class: string}

export default defineEventHandler(async (event): Promise<CharacterClass[]> => {
  // Get query
  const query: {group: string|undefined} = getQuery(event)
  // Get filter value
  const filter = query.group ? `_${query.group}` : ''
  // Slice the end of string
  const slicer = (data: string, length) => length === 0 ? data : data.slice(0, 0 - length)

  return {
    results: (await Character.findAll({
      attributes: ['character_class'],
      group: 'character_class',
      raw: true
    }))
      .filter((m: CharacterClass) => m['character_class'].endsWith(filter))
      .map((m: CharacterClass) => ({
        label: slicer(m['character_class'], filter.length),
        charClass: m['character_class']
      }))
  }
})
