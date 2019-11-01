const { db } = require("./cnn");

async function getActivityData(){
    const getUser = await fetch(`${baseURL}/profiles/me`, {headers: {'Authorization': `bearer ${token}`}})
    .then(function(data) {return data.json();})
    .catch(function(error) {console.log(error);});

    const tempUser = await db.any('SELECT * FROM public.user WHERE id_user = $1', getUser.id)
    .then(function(data) {return data;})
    .catch(function(error) {console.log(error);}); 

    return tempUser;
}

exports.getActivityData = getActivityData;
