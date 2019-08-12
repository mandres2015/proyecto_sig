var oracledb = require('oracledb');
const SHA2 = require("sha2");
var mypw = "1234"

<<<<<<< HEAD
var connection;
=======
var connection
>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d

// Conectar a la BD Oracle
async function connect() {
    try {
        connection = await oracledb.getConnection({
            user: "SYSTEM",
            password: mypw,
            connectString: "localhost/XE"
        });
<<<<<<< HEAD
        console.log("DB Connected");
        return;
=======
        console.log("Connected");

        return

>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d
    } catch (err) {
        console.error(err);
    }
}

async function close() {
<<<<<<< HEAD
    console.log("DB Closed");
    connection.close();
}
async function commit(){
    console.log('commit exitoso');
    connection.commit();
=======
    console.log("Closed");
    connection.close()
>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d
}

module.exports = {
    connect: async () => {
<<<<<<< HEAD
        await connect();
    },
    execute: (sql, callback) => {
        return connection.execute(sql, callback);
    },
    insert: (sql, callback) => {
        return connection.execute(sql, { autoCommit: true }, callback);
=======
        await connect()
    },
    execute: (sql, params, callback) => {
        return connection.execute(sql, params, callback)
>>>>>>> c97c2ee50bccf9fe8f1ed05bdbb7b82fcd2d2b6d
    },
    executeOptions: (sql, params, options, callback) => {
        return connection.execute(sql, params, options, callback)
    },
    executeMany: (sql, binds, options, callback) => {
        return connection.executeMany(sql, binds, options, callback)
    },
    close: async () => {
        await close();
    },
    encrypt: (value) => {
        return SHA2["SHA-224"](value)
    }
}