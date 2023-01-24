const { Pool } = require("pg");
const { exec } = require("child_process");
const chalk = require("chalk");

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  const {
    DATABASE_AUTHENTICATOR,
    DATABASE_AUTHENTICATOR_PASSWORD,
    DATABASE_NAME,
    DATABASE_OWNER,
    DATABASE_OWNER_PASSWORD,
    DATABASE_VISITOR,
    ROOT_DATABASE_URL,
  } = process.env;

  // exit if any of the above is undefined, and tell me which one is undefined
  [
    DATABASE_AUTHENTICATOR,
    DATABASE_AUTHENTICATOR_PASSWORD,
    DATABASE_NAME,
    DATABASE_OWNER,
    DATABASE_OWNER_PASSWORD,
    DATABASE_VISITOR,
    ROOT_DATABASE_URL,
  ].forEach(envVar => {
    if (!envVar) {
      console.error(`Error: Missing base environment variable ${envVar}`);
      process.exit(1);
    }
  });

  const pgPool = new Pool({
    connectionString: ROOT_DATABASE_URL,
  });

  pgPool.on("error", err => {
    console.log(
      "An error occurred while trying to talk to the database: " + err.message
    );
  });

  let attempts = 0;
  while (true) {
    try {
      await pgPool.query('select true as "Connection test";');
      break;
    } catch (e) {
      if (e.code === "28P01") {
        throw e;
      }
      attempts++;
      if (attempts <= 30) {
        console.log(
          `The database is not ready yet (attempt ${attempts}): ${e.message}`
        );
      } else {
        console.log(`The database never came up, aborting :(`);
        process.exit(1);
      }
      await sleep(1000);
    }
  }

  const client = await pgPool.connect();

  try {
    // await client.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME};`);
    // await client.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}_shadow;`);
    // await client.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}_test;`);
    // await client.query(`DROP ROLE IF EXISTS ${DATABASE_VISITOR};`);
    // await client.query(`DROP ROLE IF EXISTS ${DATABASE_AUTHENTICATOR};`);
    // await client.query(`DROP ROLE IF EXISTS ${DATABASE_OWNER};`);
    console.log(
      chalk.bgWhite.gray("The following roles and databases have been dropped:")
    );
    console.log(
      `DATABASE_NAME: ${DATABASE_NAME}, ${DATABASE_NAME}_shadow, ${DATABASE_NAME}_test`
    );
    console.log(`DATABASE_VISITOR: ${DATABASE_VISITOR}`);
    console.log(`DATABASE_AUTHENTICATOR: ${DATABASE_AUTHENTICATOR}`);
    console.log(`DATABASE_OWNER: ${DATABASE_OWNER}`);

    /*   await client.query(
      `CREATE ROLE if not exists ${DATABASE_OWNER} WITH LOGIN PASSWORD '${DATABASE_OWNER_PASSWORD}' SUPERUSER;`
    ); */
    await client.query(
      `CREATE ROLE ${DATABASE_AUTHENTICATOR} WITH LOGIN PASSWORD '${DATABASE_AUTHENTICATOR_PASSWORD}' NOINHERIT;`
    );
    await client.query(`CREATE ROLE ${DATABASE_VISITOR};`);
    await client.query(
      `GRANT ${DATABASE_VISITOR} TO ${DATABASE_AUTHENTICATOR};`
    );
    console.log();
    console.log(chalk.bgWhite.gray("The following roles have been created:"));
    // the same log as above but using chalk

    console.log(`DATABASE_VISITOR: ${DATABASE_VISITOR}`);
    console.log(`DATABASE_AUTHENTICATOR: ${DATABASE_AUTHENTICATOR}`);
    console.log(`DATABASE_OWNER: ${DATABASE_OWNER}`);
  } finally {
    await client.release();
  }
  await pgPool.end();
  exec("pnpm gm reset --erase", (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout:\n${stdout}`);
  });
  return;
};
main();
/*
 */
