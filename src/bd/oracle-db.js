var oracledb = require('oracledb');

var mypw = "1234"

var connection

// Conectar a la BD Oracle
async function connect() {
    try {
        connection = await oracledb.getConnection({
            user: "SYSTEM",
            password: mypw,
<<<<<<< HEAD
            connectString: "localhost/orclpdb"
=======
            connectString: "localhost/XE"
>>>>>>> MODULO VENTA
        });
        console.log("Connected");

        return

    } catch (err) {
        console.error(err);
    }
}

async function close() {
    console.log("Closed");
    connection.close()
}

module.exports = {
    connect: async () => {
        await connect()
    },
    execute: (sql, params, callback) => {
        return connection.execute(sql, params, callback)
    },
    executeOptions: (sql, params, options, callback) => {
        return connection.execute(sql, params, options, callback)
    },
    executeMany: (sql, binds, options, callback) => {
        return connection.executeMany(sql, binds, options, callback)
    },
    close: async () => {
        await close();
    }
}