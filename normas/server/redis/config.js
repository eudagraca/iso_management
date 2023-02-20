require("dotenv").config();
const redis = require("redis");
const { promisify } = require("util");
const session = require("express-session");
const connectRedis = require("connect-redis");

const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_URL = process.env.REDIS_URL;
const RedisStore = connectRedis(session);
const client = redis.createClient({ host: "redis-server", port: REDIS_PORT });

var redisStore = new RedisStore({
  host: "redis-server",
  port: REDIS_PORT,
  client: client
});

module.exports = {
  client: client,
  redisStore: redisStore,
  keysAsync: promisify(client.keys).bind(client),
  setAsync: promisify(client.set).bind(client),
  getAsync: promisify(client.get).bind(client),
};
