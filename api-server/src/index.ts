import fastify from "fastify";
import router from "./router";
import { FASTIFY_PORT, HOST, PREFIX } from "./config/config";
import rootRouter from "./router";
import { seeBookdData } from "./seeders/seedBookData";
import cors from '@fastify/cors'

const JoiCompiler = require("joi-compiler");
const joiCompilerInstance = JoiCompiler();


const server = fastify({
  schemaController: {
    bucket: joiCompilerInstance.bucket,
    compilersFactory: {
      buildValidator: joiCompilerInstance.buildValidator,
    },
  },
});

void (async () => {
  try {
    server.listen({ port: FASTIFY_PORT, host: HOST });
    await seeBookdData();
  } catch (error) {
    console.log(error);
  }
})();

server.register(cors, {
  origin: "*",
});

server.register(rootRouter, { prefix: PREFIX });
console.log(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
