module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    function list() {
        const VIEW = 'verUsuarios';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }

    function get(id) {
        const VIEW = 'verUsuarios';
        const CLAUSE = `WHERE \`ID\` = ${id}`;
        return store.get(VIEW, CLAUSE);
    }

    function insert(body) {
        if(!body.municipioNacimiento) {
            body.municipioNacimiento = null
        }
        
        const PROCEDURE = `CALL agregarUsuario( 
            '${body.correo}',
            '${body.password}',
            ${body.municipio},
            '${body.colinia}',
            '${body.calle}',
            ${body.numeroExt},
            ${body.numeroInt},
            '${body.nombres}',
            '${body.pApellido}',
            '${body.sApellido}',
            '${body.matricula}',
            '${body.tipo}',
            '${body.fechaNacimiento}',
            ${body.paisNacimiento},
            ${body.municipioNacimiento},
            '${body.area}',
            '${body.puesto}',
            ${body.antiguedad},
            '${body.tarjeton}',
            '${body.foto}'
            )`

        return store.insert(PROCEDURE);
    }

    function update(body) {
        const PROCEDURE = `CALL editarUsuario(
            ${body.id}, 
            '${body.correo}',
            '${body.password}',
            ${body.municipio},
            '${body.colinia}',
            '${body.calle}',
            ${body.numeroExt},
            ${body.numeroInt},
            '${body.nombres}',
            '${body.pApellido}',
            '${body.sApellido}',
            '${body.matricula}',
            '${body.tipo}',
            '${body.fechaNacimiento}',
            ${body.paisNacimiento},
            ${body.municipioNacimiento},
            '${body.area}',
            '${body.puesto}',
            ${body.antiguedad},
            ${body.activo},
            '${body.tarjeton}',
            '${body.foto}'
            )`
        
        return store.insert(PROCEDURE);
    }

    return {
        list,
        get,
        insert,
        update,
    };
}