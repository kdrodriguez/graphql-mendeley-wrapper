const Query = require('./Query.graphql'); 
const Mutation = require('./Mutation.graphql');
const Documents = require('./Documents.graphql');
const Folders = require('./Folders.graphql');
const Groups = require('./Groups.graphql');
const Files = require('./Files.graphql'); 
const test = require('./test.graphql');

/*import Query from './Query.graphql'; 
import Mutation from'./Mutation.graphql';
import Documents from'./Documents.graphql';
import Folders from'./Folders.graphql';
import Groups from'./Groups.graphql';
import Files from'./Files.graphql'; 
import test from'./test.graphql';*/

const typeDefs = [
    Query,
    Mutation,
    Documents,
    Folders,
    Groups,
    Files,
    test
];

module.exports = typeDefs;
//export default typeDefs;