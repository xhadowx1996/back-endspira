import Sequelize, { DATE } from 'sequelize'
import sequelize from '../database/connection'

const Curso = sequelize.define('curso', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    intesidad_horaria : {
        type: Sequelize.INTEGER
    },
    descripcion: {
        type: Sequelize.TEXT
    }
},{
    timestamps: false,
    freezeTableName: true
})

export default Curso