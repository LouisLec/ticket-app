const baseEnvVars = [
  "DATABASE_AUTHENTICATOR_PASSWORD",
  "DATABASE_NAME",
  "DATABASE_OWNER_PASSWORD",
  "DATABASE_HOST",
  "ROOT_DATABASE_URL",
  "API_ENDPOINT",
];

baseEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`Error: Missing base environment variable ${envVar}`);
    process.exit(1);
  }
});

process.env.DATABASE_AUTHENTICATOR =
  process.env.DATABASE_AUTHENTICATOR ||
  `${process.env.DATABASE_NAME}_authenticator`;

process.env.DATABASE_OWNER =
  process.env.DATABASE_OWNER || `${process.env.DATABASE_NAME}_owner`;

process.env.DATABASE_VISITOR =
  process.env.DATABASE_VISITOR || `${process.env.DATABASE_NAME}_visitor`;

process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.DATABASE_OWNER}:${process.env.DATABASE_OWNER_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`;
process.env.AUTH_DATABASE_URL =
  process.env.AUTH_DATABASE_URL ||
  `postgres://${process.env.DATABASE_AUTHENTICATOR}:${process.env.DATABASE_AUTHENTICATOR_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`;
process.env.SHADOW_DATABASE_URL =
  process.env.SHADOW_DATABASE_URL ||
  `postgres://${process.env.DATABASE_OWNER}:${process.env.DATABASE_OWNER_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}_shadow`;
process.env.SHADOW_AUTH_DATABASE_URL =
  process.env.SHADOW_AUTH_DATABASE_URL ||
  `postgres://${process.env.DATABASE_AUTHENTICATOR}:${process.env.DATABASE_AUTHENTICATOR_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}_shadow`;

process.env.NEXT_PUBLIC_API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT;

console.table(process.env);
