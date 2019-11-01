//***************************************************
// **********ResolverMendeley************************
//***************************************************

/*
function buildResponse(res, resource, info){
    console.log("-------------------------------------------")
    console.log("Recurso: "+resource)
    if(res.ok){

        if(info[0] === "id-create"){

        }
        addRegisterToBDD(prepareToBDD(info)); 
        return '{"status": "OK"}'
    }else{
        if(resource+"" === "del-group"){ //If resource there isn't a error message, setting one.
            if(res.status+"" === "404"){
                return '{"message": "Resource not found"}'
            }else{
                if(res.status+"" === "400"){
                    return '{"message": "Bad request"}'
                }else{
                    return res.text();
                }
            }
      }else{
           

        }
    }
}

// set object, list object, info or errors for graphql response
function setResponse(data, operationType, operation){
    console.log('=================================================================');
    console.log('ESTO RECIBE SETRESPONSE = ', data);
    console.log('=================================================================');
    if(operationType === "query"){
        if(data === "" || data === "{}"){
            throw new Error ("An error occurred for this request");  
        }else{
            if(data.length>=3 && ((data.charAt(0)!=="{" && data.charAt(0)!=="[") && (data.charAt(data.length-1)!=="}" && data.charAt(0)!=="]"))){
                throw new Error (data+"");
            }else{
                if(JSON.parse(data).hasOwnProperty('message')){
                    throw new Error (JSON.parse(data).message);
                }
            }
        }
    }else{
        if(operationType === "mutation"){
            if(data === "" || data === "{}"){
                var info_response = 
                {   statusText: `unsuccessfull ${operation}`,
                    errorText:  'An error occurred for this request'  };
            }else{
                if(data.length>=3 && (data.charAt(0)!=="{" && data.charAt(data.length-1)!=="}") ){
                    var info_response = 
                    {   statusText: `unsuccessfull ${operation}`,
                        errorText:  `${data}`  };
                }else{
                    if(JSON.parse(data).hasOwnProperty('message')){
                        var info_response = 
                        {   statusText: `unsuccessfull ${operation}`,
                            errorText:  `${JSON.parse(data).message}` };
                    }else{
                        if(JSON.parse(data).hasOwnProperty('status')){
                            var info_response = 
                            {   statusText: `successfull ${operation}`,
                                errorText:  "No error" };
                        }else{
                            var info_response = 
                            {   statusText: `unsuccessfull ${operation}`,
                                errorText:  'An error occurred for this request' };
                        }
                    }
                }
            }
            return info_response;
        }
    }
    return JSON.parse(data);
} */

//***************************************************
// *****************BIITACORA************************
//***************************************************

/*
async function addRegisterToBDD(resObj){
    // Si la acción es un delete, getOne, create o update
   /* resObj = 
    { 
        id_resource: '793443a3-0654-3477-ab48-63b1d19458f1', 
        type_resource: 'document',  // resource doc, gro, fol, fil
        type_operation: 'DELETE',
        graphql_operation: 'M'
    }*/

    // Si el recurso es una lista se establece el id_resource asi 
    // docs-list, fold-list, grou-list, file-list
    /*resObj = 
    { 
        id_resource: 'docs-list', 
        type_resource: 'document',  // resource doc, gro, fol, fil
        type_operation: 'GET',
        graphql_operation: 'Q'
    }*/

    /*const tempResource = await db.any('SELECT * FROM public.resource WHERE id_resource = $1', resObj.id_resource)
    .then(function(data) {return data;})
    .catch(function(error) {console.log(error);});

    const getUser = await fetch(`${baseURL}/profiles/me`, {headers: {'Authorization': `bearer ${token}`}})
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

   /* if( tempResource[0] === undefined && resObj.id_resource.length > 9){
        var resource_comp ='';
        var typeR ='';
        if(resObj.resource === 'doc'){resource_comp = 'documents'; typeR = 'document';}
        if(resObj.resource === 'fol'){resource_comp = 'folders' ; typeR = 'folder';}
        if(resObj.resource === 'gro'){resource_comp = 'groups/v2'; typeR = 'group';}
        if(resObj.resource === 'fil'){resource_comp = 'files'; typeR = 'file';}

        const getResource = await fetch(`${baseURL}/${resource_comp}/${resObj.id_resource}`, {headers: {'Authorization': `bearer ${token}`}})
        .then(function(data) {return data.json();})
        .catch(function(error) {console.log(error);});

        var nameR ='';
        if(resObj.resource === 'doc'){nameR = getResource.title;}
        if(resObj.resource === 'fol'){ nameR = getResource.name ;}
        if(resObj.resource === 'gro'){nameR = getResource.name ;}
        if(resObj.resource === 'fil'){nameR = getResource.file_name;}
      
        db.none('INSERT INTO public.resource (id_resource, type_resource, name_resource) VALUES($1, $2, $3)', [getResource.id, typeR, nameR])
        .then(() => { console.log('Successfully registered resource');})
        .catch(error => { console.log(error);});
    }else{
        if(tempResource[0] === undefined && resObj.id_resource.length === 9){
            var typeR ='';
            if(resObj.resource === 'doc'){typeR = 'document';}
            if(resObj.resource === 'fol'){typeR = 'folder';}
            if(resObj.resource === 'gro'){typeR = 'group';}
            if(resObj.resource === 'fil'){typeR = 'file';}

            db.none('INSERT INTO public.resource (id_resource, type_resource, name_resource) VALUES($1, $2, $3)', [resObj.id_resource, typeR, typeR+' list'])
            .then(() => { console.log('Successfully registered resource');})
            .catch(error => { console.log(error);});
        }
    } 
    console.log("ID RESOURCE = ",resObj.id_resource);

    db.none('INSERT INTO public.operation_action (id_user, id_resource, type_resource, type_operation, graphql_operation) VALUES($1, $2, $3, $4, $5)',
    [getUser.id, resObj.id_resource, resObj.type_resource, resObj.type_operation, resObj.graphql_operation])
    .then(() => { console.log('Successfull registered operation');})
    .catch(error => { console.log(error);});
}

*/

