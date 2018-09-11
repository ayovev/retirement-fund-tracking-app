const dbPrefix = `mongodb://`;
const dbHost = `mongo`; // normally set to `localhost` if running node server on host machine
const dbPort = `27017`;
const dbName = `retirement`;

module.exports = DB_URL = `${dbPrefix}${dbHost}:${dbPort}/${dbName}`;
