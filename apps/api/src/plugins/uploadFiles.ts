import { makeExtendSchemaPlugin, gql } from "postgraphile";
import {
  createPresignedPost,
  PresignedPost,
  PresignedPostOptions,
} from "@aws-sdk/s3-presigned-post";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { OurGraphQLContext } from "../middlewares/installPostgraphile";

/*
Commande pour modification des cors : s3cmd setcors ./cors.xml s3://test-izicredit
Commande pour modification des policies : s3cmd setpolicy ./policy.json s3://test-izicredit
*/
const client = new S3Client({
  endpoint:
    process.env.BUCKET_HOST || "https://cellar-c2.services.clever-cloud.com",
  credentials: {
    accessKeyId: process.env.BUCKET_KEY!,
    secretAccessKey: process.env.BUCKET_SECRET!,
  },
});

const generateUrl = async (
  presignedPostOptions: PresignedPostOptions
): Promise<PresignedPost> => {
  const presignedPost: PresignedPost = await createPresignedPost(
    client,
    presignedPostOptions
  );
  return presignedPost;
};

export const GeneratePresignedUrl = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      input GeneratePresignedPostInput {
        key: String!
      }
      input DeleteFileInput {
        key: String!
      }
      type GeneratePresignedPostPayload {
        url: String
        fields: JSON
      }
      type DeleteFilePayload {
        success: Boolean
      }
      extend type Mutation {
        generatePresignedPost(
          input: GeneratePresignedPostInput!
        ): GeneratePresignedPostPayload
        deleteFile(input: DeleteFileInput!): DeleteFilePayload
      }
    `,
    resolvers: {
      // our final goal is to get a presigned url and a JSON file, to allow user download a file (ex bridge certificate)
      Mutation: {
        generatePresignedPost: async (
          _query,
          args,
          _context: OurGraphQLContext,
          _resolveInfo
        ) => {
          const { key } = args.input;
          // a "key" is the name of the file stored into our bucket
          try {
            const url = await generateUrl({
              Bucket: process.env.BUCKET_NAME!,
              Key: Math.random().toString(36).substring(2, 9) + "_" + key,
              Conditions: [
                { acl: "public-read" },
                ["starts-with", "$Content-Type", ""],
              ],
              Expires: 600,
              Fields: {
                acl: "public-read",
              },
            });
            return {
              url: url.url + process.env.BUCKET_NAME!,
              fields: url.fields,
            };
          } catch (e) {
            console.error(e);
            throw e;
          }
        },

        deleteFile: async (
          _query,
          args,
          context: OurGraphQLContext,
          _resolveInfo
        ) => {
          const { key } = args.input;
          const { rootPgPool } = context;

          // a "key" is the name of the file stored into our bucket
          try {
            await client.send(
              new DeleteObjectCommand({
                Bucket: process.env.BUCKET_NAME!,
                Key: key,
              })
            );

            const {
              rows: [document],
            } = await rootPgPool.query(
              `DELETE FROM publ.documents
              WHERE file_url = $1
              RETURNING *;
              `,
              [key]
            );
            return {
              success: true,
            };
          } catch (e) {
            console.error(e);
            return {
              success: false,
            };
          }
        },
      },
    },
  };
});
