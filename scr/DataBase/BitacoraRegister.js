const fetch = require('node-fetch')
const { db } = require("./cnn");
const { token, baseURL } = require('../config');

async function addRegisterToBDD(resObj, access_token){
    
    const getUser = await fetch(`${baseURL}/profiles/me`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then(function(data) {return data.json();})
    .catch(function(error) {console.log(error);});

    const tempUser = await db.any('SELECT * FROM public.user WHERE id_user = $1', getUser.id)
    .then(function(data) {return data;})
    .catch(function(error) {console.log(error);}); 

    if( tempUser[0] === undefined){
        db.none('INSERT INTO public.user (id_user, display_name_user, email) VALUES($1, $2, $3)', [getUser.id, getUser.display_name, getUser.email])
        .then(() => { console.log('Successfull registered user');})
        .catch(error => { console.log(error);});
    }

    db.none('INSERT INTO public.operation_action (id_user, id_resource, type_resource, type_operation, graphql_operation) VALUES($1, $2, $3, $4, $5)',
    [getUser.id, resObj.id_resource, resObj.type_resource, resObj.type_operation, resObj.graphql_operation])
    .then(() => { console.log('Successfull registered operation');})
    .catch(error => { console.log(error);});
}

function prepareToBDD(info){
    return resObj = 
        {   id_resource: `${info[0]}`, 
            type_resource: `${info[1]}`, 
            type_operation: `${info[2]}`,
            graphql_operation: `${info[3]}`  }
}

exports.addRegisterToBDD = addRegisterToBDD;
exports.prepareToBDD = prepareToBDD;