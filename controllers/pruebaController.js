//todo lo que requieras va aqui
// ejemplo: la base de datos (pool), bcrypt, helpers, etc.
const procedimiento = require('../database/procedimientosInicio');

//aqui se exportan las funciones 
module.exports = {
    postPrimeraPrueba: async function(req, res, next){
        res.render('prueba/primeraPrueba',{
            nombrePagina:"Primera Prueba",
            descripcion:"Esta pagina te debe servir de guia, aqui podras ver como enviar y recibir elementos implementando las variables.",
            img1:"../../assets/images/big/img4.jpg",
            img2:"../../assets/images/big/img5.jpg",
            img3:"../../assets/images/big/img6.jpg",
            card:{
                titulo:"Ejemplo de titulo",
                tituloParteDos:" es facil de hacer",
                descripcionCard:"Aqui vendria la descripcion de la tarjeta, card, etc."
            }
        });
    },
    postSegundaPrueba: async function(req, res, next){
        res.render('prueba/segundaPrueba',{
            datatables:true,
            nombrePagina:"Segunda Prueba",
            descripcion:"Esta pagina muestra como controlar el contenido que queremos mostrar u ocultar.",
            //cambia el siguiente valor a flase y ve como funciona
            administrador: true,
        });
    },
    postTerceraPrueba: async function(req, res, next){
        res.render('prueba/terceraPrueba',{
            datatables:true,
            nombrePagina:"Tercera Prueba",
            descripcion:"Esta pagina muestra como llenar una datatable con un each.",
            //cambia el siguiente valor a flase y ve como funciona
            administrador: true,
            usuarios:[
                {
                    nombre:"Tiger Nixon",
                    position:"System Architect",
                    office:"Edinburgh",
                    age:"22",
                    startDate:"2011/04/25",
                    salary:"$320,800"
                },
                {
                    nombre:"Tiger Nixon",
                    position:"System Architect",
                    office:"Edinburgh",
                    age:"22",
                    startDate:"2011/04/25",
                    salary:"$320,800"
                },
                {
                    nombre:"Tiger Nixon",
                    position:"System Architect",
                    office:"Edinburgh",
                    age:"22",
                    startDate:"2011/04/25",
                    salary:"$320,800"
                },
                {
                    nombre:"Tiger Nixon",
                    position:"System Architect",
                    office:"Edinburgh",
                    age:"22",
                    startDate:"2011/04/25",
                    salary:"$320,800"
                },
                {
                    nombre:"Tiger Nixon",
                    position:"System Architect",
                    office:"Edinburgh",
                    age:"22",
                    startDate:"2011/04/25",
                    salary:"$320,800"
                },
                {
                    nombre:"Tiger Nixon",
                    position:"System Architect",
                    office:"Edinburgh",
                    age:"22",
                    startDate:"2011/04/25",
                    salary:"$320,800"
                },
                {
                    nombre:"Tiger Nixon",
                    position:"System Architect",
                    office:"Edinburgh",
                    age:"22",
                    startDate:"2011/04/25",
                    salary:"$320,800"
                }
            ]
        });
    },
};