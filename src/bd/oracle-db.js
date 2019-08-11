var oracledb = require('oracledb');
<<<<<<< HEAD

oracledb.autoCommit = true; //para que se hagan los commits automaticamente en el crud

=======
const SHA2 = require("sha2");
>>>>>>> 1e498f347c49cc4ae8cc382e8107a2a6d7773c0c
var mypw = "1234"

var connection;

// Conectar a la BD Oracle
async function connect() {
    try {
        connection = await oracledb.getConnection({
            user: "SYSTEM",
            password: mypw,
            connectString: "localhost/XE"
        });
        console.log("DB Connected");
        return;
    } catch (err) {
        console.error(err);
    }
}

async function close() {
    console.log("DB Closed");
    connection.close();
}
async function commit(){
    console.log('commit exitoso');
    connection.commit();
}

module.exports = {
    connect: async () => {
        await connect();
    },
    execute: (sql, callback) => {
        return connection.execute(sql, callback);
    },
    insert: (sql, callback) => {
        return connection.execute(sql, { autoCommit: true }, callback);
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
<<<<<<< HEAD
    commit: async()=>{
        await commit();
=======
    encrypt: (value) => {
        return SHA2["SHA-224"](value)
>>>>>>> 1e498f347c49cc4ae8cc382e8107a2a6d7773c0c
    }
}