const defaultValues = {
  client: 'pg',
  debug: true,
  connection: {
    port:     process.env.DB_PORT,
    host:     process.env.DB_HOST,
    database: process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/database/migrations`,
  },
}

const environments = {
  test: {
    ...defaultValues,
    debug: false,
    connection: {
      port:     5432,
      host:     'db',
      database: 'postgres',
      user:     'postgres',
      password: 'postgres12345678',
    },
    seeds: {
      directory: `${__dirname}/database/seeds`,
    },
  },
  development: {
    ...defaultValues,
    seeds: {
      directory: `${__dirname}/database/seeds`,
    },
  },
  production: {
    ...defaultValues,
    debug: false,
  },
}

module.exports = environments
