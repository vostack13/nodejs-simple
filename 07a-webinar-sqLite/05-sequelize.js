const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:./db/chinook.db');
const Project = sequelize.define('project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
});
sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // create();
    find();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

async function create() {
  return await sequelize.models.project.create({
    title: 'test',
    description: 'testing',
  });
}

async function find() {
  const data = await sequelize.models.project.findAll();
  console.log(data[0].dataValues);
}
