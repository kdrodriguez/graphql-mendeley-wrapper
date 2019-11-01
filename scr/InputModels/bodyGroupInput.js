
// F U N C I O N E S  P A R A   M O D E L OS   I N P U T   ( E N T R A D A   D E   D A T O S )

function getModelSchemaGroup(group, metodo){

  var obj_group = {access_level : `${group.access_level}`,
  description : `${group.description}`,
  disciplines : `${group.disciplines}`,
  name : `${group.name}`,
  owning_profile_id : `${group.owning_profile_id}`,
  photo : group.photo,
  role : `${group.role}`,
  tags : `${group.tags}`, 
  webpage: `${group.webpage}`};

  if( group.access_level+"" === "undefined"){delete obj_group.access_level;}
  if( group.description+"" === "undefined"){delete obj_group.description;}
  if( group.disciplines+"" === "undefined"){delete obj_group.disciplines;}
  if( group.name+"" === "undefined"){delete obj_group.name;}
  if( group.tags+"" === "undefined"){delete obj_group.tags;}
  if( group.webpage+"" === "undefined"){delete obj_group.webpage;}

  if(metodo+""==="create"){
       if( group.owning_profile_id+"" === "undefined"){delete obj_group.owning_profile_id;}
       if( group.role+"" === "undefined"){delete obj_group.role;}
  }

  return obj_group;
}

module.exports = getModelSchemaGroup;
//export default getModelSchemaGroup;