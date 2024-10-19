import {Book, Character} from "~/models";

export default defineEventHandler(async (event): Promise<[]> => {
  // Get route parameter
  const id: string = getRouterParam(event, 'id')
  // Get item
  const character = (await Character.findByPk(id, {include: [Book]}))

  if (character === null) throw createError({
    statusCode: 400,
    statusMessage: 'Not found!',
  })

  // Set cite_as
  character.setDataValue('cite_as', `${character.character_class}${character.book.pp_printer}${(Math.random() + 1).toString(36).substring(8)}`)

  return character
})
