export const indexName = {
  books : 'books'
}

export function getDataFromCreate<T>(result: any) : T {
  return JSON.parse(result.meta.request.params.body.replace(/\//g, ''))
}

export function getDataFromUpdate<T>(result: any) : T {
  return JSON.parse(result.meta.request.params.body.replace(/\//g, '')).doc
}