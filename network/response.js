exports.success = function (req, res, message, status) {
    let statusCode = status || 200;
    let statusMessage = message || '';

    res.redirect('/primeraPrueba');/*
    res.status(status).send({
        error: false,
        status: status,
        body: message,
    });*/
}

exports.error = function (req, res, message, status) {
    let statusCode = status || 500;
    let statusMessage = message || 'Internal server error';
    res.redirect('/');
    /*res.status(statusCode).send({
        error: false,
        status: status,
        body: message,
    });*/
}
