export function getCopyToFetchText(url: string, options: Parameters<typeof fetch>[1]) {
  return `fetch(\n'${url}',\n${JSON.stringify(options, null, 2)}\n)\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error(error));`;
}

export function getCopyToCurlText(url: string, options: Parameters<typeof fetch>[1]) {
  const base = `curl -X ${options.method} '${url}'`;
  const headers
    = options.headers && Object.entries(options.headers).length > 0
      ? Object.entries(options.headers).map(([key, value]) => `-H '${key.replaceAll('.', '-')}: ${value}'`).join(' ')
      : '';

  const body
    = options.body && typeof options.body === 'string' && options.body.length > 0
      ? `-d '${options.body}'`
      : '';

  return `${base} ${headers} ${body}`;
}
