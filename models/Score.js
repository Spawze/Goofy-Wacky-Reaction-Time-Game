const { Model, DataTypes } = require('sequelize')
const sequelizeConnection = require('../config/connection')

class Score extends Model {}

Score.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelizeConnection,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'score',
    }
)

module.exports = Score;