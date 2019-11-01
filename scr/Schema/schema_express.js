const { buildSchema } =require('graphql');

const schema_express = buildSchema(`
  type Query{
  documents(order: String, view: String, limit: String, sort: String, group_id: String): [Document]
  documentsFolder(folder_id: String!): [Document]
  document(id: String!, view: String): Document
  document_types: [Document_types]
  document_identifiers_types: [Document_identifier_types]
  files(limit: String, document_id: String): [File]
  file(id: String!): InfoDownloadFile!
  folders(limit: String, group_id: String): [Folder]
  folder(id: String!): Folder
  groups(limit: String): [Group]
  group(id: String!): Group 
}

type Mutation{
    createDocument(document: DocumentInput!): Document!
    createFolder(folder: FolderInput!): Folder!
    createGroup(group: GroupInput!): Group!

    updateDocument(id: String!, document: DocumentInput!): Document!
    updateFolder(id: String!, folder: FolderInput!): Folder!
    updateGroup(id: String!, group: GroupInput!): Group!

    deleteDocument(id: String!): InfoDelete!
    deleteFolder(id: String!): InfoDelete!
    deleteGroup(id: String!): InfoDelete!
}


#-------- <Tipos Especiales>

type InfoDelete{
  status: Boolean!
}

type InfoDownloadFile{
  status: Boolean!
}

type ResourcePagination{
  resource_count: Int  
  next: NextPreviousPage
  previous: NextPreviousPage
  first: FirstLastPage
  last: FirstLastPage
}

type NextPreviousPage{
  marker: String!
  reverse: Boolean!
  rel: String!
}

type FirstLastPage{
  reverse: Boolean!
  rel: String!
}

#-------- </Tipos Especiales>


type Document{
  abstract: String
  accessed: String
  authored: Boolean
  authors: [Person!]
  chapter: String
  citation_key: String
  city: String
  code: String
  confirmed: Boolean
  country: String
  created: String
  day: Int
  department: String
  edition: String
  editors: [Person!]
  file_attached: Boolean
  folder_uuids: [UUID!]
  genre: String
  group_id: String
  hidden: Boolean
  id: String
  identifiers: [String!]
  institution: String
  issue: String
  keywords: [String!]
  language: String
  last_modified: String
  medium: String
  month: Int
  notes: String
  pages: String
  patent_application_number: String
  patent_legal_status: String
  patent_owner: String
  private_publication: Boolean
  profile_id: String
  publisher: String
  read: Boolean
  reprint_edition: String
  revision: String
  series: String
  series_editor: String
  series_number: String
  short_title: String
  source: String
  source_type: String
  starred: Boolean
  tags: [String!]
  title: String!
  translators: [Person!]
  type: String
  user_context: String
  volume: String
  websites: [String!]
  year: Int
  pagination: ResourcePagination
}

input DocumentInput{
  abstract: String
  authors: [PersonInput!]
  group_id: String
  identifiers: [String!]
  keywords: [String!]
  source: String
  title: String!
  type: String!
  year: Int
  #Campos por default: id, created, profile_id y last_modified
}

type Document_types{
  description: String
  name: String
}

type Document_identifier_types{
  description: String
  name: String
}

type Person{
  first_name: String
  last_name: String!
  scopus_author_id: String
}

input PersonInput{
  first_name: String
  last_name: String!
  scopus_author_id: String
}

type UUID{
  leastSignificantBits: Int
  mostSignificantBits: Int
}


type File{
  catalog_id: String
  created: String
  document_id: String
  file_name: String
  filehash: String
  id: String
  mime_type: String
  size: Int
}

type Folder{
  created: String
  group_id: String
  id: String
  modified: String
  name: String!
  parent_id: String
  documents: [Document]
  folders: [Folder]
}

input FolderInput{
  group_id: String
  name: String!
  parent_id: String
}

type Group{
  access_level: String!  #['public' or 'private' or 'invite_only']
  created: String
  description: String
  disciplines: [String!]
  id: String
  link: String
  member_count: Int
  member_limit: Int
  name: String!
  owning_profile_id: String
  photo: Photo
  role: String  #['owner' or 'admin' or 'normal' or 'follower']
  tags: [String!]
  url_slug: String
  used_space: Int
  webpage: String
  folders: [Folder]
}

input GroupInput{
  access_level: String!  #['public' or 'private' or 'invite_only']
  description: String
  disciplines: [String!]
  name: String!
  owning_profile_id: String
  photo: PhotoInput
  role: String  #['owner' or 'admin' or 'normal' or 'follower']
  tags: [String!]
  webpage: String
}

type Photo{
  original: String
  photo_uuid: String
  square: String
  standard: String
}

input PhotoInput{
  original: String
  photo_uuid: String
  square: String
  standard: String
}
`);

module.exports = schema_express;