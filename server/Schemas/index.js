/* eslint-disable no-unused-vars */
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString} = graphql;
const {User} = require('../models');

const UserType = require('./TypeDefs/UserType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getUserDetail: {
      type: UserType,
      args: {id: {type: GraphQLInt}},
      async resolve(parent, args) {
        try {
          const user = await User.findOne({
            where: {
              id: args.id,
            },
          });
          return user;
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProfilePic: {
      type: UserType,
      args: {id: {type: GraphQLInt}, img: {type: GraphQLString}},
      async resolve(parent, args) {
        try {
          const result = await User.update(
            {img: args.img},
            {where: {id: args.id}},
          );
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation});
