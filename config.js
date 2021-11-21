module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || 'sbLDR1gm8TxSEe3H7YFzqn9Wjh0oMVfK',
    },
    session: {
        secret: process.env.SECRET_SESION || 'b5fe93bdc369efdc4fd41b5e79bede4e5880a0f1',
    },
    cookie: {
        secret: process.env.SECRET_COOKIE || 'DQcbdR94myYkuVHCT2SGJLj6aZvNsopl',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DB || 'lmsp',
    },
}