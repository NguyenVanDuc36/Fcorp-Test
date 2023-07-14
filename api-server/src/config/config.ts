import { mustCheckEnv } from "../utils/must-check-env";
const dotenv = require("dotenv");
dotenv.config();

mustCheckEnv(
  "ELASTICSEARCH_HOST",
  "FASTIFY_PORT"
);

export const ELASTICSEARCH_HOST = process.env.ELASTICSEARCH_HOST as string;
export const FASTIFY_PORT = Number(process.env.FASTIFY_PORT);

export const PREFIX = "/api/v1/";
export const HOST = "0.0.0.0";
