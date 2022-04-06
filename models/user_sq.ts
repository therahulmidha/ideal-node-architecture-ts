import Sequelize from "sequelize";
import { sequelizeInstance } from "../database/pg_sequelize_connect";

export const UserSq = sequelizeInstance.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    password: Sequelize.STRING,
});
