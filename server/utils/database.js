import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('loginDB', 'root', 'Cb06142001!!', {
    dialect: 'mysql',
    host: 'localhost',
});

export default sequelize;