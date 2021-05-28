const mysql = require('mysql');
const config = require('../config');

let connection;


function handleConn() {
    connection = mysql.createConnection(config.mysqlp);
    connection.connect((err) => {
        if(err){
            console.log('DB ERROR', err);
            setTimeout(handleConn, 2000);
        } else {
            console.log('DB Conexión exitosa');
        }
    });

    connection.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConn()
        } else {
            handleConn();
        }
    });
}

function list(view, clause = '', value) {
    return new Promise ( (resolve, reject ) => {
        connection.query(`SELECT * FROM ${view} ${clause}`, value, (err, data) => {
            if(err) {
                return reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

function get(view, clause = '', value) {
    return new Promise ( (resolve, reject ) => {
        connection.query(`SELECT * FROM ${view} ${clause}`, value, (err, data) => {
            if(err) {
                return reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

function update(procedure) {
    return new Promise ( (resolve, reject ) => {
        connection.query(procedure, (err, data) => {
            if(err) {
                return reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

function insert(procedure) {
    return new Promise ( (resolve, reject ) => {
        connection.query(procedure, (err, data) => {
            if(err) {
                return reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

function catalog(view) {
    return new Promise ( (resolve, reject ) => {
        connection.query(view, (err, data) => {
            if(err) {
                return reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

module.exports = handleConn();
module.exports = {
    list,
    get,
    update,
    insert,
    catalog,
}