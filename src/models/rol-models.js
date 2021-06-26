import Sequelize, { DATE } from 'sequelize'
import sequelize from '../database/connection'

const Rol = sequelize.define('rol', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.TEXT
    }
},{
    timestamps: false,
    freezeTableName: true
})

export default Rol