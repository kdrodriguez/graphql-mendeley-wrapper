
// F U N C I O N E S  P A R A   M O D E L OS   I N P U T   ( E N T R A D A   D E   D A T O S )

function getModelSchemaFolder(folder, metodo){

  var obj_folder = {group_id: `${folder.group_id}`, 
  name: `${folder.name}`, 
  parent_id: `${folder.parent_id}`};

  if( folder.name+"" === "undefined"){delete obj_folder.name;}
  if( folder.parent_id+"" === "undefined"){delete obj_folder.parent_id;}
  if(metodo+"create"){
      if( folder.group_id+"" === "undefined"){delete obj_folder.group_id;}
  }

  return obj_folder ;
}

module.exports = getModelSchemaFolder;
//export default getModelSchemaFolder;