const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('type', {
        id: {
            // type: DataTypes.UUID,
            // defaultValue: DataTypes.UUIDV4,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, { timestamps: false });
};