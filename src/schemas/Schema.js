import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} from 'graphql';

let Schema = (db) => {
  let UserType = new GraphQLObjectType({
      name :'User',
      fields : () => ({
        _id : { type : GraphQLString },
        email : { type : GraphQLString },
        name : { type : GraphQLString },
        password : { type : GraphQLString }
      })
  })

  let schema = new GraphQLSchema ({

    query : new GraphQLObjectType({
      name : 'Query',
      fields : () => ({
        users : {
          type : new GraphQLList(UserType),
          resolve : () => db.collection("users").find({}).toArray() //
        }
      })//end of fields
    })//end of query
    // ,
    // mutation: new GraphQLObjectType({
    //   name : 'Mutation',
    //   fields : () => ({
    //     increamentCounter : {
    //       type : GraphQLInt,
    //       resolve : () => ++conunter
    //     },
    //     message : {
    //       type : GraphQLString,
    //       resolve: () => "Hello GraphQL"
    //     }
    //   })//end of fields
    // })//end of mutation
  })
  return schema;
}


export default Schema;
