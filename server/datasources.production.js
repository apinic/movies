module.exports = {
  db: {
    name: 'db',
    connector: 'postgresql',
    host: process.env.POSTGRESQL_HOST,
    username: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    ssl: true
  }
};
