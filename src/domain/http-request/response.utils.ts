export function isJsonString(body: string): boolean {
  return typeof body === 'string'
    && body.trim() !== ''
    && (
      (
        body.startsWith('{') && body.endsWith('}')
      ) || (
        body.startsWith('[') && body.endsWith(']')
      )
    );
}
