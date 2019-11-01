const fetch = require('node-fetch')
const {buildResponse, setResponse, buildResponseDeleted} = require('./OtherFunctions');
const getModelSchemaGroup = require('../InputModels/bodyGroupInput')
const { token, baseURL } = require('../config');

// ----------------------------------------------------------------------------
// -------------- G R U P O S -------------------------------------------------
async function getGroups(parent, args, access_token) {
    var {limit} = args;
    // -- Valores por defecto de los parámetros -- 
    if (limit + "" === "undefined") {
        limit = "20";
    }
    console.log(`${baseURL}/groups/v2?limit=${limit}`)
    return await fetch(`${baseURL}/groups/v2?limit=${limit}`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",["group-list", 'group', 'GET', 'Q'], access_token));
}

async function getGroup(parent, args, access_token) {
    const {id} = args
    return await fetch(`${baseURL}/groups/v2/${id}`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",[id, 'group', 'GET', 'Q'], access_token));
}

async function createGroup(parent, args, access_token){ //webpage validad con inicio de http://
    const InputGroup = args.group
    const GroupBody = getModelSchemaGroup(InputGroup, "create")
    return await fetch(`${baseURL}/groups/v2`, {method: 'POST', headers: {'Authorization': `bearer ${access_token}`, 'Accept': `application/vnd.mendeley-group+json`, 'Content-Type': `application/vnd.mendeley-group+json`}, body: JSON.stringify(InputGroup)})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "created",[data.id, 'group', 'POST', 'M'], access_token));
}

async function updateGroup(parent, args, access_token){
    const InputGroup = args.group
    const id = args.id
    const GroupBody = getModelSchemaGroup(InputGroup, "update")
    return await fetch(`${baseURL}/groups/v2/${id}`, {method: 'PATCH', headers: {'Authorization': `bearer ${access_token}`, 'Accept': `application/vnd.mendeley-group+json`, 'Content-Type': `application/vnd.mendeley-group+json`}, body: JSON.stringify(InputGroup)})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "updated",[id, 'group', 'PATCH', 'M'], access_token));
    //.then(res => buildResponse(res, 'up-group',[id, 'group', 'PATCH', 'M']))
    //.then(data => setResponse(data, "mutation", 'updated'));
}

// WARNING: If ID is null or "", deleted all accesibles groups
async function deleteGroup(parent, args, access_token){
    const {id} = args;
    return await fetch(`${baseURL}/groups/v2/${id}`, {method: 'DELETE', headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => { if(res.ok) return res.ok; else return res.text(); })
    .then( data => buildResponseDeleted(data))
    .then( data => setResponse(data, "deleted",[id, 'group', 'DELETE', 'M'], access_token));
}

exports.getGroups = getGroups;
exports.getGroup = getGroup;
exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;

