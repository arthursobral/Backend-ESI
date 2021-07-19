// Não esquece de mudar o banco para qual vc ta usando
module.exports = {
  client: 'postgresql',
  connection: {
    database: 'trabalho4',
    user:     'postgres',
    password: '123'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
