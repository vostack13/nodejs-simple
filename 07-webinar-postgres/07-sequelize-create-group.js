const Sequelize = require('sequelize')

const sequelize = new Sequelize('test', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const modelNames = ['Teacher', 'Group', 'Student']

for (const modelName of modelNames) {
  sequelize.import (`./models/${modelName}.js`)
}

for (const modelName of Object.keys(sequelize.models)) {
  if ('associate' in sequelize.models[modelName]) {
    sequelize
      .models[modelName]
      .associate(sequelize.models)
  }
}

async function createGroup() {
  for (let i = 1; i <= 3; i++) {
    let obj = {
      name: `Node-18${i}`
    }
    await sequelize
      .models
      .group
      .create(obj)
  }
}

createGroup()