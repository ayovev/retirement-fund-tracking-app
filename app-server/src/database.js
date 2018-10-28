require(`dotenv`).config({ path: `../../.env` });

const dbPrefix = `mongodb://`;
const dbHost = `localhost`;
const dbPort = `27017`;
const dbName = `retirement`;

module.exports = DB_URL = `${dbPrefix}${dbHost}:${dbPort}/${dbName}`;
