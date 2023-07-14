import { FastifyInstance } from "fastify";
import { BookController } from "../../controller/bookController";
import { createBookSchema, updateBookSchema } from "../../validations/book/bookShema";

export const bookRouter = (fastify: FastifyInstance, _: any, done: any) => {
  fastify.get("/", BookController.getBookList);
  fastify.get("/:id", BookController.getBookDetail);
  fastify.post("/", { schema: createBookSchema }, BookController.createBook);
  fastify.put("/:id", { schema: updateBookSchema }, BookController.updateBook);

  done();
};
