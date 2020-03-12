module.exports = {
  development: {
    // our DBMS driver
    client: 'sqlite3',
    // the location of our db
    connection: {
      filename: './data/database_file.db3'
    },
    // necessary when using sqlite3
    useNullAsDefault: true
  },
  migrations: {
    directory: './data/migrations'
  }
};
