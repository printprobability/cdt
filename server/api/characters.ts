import {Book, Character, sequelize} from "~/models";
import {Op} from "sequelize";

type CharacterQuery = {
  sort: boolean,
  sort_by: 'data_asc' | 'date_desc'
  limit: number,
  offset: number,
  pq_year_early: number | string,
  pq_year_late: number | string,
  printer_like: string | undefined,
  character_class: string | undefined,
  group_id: string | undefined,
  book: string | undefined,
}

export default defineEventHandler(async (event): Promise<[]> => {
  // Get query parameter
  const query: CharacterQuery = getQuery(event)

  // Check if sorting random (based on sequence)
  if (!query.printer_like && !query.character_class && query.pq_year_early === '1644' && query.pq_year_late === '1715') {
    query.sort = 'false'
  }

  // Find
  const {count, rows} = await Character.findAndCountAll({
    limit: query.limit,
    offset: query.offset,
    order: query.sort === 'true'
      ? [
        ...query.sort_by ? [[Book, 'pq_year_early', query.sort_by === 'date_desc' ? 'DESC' : 'ASC']] : [],
        'character_group',
        'character_class'
      ] : [
        'sequence',
      ],

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
      },
    }]
  }

  // Filter by book
  if (query.book) filter.where['book_id'] = query.book
  // Filter by character_class
  if (query.character_class && query.character_class.length > 0) {
    // Split character_class
    const classInfo = query.character_class.split('_')

    // If classInfo has 2 item, assign the second one as 'character_group' filter
    if (classInfo.length > 1) filter.where['character_group'] = classInfo[1]
    // If classInfo only has 1 item, assign the first one as 'character_class' filter
    if (classInfo.length > 0) filter.where['character_class'] = classInfo[0]
  }
  // Filter by group_id
  if (query.group_id) filter.where['group_id'] = query.group_id
  // Filter by printer
  if (query.printer_like) filter.where['group_label'] = query.printer_like

  return filter
}
