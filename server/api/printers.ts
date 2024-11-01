import {Character} from "~/models";

type Printer = string

export default defineEventHandler(async (event): Promise<Printer[]> => {
  return {
    results: (await Character.findAll({
      attributes: ['group_label'],
      group: 'group_label',
      order: [['group_label', 'ASC']],
      raw: true
    }))
      .map((m: { group_label: string }) => m['group_label'])
  }
})
