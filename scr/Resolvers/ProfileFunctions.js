const fetch = require('node-fetch')
const {buildResponse, setResponse} = require('./OtherFunctions');
const { token, baseURL } = require('../config');

// -------------- P E R F I L ---------------------------------------------
async function getProfileMe(parent, args, access_token){
    return await fetch(`${baseURL}/profiles/me`, {headers: {'Authorization': `bearer ${access_token}`}})
    .then( res => res.text())
    .then( data => buildResponse(data))
    .then( data => setResponse(data, "get",[data.id, 'profile', 'GET', 'Q'], access_token));
}

exports.getProfileMe = getProfileMe;