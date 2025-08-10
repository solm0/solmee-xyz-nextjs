// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// import { gql, GraphQLClient } from "graphql-request";

// const client = new GraphQLClient(process.env.GRAPHQL_API_URL!);

// const GET_ALL_POSTS = gql`
//   query {
//     posts {
//       id
//       title
//       publishedAt
//       meta
//       excerpt
//       thumbnail
//       tags {
//         name
//       }
//       keywords {
//         name
//       }
//       content {
//         document(hydrateRelationships: true)
//       }
//     }
//   }
// `;

export default async function HomePage() {
  return (
    <div>큐레이션과 대해서</div>
  )
}