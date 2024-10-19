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
      character_class: {type: DataTypes.STRING},
      created_by_run_id: {type: DataTypes.STRING},
      book_id: {type: DataTypes.STRING},
      x_min: {type: DataTypes.NUMBER},
      x_max: {type: DataTypes.NUMBER},
      y_min: {type: DataTypes.NUMBER},
      y_max: {type: DataTypes.NUMBER},
    },
    {
      indexes:[
        {fields: ['character_class']}
      ]
    }
  )
}
