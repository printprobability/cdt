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

  return character
})
