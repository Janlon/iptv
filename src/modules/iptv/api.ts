import { Credentials, MediaType, XtreamCategory, XtreamLoginResponse, XtreamSeries, XtreamVod } from './types';

const REQUEST_TIMEOUT_MS = 8000;
const PROXY_PLACEHOLDER = '{url}';

type NodeProcessLike = {
  env?: Record<string, string | undefined>;
};

type FetchOptions = {
  signal?: AbortSignal;
};

function getProxyTemplate() {
  const fromImportMeta = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_XTREAM_PROXY_URL as string | undefined) : undefined;
  if (fromImportMeta && fromImportMeta.trim().length > 0) {
    return fromImportMeta.trim();
  }

  const maybeProcess = (globalThis as typeof globalThis & { process?: NodeProcessLike }).process;
  const fromProcess = maybeProcess?.env?.VITE_XTREAM_PROXY_URL;
  if (fromProcess && fromProcess.trim().length > 0) {
    return fromProcess.trim();
  }

  return undefined;
}

function buildProxyUrl(targetUrl: string) {
  const template = getProxyTemplate();
  if (!template) {
    return undefined;
  }

  const encodedTarget = encodeURIComponent(targetUrl);

  if (template.includes(PROXY_PLACEHOLDER)) {
    return template.replaceAll(PROXY_PLACEHOLDER, encodedTarget);
  }

  const expectsInlineValue = /[?&][^=]*=$/.test(template);
  if (expectsInlineValue) {
    return `${template}${encodedTarget}`;
  }

  const needsQuery = !template.includes('?');
  const separator = needsQuery ? '?' : template.endsWith('?') || template.endsWith('&') ? '' : '&';
  return `${template}${separator}url=${encodedTarget}`;
}

function linkAbortSignals(source: AbortSignal | undefined, target: AbortController) {
  if (!source) {
    return undefined;
  }

  if (source.aborted) {
    target.abort();
    return undefined;
  }

  const abortHandler = () => target.abort();
  source.addEventListener('abort', abortHandler, { once: true });

  return () => {
    source.removeEventListener('abort', abortHandler);
  };
}

function isLikelyCorsError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const message = (error as Error).message ?? '';
  return /Failed to fetch|NetworkError|TypeError: fetch failed/i.test(message);
}

export function createXtreamUrl(
  baseUrl: string,
  path: string,
  params: Record<string, string | number | undefined>
) {
  const sanitizedBaseUrl = ensureTrailingSlash(baseUrl.trim());

  let url: URL;

  try {
    url = new URL(path, sanitizedBaseUrl);
  } catch (error) {
    throw new Error('URL do servidor IPTV inválida. Inclua http:// ou https:// e o número da porta.');
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}

function ensureTrailingSlash(url: string) {
  if (!url) {
    return url;
  }

  const hasProtocol = /^https?:\/\//i.test(url) ? url : `http://${url}`;
  return hasProtocol.endsWith('/') ? hasProtocol : `${hasProtocol}/`;
}

async function performRequest<T>(targetUrl: string, externalSignal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const unlink = linkAbortSignals(externalSignal, controller);
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IPTVClient/1.0)',
        Accept: 'application/json, text/plain, */*'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
    unlink?.();
  }
}

async function fetchJson<T>(url: string, { signal }: FetchOptions = {}): Promise<T> {
  const errors: Error[] = [];

  try {
    return await performRequest<T>(url, signal);
  } catch (error) {
    const err = error as Error;
    if (err.name === 'AbortError') {
      throw new Error('Tempo limite ao conectar ao servidor IPTV. Verifique a URL e tente novamente.');
    }
    errors.push(err);
  }

  const proxyUrl = buildProxyUrl(url);
  if (proxyUrl) {
    try {
      return await performRequest<T>(proxyUrl, signal);
    } catch (error) {
      const err = error as Error;
      if (err.name === 'AbortError') {
        throw new Error('Tempo limite ao conectar ao servidor IPTV (proxy). Tente novamente.');
      }
      errors.push(err);
    }
  }

  const primaryError = errors[0];
  const baseMessage = isLikelyCorsError(primaryError)
    ? 'Falha ao conectar diretamente ao servidor IPTV (possível bloqueio de CORS).'
    : primaryError?.message ?? 'Falha desconhecida ao conectar ao servidor IPTV.';

  if (proxyUrl && errors.length > 1) {
    const proxyMessage = errors[1]?.message ?? 'Proxy retornou erro desconhecido.';
    throw new Error(
      `${baseMessage} Tentativa via proxy (${proxyUrl}) também falhou: ${proxyMessage}. ` +
        'Configure uma URL de proxy funcional em VITE_XTREAM_PROXY_URL ou revise o firewall do servidor.'
    );
  }

  if (isLikelyCorsError(primaryError) && !proxyUrl) {
    throw new Error(
      `${baseMessage} Configure uma URL de proxy reverso em VITE_XTREAM_PROXY_URL para contornar a restrição do navegador.`
    );
  }

  throw new Error(`Não foi possível conectar ao servidor IPTV (${baseMessage}). Confira a URL, usuário e senha.`);
}

export async function authenticate(credentials: Credentials) {
  const url = createXtreamUrl(credentials.baseUrl, 'player_api.php', {
    username: credentials.username,
    password: credentials.password
  });

  const data = await fetchJson<XtreamLoginResponse>(url);

  if (!data?.user_info || data.user_info.status !== 'Active') {
    const reason = data?.user_info?.message ?? 'Credenciais inválidas ou conta inativa.';
    throw new Error(reason);
  }

  return data;
}

export async function fetchCategories(credentials: Credentials, type: MediaType) {
  const action = type === 'movie' ? 'get_vod_categories' : 'get_series_categories';

  const url = createXtreamUrl(credentials.baseUrl, 'player_api.php', {
    username: credentials.username,
    password: credentials.password,
    action
  });

  const data = await fetchJson<XtreamCategory[]>(url);
  return data.sort((a, b) => a.category_name.localeCompare(b.category_name));
}

export async function fetchVodStreams(credentials: Credentials, categoryId?: string) {
  const url = createXtreamUrl(credentials.baseUrl, 'player_api.php', {
    username: credentials.username,
    password: credentials.password,
    action: 'get_vod_streams',
    category_id: categoryId
  });

  const data = await fetchJson<XtreamVod[]>(url);
  return data;
}

export async function fetchSeries(credentials: Credentials, categoryId?: string) {
  const url = createXtreamUrl(credentials.baseUrl, 'player_api.php', {
    username: credentials.username,
    password: credentials.password,
    action: 'get_series',
    category_id: categoryId
  });

  const data = await fetchJson<XtreamSeries[]>(url);
  return data;
}

export async function fetchSeriesInfo(credentials: Credentials, seriesId: number | string) {
  const url = createXtreamUrl(credentials.baseUrl, 'player_api.php', {
    username: credentials.username,
    password: credentials.password,
    action: 'get_series_info',
    series_id: String(seriesId)
  });

  const data = await fetchJson<any>(url);
  return data;
}
