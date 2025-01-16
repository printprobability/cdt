import {DataTypes, type Sequelize, type Model} from 'sequelize'

export default function (sequelize: Sequelize): Model {
  return sequelize.define(
    'character',
    {
      group_id: {type: DataTypes.STRING},
      group_url: {type: DataTypes.STRING},
      group_label: {type: DataTypes.STRING},
      char_id: {type: DataTypes.UUID, primaryKey: true},
      web_url: {type: DataTypes.STRING},
      sequence: {type: DataTypes.NUMBER},
      character_class: {type: DataTypes.STRING},
      character_group: {type: DataTypes.STRING},
      created_by_run_id: {type: DataTypes.STRING},
      book_id: {type: DataTypes.STRING},
      x_min: {type: DataTypes.NUMBER},
      x_max: {type: DataTypes.NUMBER},
      y_min: {type: DataTypes.NUMBER},
      y_max: {type: DataTypes.NUMBER},
      unique_id: {type: DataTypes.STRING},
    },
    {
      indexes:[
        {fields: ['character_group', 'character_class']},
        {fields: ['group_label']},
        {unique: true, fields: ['unique_id']},
      ]
    }
  )
}
