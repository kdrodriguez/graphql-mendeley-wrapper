const fetch = require('node-fetch')
const {buildResponse, setResponse, buildResponseDeleted} = require('./OtherFunctions');
const getModelSchemaDocument = require('../InputModels/bodyDocumentInput')
const { token, baseURL } = require('../config');

// -------------- D O C U M E N T O S ---------------------------------------------
async function getDocuments(parent, args, access_token) {
    var {order, view, limit, group_id, sort, folder_id} = args;
    // -- Valores por defecto de los parámetros -- 
    var viewParameter = "&view="  //Valor por defecto cuando se solicita una vista
    var group_id_Parameter = "&group_id="  //Valor por defecto cuando se solicita un grupo
    var folder_id_Parameter = "&folder_id="  //Valor por defecto cuando se solicita una carpeta
    if (order + "" === "undefined") {order = "asc";}
    if (view + "" === "undefined") {var viewParameter = ""; view = "";} //En caso de no solicitar ninguna vista de Documentos
    if (group_id + "" === "undefined") {var group_id_Parameter = "";group_id = "";}
    if (folder_id + "" === "undefined") {var folder_id_Parameter = "";folder_id = "";}
    if (limit + "" === "undefined") {limit = "20";}
    if (sort + "" === "undefined") {sort = "created";}

    // DESCOMENTAR console.log(`${baseURL}/documents?limit=${limit}${viewParameter}${view}&order=${order}&sort=${sort}${group_id_Parameter}${group_id}`)
    //console.log(fetch(`${baseURL}/documents?limit=${limit}${viewParameter}${view}&order=${order}&sort=${sort}${group_id_Parameter}${group_id}`, {headers: {'Authorization': `bearer ${token}`}})
    //    .then(res => res.text()))
    //for (var k of res.headers.keys()) {console.log('res.headers.get("' + k + '") =', res.headers.get(k));}
    //console.log('response =', response); for (var k of response.headers.keys()) {console.log('response.headers.get("' + k + '") =', response.headers.get(k));}

    return await fetch(`${baseURL}/documents?limit=${limit}${viewParameter}${view}&order=${order}&sort=${sort}${group_id_Parameter}${group_id}${folder_id_Parameter}${folder_id}`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",["document-list", 'document', 'GET', 'Q'], access_token));

    /*.then(res => { if(res.ok) addRegisterToBDD(prepareToBDD(['document-list', "document", "GET", "Q"]));
        return res.text();
    })
    .then(data => setResponse(data, "query"));*/
}

async function getDocument(parent, args, access_token) {
    const {id} = args;
    var {view} = args;
    var viewParameter = "?view="
    if (view + "" === "undefined") {
        var viewParameter = "";
        view = "";
    }
   // console.log(`${baseURL}/documents/${id}${viewParameter}${view}`)
    return await fetch(`${baseURL}/documents/${id}${viewParameter}${view}`, {headers: {'Authorization': `bearer ${access_token}`,'Accept': `application/vnd.mendeley-document-with-files-list+json`, 'Content-Type': `application/vnd.mendeley-document-with-files-list+json`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",[id, 'document', 'GET', 'Q'], access_token));
}

async function createDocument(parent, args, access_token) {
    const Inputdocument = args.document
    const Documentbody = getModelSchemaDocument(Inputdocument, "create")
    return await fetch(`${baseURL}/documents`, {method: 'POST', headers: {'Authorization': `bearer ${access_token}`, 'Accept': `application/vnd.mendeley-document.1+json`, 'Content-Type': `application/vnd.mendeley-document.1+json`}, body: JSON.stringify(Documentbody)})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "created",[data.id, 'document', 'POST', 'M'], access_token));
}

async function updateDocument(parent, args, access_token) {
    const Inputdocument = args.document
    const id = args.id
    const Documentbody = getModelSchemaDocument(Inputdocument, "update")
    return await fetch(`${baseURL}/documents/${id}`, {method: 'PATCH', headers: {'Authorization': `bearer ${access_token}`, 'Accept': `application/vnd.mendeley-document.1+json`, 'Content-Type': `application/vnd.mendeley-document.1+json`}, body: JSON.stringify(Documentbody)})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "updated",[id, 'document', 'PATCH', 'M'], access_token));
}

async function deleteDocument(parent, args, access_token){
    const {id} = args;
    return await fetch(`${baseURL}/documents/${id}`, {method: 'DELETE', headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => { if(res.ok) return res.ok; else  return res.text(); })
    .then( data => buildResponseDeleted(data))
    .then( data => setResponse(data, "deleted",[id, 'document', 'DELETE', 'M'], access_token));
}

async function getDocumentsFolder(parent, args, access_token){
    var {folder_id, view} = args
    var viewParameter = "&view="
    if (view + "" === "undefined") {var viewParameter = ""; view = "";}
    return fetch(`${baseURL}/documents?limit=100&${viewParameter}${view}&folder_id=${folder_id}`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",[folder_id, 'documents-folder', 'GET', 'Q'], access_token));
}

async function getDocument_types(access_token){
    return fetch(`${baseURL}/document_types`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",['document-types-list', 'document-types', 'GET', 'Q'], access_token));
}

async function getDocument_identifiers_types(access_token){
    return fetch(`${baseURL}/identifier_types`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",['document-identifier-types-list', 'document-identifiers', 'GET', 'Q'], access_token));
}

exports.getDocuments = getDocuments;
exports.getDocument = getDocument;
exports.createDocument = createDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
exports.getDocumentsFolder = getDocumentsFolder;
exports.getDocument_types = getDocument_types;
exports.getDocument_identifiers_types = getDocument_identifiers_types;