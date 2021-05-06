module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        const VIEW = 'ver_Tarea';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }
    function get(id) {
        const VIEW = 'ver_Tarea';
        const CLAUSE = `WHERE idTarea = ?`;
        return store.get(VIEW, CLAUSE, id);
    }
    
    function insert(body) {
        const {
            cursoId, nombre, fechaSubida ,fechaLImite, horaLimite, descripcion
        } = body;
    
        const PROCEDURE = `CALL agregar_Tarea( 
            ${cursoId}, '${nombre}', '${fechaSubida}','${fechaLImite}','${horaLimite}','${descripcion}'
            )`
    
        return store.insert(PROCEDURE);
    }
    
    function update(body) {
        const {
            Id, cursoId, nombre, fechaSubida ,fechaLImite, horaLimite, descripcion
        } = body;
    
        const PROCEDURE = `CALL editar_Tarea( 
            ${Id},  ${cursoId}, '${nombre}', '${fechaSubida}','${fechaLImite}','${horaLimite}','${descripcion}'
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