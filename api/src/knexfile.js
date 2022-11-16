module.exports = {
  development: {
    client: 'pg',
    debug: true,
    connection: {
      host:     process.env.DB_HOST,
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    },
  },
}
