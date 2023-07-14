import { FastifyRequest, FastifyReply } from "fastify";
import { EntityList, ResponseSumType } from "../utils/types";
import { IBook } from "../utils/interface/book.interface";
import { HttpStatus } from "../utils/htttp-status/http-status";
import { client } from "../config/connection";
import { getDataFromCreate, getDataFromUpdate, indexName } from "../utils/common";

export class BookController {
  static upda(arg0: string, arg1: { schema: { body: any } }, upda: any) {
    throw new Error("Method not implemented.");
  }
  static getBookList = async (
    _request: FastifyRequest,
    reply: FastifyReply
  ): Promise<ResponseSumType<EntityList<IBook>>> => {
    try {
      const { body } = await client.search({
        index: indexName["books"],
        body: {
          query: {
            match_all: {},
          },
        },
        from: 0,
        size: 20,
      });

      const result: IBook[] = body.hits.hits.map((hit: any) => hit._source);

      return {
        success: true,
        statusCode: HttpStatus.OK,
        result: {
          count: result.length,
          list: result,
        },
      };
    } catch (error: any) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: error,
        result: undefined
      };
    }
  };

  static getBookDetail = async (
    request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply: FastifyReply
  ): Promise<ResponseSumType<IBook>> => {
    const id: string = request.params.id;
    try {
      const { body } = await client.search({
        index: "books",
        body: {
          query: {
            match: {
              id,
            },
          },
        },
      });
      const result = body.hits.hits[0]?._source;

      if (!result) {
        return {
          success: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Book does not exist!',
          result: undefined
        };
      }

      return {
        success: true,
        statusCode: HttpStatus.OK,
        result,
      };
    } catch (error: any) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        result: undefined
      };
    }
  };

  static createBook = async (
    request: FastifyRequest<{
      Body: IBook;
    }>,
    reply: FastifyReply
  ): Promise<ResponseSumType<IBook>> => {
    const body: IBook = request.body;
    body["id"] = Date.now().toString();

    try {
      const newBook = await client.index({
        index: indexName["books"],
        body: body,
      });


      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        result: getDataFromCreate<IBook>(newBook),
      };
    } catch (error: any) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        result: undefined
      };
    }
  };

  static updateBook = async (
    request: FastifyRequest<{
      Body: Partial<Omit<IBook, "id">>;
      Params: Pick<IBook, "id">;
    }>,
    reply: FastifyReply
  ): Promise<ResponseSumType<IBook>> => {
    const data: Partial<Omit<IBook, "id">> = request.body;
    const id = request.params.id;
    try {
      const { body } = await client.search({
        index: "books",
        body: {
          query: {
            match: {
              id,
            },
          },
        },
      });
      const result = body.hits.hits[0]?._source;

      if (!result) {
        return {
          success: false,
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Book does not exist!',
          result: undefined
        };
      }
      const _id = body.hits.hits[0]?._id;
      const response = await client.update({
        index: indexName["books"],
        id : _id,
        body: {
          doc: data
        },
        refresh: true,
      });
    
      return {
        success: true,
        statusCode: HttpStatus.OK,
        result:  getDataFromUpdate<IBook>(response)
      }
    } catch (error: any) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
        result: undefined
      };
    }
  };
}
