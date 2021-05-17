const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;
const error = require('../utils/error');

function sign(data){
    //console.log(data);
    return jwt.sign(data, secret);
}

function verify(token){
    return jwt.verify(token, secret);
}

const check = {
    Own: function(req, owner){
        const decoded = decodeHeader(req);
        console.log(decoded);
        //comprobar si es o no propio
        if(decoded.id !== owner){
            throw error('No puedes hacer esto', 401);
        }
    },
}

function getToken(auth){
    //Bearer sa2dk23ljf1akjslkjc213zwiojaslkasdlk1k213la
    if(!auth){
        throw new Error('No ha llegado el token');
    }

    if(auth.indexOf('Bearer ') === -1){
        throw new Error('Formato invalido');
    }

    let token = auth.replace('Bearer ', '');
    
    return token;
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded  = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};
