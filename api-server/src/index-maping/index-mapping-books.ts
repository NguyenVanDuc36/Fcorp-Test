import { MappingTypeMapping } from "@elastic/elasticsearch/api/types";

export const IndexMapingBooks: MappingTypeMapping = {
    properties: {
        id: { type: 'text' },
        title: { type: 'text' },
        author: { type: 'text' },
        price: { type: 'integer' },
        description: { type: 'text' },
        publishedDate: { type: 'date' }
      }
  };
  