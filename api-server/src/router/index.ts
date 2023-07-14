import { FastifyInstance } from "fastify";
import { bookRouter } from "./book/bookRouter";

export default async function rootRouter(fastify: FastifyInstance) {
  fastify.register(bookRouter, { prefix: "/books" });
}