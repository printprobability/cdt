import {DataTypes, type Sequelize, type Model} from 'sequelize'

export default function (sequelize: Sequelize): Model {
  return sequelize.define(
    'printer',
    {
      printer_string: {type: DataTypes.STRING},
      // printer_shortname: {type: DataTypes.STRING},
      // notes: {type: DataTypes.STRING},
      // books_on_workbench: {type: DataTypes.DATE},
      // workbench_set: {type: DataTypes.STRING},
      // export_cdt: {type: DataTypes.STRING},
      group_id: {type: DataTypes.UUID, primaryKey: true},
    }
  )
}
