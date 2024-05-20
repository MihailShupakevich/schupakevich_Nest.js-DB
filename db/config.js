module.exports = {
  dialect: process.env.POSTGRES_DIALECT,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
};
