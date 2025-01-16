import {Character} from "~/models";

type CharacterClass = {character_class: string}

export default defineEventHandler(async (event): Promise<CharacterClass[]> => {
  // Get query
  const query: {group: string|undefined} = getQuery(event)

  return {
    results: (await Character.findAll({
      attributes: ['character_class'],
      where: {'character_group': query.group},
      group: 'character_class',
      raw: true
    }))
      .map((m: CharacterClass) => ({
        label: m['character_class'],
        charClass: `${m['character_class']}_${query.group}`
      }))
  }
})
