import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('loginDB', '*Insert SQL Database Username here*', '*Insert SQL Database password here*', {
    dialect: 'mysql',
    host: 'localhost',
});

export default sequelize;
