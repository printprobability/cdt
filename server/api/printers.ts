import {Printer} from "~/models";

export default defineEventHandler(async (event): Promise<string[]> => {
  return {
    results: (await Printer.findAll({
      attributes: ['printer_string'],
      group: 'printer_string',
      order: [['printer_string', 'ASC']],
      raw: true
    }))
      .map((m: { printer_string: string }) => m['printer_string'])
  }
})
