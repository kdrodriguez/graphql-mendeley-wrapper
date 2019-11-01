const fetch = require('node-fetch')
const {buildResponse, setResponse, buildResponseDeleted} = require('./OtherFunctions');
const { token, baseURL } = require('../config');

// ----------------------------------------------------------------------------
// -------------- A R C H I V O S ---------------------------------------------
async function getFiles(parent, args, access_token) {
    var {limit, document_id} = args;
    // -- Valores por defecto de los parámetros -- 
    var document_id_Parameter = "&document_id="  //Valor por defecto cuando se solicita una vista
    if (document_id + "" === "undefined") {
        var document_id_Parameter = "";
        document_id = "";
    } //En caso de no solicitar ninguna vista de Documentos
    if (limit + "" === "undefined") {
        limit = "20";
    }
    console.log(`${baseURL}/files?limit=${limit}${document_id_Parameter}${document_id}`)
    return await fetch(`${baseURL}/files?limit=${limit}${document_id_Parameter}${document_id}`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",["file-list", 'file', 'GET', 'Q'], access_token));
}

async function getFile(parent, args, access_token) {
    const {id} = args;
    return await fetch(`${baseURL}/files/${id}?access_token=${access_token}`)
    .then(res => {
        if(res.ok){
            return responseFile = `{"statusText": "successfull obtaining file",
                             "errorText":  "No error",
                             "urlFile": "${res.url}"}`
        }else return responseFile= res.text(); 
    })
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",[id, 'file', 'GET', 'Q'], access_token));
}

async function deleteFile(parent, args, access_token){
    const {id} = args;
    return await fetch(`${baseURL}/files/${id}`, {method: 'DELETE', headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => { if(res.ok) return res.ok; else  return res.text(); })
    .then( data => buildResponseDeleted(data))
    .then( data => setResponse(data, "deleted",[id, 'file', 'DELETE', 'M'], access_token));
}

exports.getFiles = getFiles;
exports.getFile = getFile;
exports.deleteFile = deleteFile;