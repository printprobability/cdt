import {Book, Character} from "~/models";
import {Op} from "sequelize";

type CharacterQuery = {
  sort: boolean,
  limit: number,
  offset: number,
  pq_year_early: number,
  pq_year_late: number,
  printer_like: string | undefined,
  character_class: string | undefined,
  group_id: string | undefined,
  book: string | undefined,
}

export default defineEventHandler(async (event): Promise<[]> => {
  // Get query parameter
  const query: CharacterQuery = getQuery(event)
  // Find
  const {count, rows} = await Character.findAndCountAll({
    limit: query.limit,
    offset: query.offset,
    order: query.sort && ['character_class'],
    ...createFilter(query)
  })

  return {count, results: rows}
})

/**
 * Create filter
 *
 * @param query
 */
function createFilter(query: CharacterQuery): { where: object, include: [] } {
  // Create where clause
  const filter = {
    where: {},
    include: [{
      model: Book,
      where: {
        'pq_year_early': {[Op.gte]: query.pq_year_early},
        'pq_year_late': {[Op.lte]: query.pq_year_late},
      }
    }]
  }

  // Filter by book
  if (query.book) filter.where['book_id'] = query.book
  // Filter by character_class
  if (query.character_class) filter.where['character_class'] = query.character_class
  // Filter by group_id
  if (query.group_id) filter.where['group_id'] = query.group_id
  // Filter by printer
  if (query.printer_like) filter.where['$book.pp_printer$'] = {[Op.like]: `%${query.printer_like}%`}

  return filter
}
