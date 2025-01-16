import {DataTypes, type Sequelize, type Model} from 'sequelize'

export default function (sequelize: Sequelize): Model {
  return sequelize.define(
    'book',
    {
      url: {type: DataTypes.STRING},
      id: {type: DataTypes.UUID, primaryKey: true},
      eebo: {type: DataTypes.NUMBER},
      label: {type: DataTypes.STRING},
      vid: {type: DataTypes.NUMBER},
      tcp: {type: DataTypes.STRING},
      estc: {type: DataTypes.STRING},
      zipfile: {type: DataTypes.STRING},
      zip_path: {type: DataTypes.STRING},
      pp_publisher: {type: DataTypes.STRING},
      pp_author: {type: DataTypes.STRING},
      pq_publisher: {type: DataTypes.STRING},
      pq_title: {type: DataTypes.STRING},
      pq_author: {type: DataTypes.STRING},
      pq_url: {type: DataTypes.STRING},
      pq_year_verbatim: {type: DataTypes.STRING},
      pq_year_early: {type: DataTypes.NUMBER},
      pq_year_late: {type: DataTypes.NUMBER},
      tx_year_early: {type: DataTypes.STRING},
      tx_year_late: {type: DataTypes.STRING},
      date_early: {type: DataTypes.DATE},
      date_late: {type: DataTypes.DATE},
      pdf: {type: DataTypes.STRING},
      cover_spread: {type: DataTypes.STRING},
      starred: {type: DataTypes.BOOLEAN},
      ignored: {type: DataTypes.BOOLEAN},
      is_eebo_book: {type: DataTypes.BOOLEAN},
      prefix: {type: DataTypes.STRING},
      repository: {type: DataTypes.STRING},
      pp_printer: {type: DataTypes.STRING},
      colloq_printer: {type: DataTypes.STRING},
      pp_notes: {type: DataTypes.STRING},
    },
    {
      indexes:[
        {fields: ['pq_year_early', 'pq_year_late']}
      ]
    }
  )
}
