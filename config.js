module.exports = {
    api:{
        port: process.env.API_PORT || 3000,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql485.main-hosting.eu',
        user: process.env.MYSQL_USER || 'u871842413_Fish',
        password: process.env.MYSQL_PASSWORD || 'uOjds8_Hjans3',
        database: process.env.MYSQL_DB || 'u871842413_lmp',
    }
}