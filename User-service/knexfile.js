require("dotenv").config();

const {
  MYSQL_ROOT_PASSWORD,
  MYSQL_DB,
  DB_SOCKET_CONNECTION_STRING,
} = process.env;

let connectionParams = {
  user: "root",
  password: "",
  database: "users_test",
};;

if(process.env.NODE_ENV === "production") {
  connectionParams = {
    user: "root",
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQL_DB,
    socketPath: DB_SOCKET_CONNECTION_STRING
  };
};

module.exports = {
  client: "mysql",
  connection: connectionParams,
  migrations: {
    tableName: "migrations"
  }
}