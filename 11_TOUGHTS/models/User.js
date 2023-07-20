import DataTypes from 'sequelize';
import db from '../db/conn.js';


//User


const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
});


export default User;