const fetch = require('node-fetch');
const {addRegisterToBDD, prepareToBDD} = require('../DataBase/BitacoraRegister');

const { token, baseURL } = require('../config');
const client_id = '';
const client_secret = '';
const authorize_url = '';
const token_url = '';

const {getProfileMe} = require('./ProfileFunctions');

const {
    getDocuments, 
    getDocument, 
    createDocument, 
    updateDocument, 
    deleteDocument, 
    getDocumentsFolder, 
    getDocument_types, 
    getDocument_identifiers_types
} = require('./DocumentFunctions');

const {
    getFolders,
    getFolder,
    createFolder,
    updateFolder,
    deleteFolder,
    addDocToFolder,
    removeDocToFolder
} = require('./FolderFunctions');

const {
    getGroups,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup
} = require('./GroupFunctions');

const {
    getFiles,
    getFile,
    deleteFile
} = require('./FileFunctions');


const resolversMendeley = {
    Query: {
        documents: (parent, args, context) => {return getDocuments(parent, args, context.request.cookies.token)},
        // POSIBLE ELIMINACION YA QUE EXISTE VAR folders EN Type Document
        documentsFolder: (parent, args, context) => { return getDocumentsFolder(parent, args, context.request.cookies.token) },
        document: (parent, args, context) => {return getDocument(parent, args, context.request.cookies.token)},
        document_types: (context) => {return getDocument_types(context.request.cookies.token) },
        document_identifiers_types: (context) => { return getDocument_identifiers_types(context.request.cookies.token)  },
        files: (parent, args, context) => {return getFiles(parent, args, context.request.cookies.token);},
        file: (parent, args, context) => {return getFile(parent, args, context.request.cookies.token);}, // Descarga de archivo
        folders: (parent, args, context) => {return getFolders(parent, args, context.request.cookies.token);},
        folder: (parent, args, context) => {return getFolder(parent, args, context.request.cookies.token);},
        groups: (parent, args, context) => {return getGroups(parent, args, context.request.cookies.token);},
        group: (parent, args, context) => {return getGroup(parent, args, context.request.cookies.token);},
        profileMe: (parent, args, context) => {return getProfileMe(parent, args, context.request.cookies.token);},
    },
    Folder: {
        documents: (parent, args, context) => {
            const {id} = parent
            return fetch(`${baseURL}/documents?limit=100&folder_id=${id}`, {headers: {'Authorization': `bearer ${context.request.cookies.token}`}}).then(res => res.json())
        }
    },
    Group: {
        folders: (parent, args, context) =>{
            const {id} = parent
            return fetch(`${baseURL}/folders?limit=100&group_id=${id}`, {headers: {'Authorization': `bearer ${context.request.cookies.token}`}}).then(res => res.json())
        }
    },
    Mutation: {
        createDocument: (parent, args, context) => {return createDocument(parent, args, context.request.cookies.token);},
        updateDocument: (parent, args, context) => {return updateDocument(parent, args, context.request.cookies.token);},
        deleteDocument: (parent, args, context) => {return deleteDocument(parent, args, context.request.cookies.token);},
        //Se permite ingresar name, group_id y parent_id
        createFolder: (parent, args, context) => {return createFolder(parent, args, context.request.cookies.token);},
        //Se permite actualizar name y parent_id
        updateFolder: (parent, args, context) => {return updateFolder(parent, args, context.request.cookies.token);},
        deleteFolder: (parent, args, context) => {return deleteFolder(parent, args, context.request.cookies.token);},
        addDocToFolder: (parent, args, context) => {return addDocToFolder(parent, args, context.request.cookies.token);},
        removeDocToFolder: (parent, args, context) => {return removeDocToFolder(parent, args, context.request.cookies.token);},
        //webpage validad con inicio de http://
        createGroup: (parent, args, context) => {return createGroup(parent, args, context.request.cookies.token);},
        updateGroup: (parent, args, context) => {return updateGroup(parent, args, context.request.cookies.token);},
        deleteGroup: (parent, args, context) => {return deleteGroup(parent, args, context.request.cookies.token);},

        deleteFile: (parent, args, context) => {return deleteFile(parent, args, context.request.cookies.token);},
    }
};

module.exports = resolversMendeley;