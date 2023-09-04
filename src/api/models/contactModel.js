const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('../../common/database/postgres')

class Contact extends Model { }

Contact.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    linkPrecedence: {
        type: DataTypes.STRING,
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    sequelize,
    tableName: 'contact'
})

module.exports = Contact