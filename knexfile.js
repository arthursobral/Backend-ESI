// Update with your config settings.
module.exports = {
  client: 'postgresql',
  connection: {
    database: 'trabalho4',
    user:     'postgres',
    password: '4526'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
