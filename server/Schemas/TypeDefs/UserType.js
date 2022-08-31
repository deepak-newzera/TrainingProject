const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: {type: GraphQLString},
    bio: {type: GraphQLString},
    img: {type: GraphQLString},
  }),
});

module.exports = UserType;
