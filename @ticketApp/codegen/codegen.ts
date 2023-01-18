import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../../data/schema.graphql",
  documents: "./**/*.graphql",
  hooks: {
    afterAllFileWrite: ["tsup ./src/index.ts --dts --format cjs"],
  },
  generates: {
    "./src/index.ts": {
      plugins: [
        {
          add: {
            content: "// @ts-nocheck",
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
