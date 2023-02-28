import { makeExecutableSchema } from '@graphql-tools/schema'
import { Link } from '@prisma/client';
import { GraphQLContext } from './context';

const typeDefinitions = `
  type Query {
    info: String!
    feed: [Link!]!
    comment(id: ID!): Comment
  }

  type Comment {
    id: ID!
    body: String!
  }

  type Mutation {
    postLink(url: String!, description: String!): Link!
    postCommentOnLink(linkId: ID!, body: String!): Comment!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (parent: unknown, args: {}, context: GraphQLContext) => context.prisma.link.findMany()
    },
    Link: {
        id: (parent: Link) => parent.id,
        description: (parent: Link) => parent.description,
        url: (parent: Link) => parent.url
    },
    Mutation: {
        async postLink(
            parent: unknown, 
            args: { description: string; url: string },
            context: GraphQLContext
            ) {
                const newLink = await context.prisma.link.create({
                    data: {
                        url: args.url,
                        description: args.description
                    }
                })

                return newLink
        },
        async postCommentOnLink(
            parent: unknown,
            args: { linkId: string; body: string },
            context: GraphQLContext
          ) {
            const newComment = await context.prisma.comment.create({
                data: {
                  linkId: parseInt(args.linkId),
                  body: args.body
                }
            })

            return newComment
          }
    }
}

export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions]
  })