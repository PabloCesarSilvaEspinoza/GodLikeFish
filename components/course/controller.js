module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        const VIEW = 'verDatosCursos';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }

    function get(id) {
        const VIEW = 'verDatosCursos';
        const CLAUSE = `WHERE \`ID\` = ${id}`;
        return store.get(VIEW, CLAUSE);
    }

    
    return {
        list,
        get,
    };
}