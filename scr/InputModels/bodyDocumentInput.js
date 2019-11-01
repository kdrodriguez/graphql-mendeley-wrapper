
// F U N C I O N E S  P A R A   M O D E L OS   I N P U T   ( E N T R A D A   D E   D A T O S )

function getModelSchemaDocument(doc){

  var obj_doc = {title: `${doc.title}`, 
  type: `${doc.type}`, 
  abstract: `${doc.abstract}`,
  authors: doc.authors,
  group_id: `${doc.group_id}`,
  identifiers: doc.identifiers,
  keywords: [`${doc.keywords}`],
  pages:`${doc.pages}`,
  source:`${doc.source}`,
  tags: doc.tags,
  websites: doc.websites,
  //websites: ['www.hola.com', 'www.chao.com'],
  year:`${doc.year}`};

  if( doc.abstract+"" === "undefined"){delete obj_doc.abstract;}
  if( doc.group_id+"" === "undefined"){delete obj_doc.group_id;}
  // For identifiers REVIEW
  if( doc.keywords+"" === "undefined"){delete obj_doc.keywords;}
  if( doc.pages+"" === "undefined"){delete obj_doc.pages;}
  if( doc.source+"" === "undefined"){delete obj_doc.source;}
  if( doc.tags+"" === "undefined"){delete obj_doc.tags;}
  if( doc.websites+"" === "undefined"){delete obj_doc.websites;}
  if( doc.year+"" === "undefined"){delete obj_doc.year;}

  return obj_doc ;
}

module.exports = getModelSchemaDocument;