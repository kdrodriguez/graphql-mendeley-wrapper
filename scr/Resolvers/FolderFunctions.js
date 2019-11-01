const fetch = require('node-fetch')
const {buildResponse, setResponse, buildResponseDeleted} = require('./OtherFunctions');
const getModelSchemaFolder = require('../InputModels/bodyFolderInput')
const { token, baseURL } = require('../config');

// ----------------------------------------------------------------------------
// -------------- C A R P E T A S ---------------------------------------------
async function getFolders(parent, args, access_token) {
    var {limit, group_id} = args;
    // -- Valores por defecto de los parámetros -- 
    var group_id_Parameter = "&group_id="  //Valor por defecto cuando se solicita una vista
    if (group_id + "" === "undefined") {
        var group_id_Parameter = "";
        group_id = "";
    } //En caso de no solicitar ninguna vista de Documentos
    if (limit + "" === "undefined") {
        limit = "20";
    }
    console.log(`${baseURL}/folders?limit=${limit}${group_id_Parameter}${group_id}`)
    return await fetch(`${baseURL}/folders?limit=${limit}${group_id_Parameter}${group_id}`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",["folder-list", 'folder', 'GET', 'Q'], access_token));
}

async function getFolder(parent, args, access_token) {
    const {id} = args
    return await fetch(`${baseURL}/folders/${id}`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",[id, 'folder', 'GET', 'Q'], access_token));
}

async function createFolder(parent, args, access_token){ //Se permite ingresar name, group_id y parent_id
    const InputFolder = args.folder
    const FolderBody = getModelSchemaFolder(InputFolder, "create")
    return await fetch(`${baseURL}/folders`, {method: 'POST', headers: {'Authorization': `bearer ${access_token}`, 'Accept': `application/vnd.mendeley-folder.1+json`, 'Content-Type': `application/vnd.mendeley-folder.1+json`}, body: JSON.stringify(FolderBody)})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "created",[data.id, 'folder', 'POST', 'M'], access_token));
}

async function updateFolder(parent, args, access_token){ //Se permite actualizar name y parent_id
    const InputFolder = args.folder
    const id = args.id
    const FolderBody = getModelSchemaFolder(InputFolder, "update")
    return await fetch(`${baseURL}/folders/${id}`, {method: 'PATCH', headers: {'Authorization': `bearer ${access_token}`, 'Accept': `application/vnd.mendeley-folder.1+json`, 'Content-Type': `application/vnd.mendeley-folder.1+json`}, body: JSON.stringify(FolderBody)})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "updated",[id, 'folder', 'PATCH', 'M'], access_token));
}

async function deleteFolder(parent, args, access_token){
    const {id} = args;
    return await fetch(`${baseURL}/folders/${id}`, {method: 'DELETE', headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => { if(res.ok) return res.ok; else return res.text(); })
    .then( data => buildResponseDeleted(data))
    .then( data => setResponse(data, "deleted",[id, 'folder', 'DELETE', 'M'], access_token));
}

async function addDocToFolder(parent, args, access_token){
    const {idF, idD} = args 
    return await fetch(`${baseURL}/folders/${idF}/documents`, {method: 'POST', headers: {'Authorization': `bearer ${access_token}`, 'Content-Type': `application/vnd.mendeley-document.1+json`}, body: JSON.stringify({id: `${idD}`})})
    .then( res => { if(res.ok) return res.ok; else return res.text(); })
    .then( data => buildResponseDeleted(data))
    .then( data => setResponse(data, "added",[idF, 'add-folder-docs', 'POST', 'M'], access_token));

    //.then(res => buildResponse(res, 'add-doc-to-folder',[idF, 'add-folder-doc', 'POST', 'M']))
    //.then(data => setResponse(data, "mutation", 'added'));
}

async function removeDocToFolder(parent, args, access_token){
    const {document_id, id} = args
    return await fetch(`${baseURL}/folders/${id}/documents/${document_id}`, {method: 'DELETE', headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => { if(res.ok) return res.ok; else return res.text(); })
    .then( data => buildResponseDeleted(data))
    .then( data => setResponse(data, "removed",[id, 'rem-folder-docs', 'DELETE', 'M'], access_token));
    //.then(res => buildResponse(res, 'rem-doc-to-folder',[id, 'rem-folder-doc', 'DELETE', 'M']))
    //.then(data => setResponse(data, "mutation", 'removed'));
}

exports.getFolders = getFolders;
exports.getFolder = getFolder;
exports.createFolder = createFolder;
exports.updateFolder = updateFolder;
exports.deleteFolder = deleteFolder;
exports.addDocToFolder = addDocToFolder;
exports.removeDocToFolder = removeDocToFolder;
