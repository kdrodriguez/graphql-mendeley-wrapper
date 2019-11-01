const {addRegisterToBDD, prepareToBDD} = require('../DataBase/BitacoraRegister');

// -------------- OTHER METHODS -----------------------------------------------
// Build a res before return data (Just for mutations)
function buildResponseDeleted(data){
        if(data===true)
            return {statusText: `successfull`};
        else
           return buildResponse(data);   
}

function buildResponse (data){  
    // console.log('data: ',data);
    if(data === "" || data === "{}"){
            return {message: "An error occurred for this request"}
        }else{
            if(data.length>=3 && ((data.charAt(0)!=="{" && data.charAt(0)!=="[") && (data.charAt(data.length-1)!=="}" && data.charAt(data.length-1)!=="]"))){
                return {message: `${data}`}
            }else{
                if(JSON.parse(data).hasOwnProperty('message')){
                    return JSON.parse(data);
                }
            }
        }
    return JSON.parse(data);
}

// set object, list object, info or errors for graphql response and add register to BDD
function setResponse (data, op, info, access_token){
    if(data.message){
        throw new Error (data.message);  
    }else{
        if(op==="created" || op==="updated" || op==="deleted" || op==="removed" || op==="added"){
             addRegisterToBDD(prepareToBDD(info), access_token)
             return {statusText: `successfull ${op}`};
        }
        addRegisterToBDD(prepareToBDD(info), access_token)
        return data;
    }
}

exports.buildResponse = buildResponse;
exports.buildResponseDeleted = buildResponseDeleted;
exports.setResponse = setResponse;