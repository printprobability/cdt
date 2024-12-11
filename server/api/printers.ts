import {Printer} from "~/models";

export default defineEventHandler(async (event): Promise<string[]> => {
  // Get query parameter
  const query: {labelOnly: boolean|undefined} = getQuery(event)

  return {
    results: (await Printer.findAll({
      attributes: ['printer_string', 'pq_year_early', 'pq_year_late'],
      group: 'printer_string',
      order: [['printer_string', 'ASC']],
      raw: true
    }))
      .map((m: { printer_string: string }) => query.labelOnly ? m['printer_string'] : m)
  }
})
