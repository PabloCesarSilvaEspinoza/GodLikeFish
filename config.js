module.exports = {
    api:{
        port: process.env.API_PORT || 3000,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'sbLDR1gm8TxSEe3H7YFzqn9Wjh0oMVfK',
    },
    session:{
        secret: process.env.SECRET_SESION || 'b5fe93bdc369efdc4fd41b5e79bede4e5880a0f1',
    },
    cookie:{
        secret: process.env.SECRET_COOKIE || 'DQcbdR94myYkuVHCT2SGJLj6aZvNsopl',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql485.main-hosting.eu',
        user: process.env.MYSQL_USER || 'u871842413_Fish',
        password: process.env.MYSQL_PASSWORD || 'uOjds8_Hjans3',
        database: process.env.MYSQL_DB || 'u871842413_lmp',
    },
    mysqlp: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'Fish',
        password: process.env.MYSQL_PASSWORD || 'uOjds8_Hjans3',
        database: process.env.MYSQL_DB || 'lmsp',
    }
}