import { addParamsToUrl, pushParamsToUrl, removeParamFromUrl } from '@maxigarcia/js-utils';

export function setUrlParam(key: string, value: string) {
  let url = window.location.href;

  url = addParamsToUrl({ [key]: value });

  pushParamsToUrl(url);
}

export function removeUrlParam(key: string) {
  let url = window.location.href;

  url = removeParamFromUrl(key, url);

  pushParamsToUrl(url);
}
