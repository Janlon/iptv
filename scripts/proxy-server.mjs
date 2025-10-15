#!/usr/bin/env node
import http from 'node:http';
import { URL } from 'node:url';

const DEFAULT_PORT = parseInt(process.env.PORT ?? process.env.XTREAM_PROXY_PORT ?? '8787', 10);
const DEFAULT_HOST = process.env.HOST ?? process.env.XTREAM_PROXY_HOST ?? '0.0.0.0';
const RAW_ALLOWED_HOSTS = process.env.ALLOWED_HOSTS ?? process.env.XTREAM_PROXY_ALLOW ?? '';
const RAW_ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ?? process.env.XTREAM_PROXY_ORIGINS ?? '*';
const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT ?? '10000', 10);

const allowedHosts = RAW_ALLOWED_HOSTS
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean)
  .map(normalizeHostPattern);

const allowedOrigins = RAW_ALLOWED_ORIGINS
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean);

const args = new Set(process.argv.slice(2));

if (args.has('--check')) {
  console.log(
    `[xtream-proxy] configuração carregada: host=${DEFAULT_HOST} port=${DEFAULT_PORT} allowHosts=${
      allowedHosts.length ? allowedHosts.join('|') : '*'
    } allowOrigins=${allowedOrigins.length ? allowedOrigins.join('|') : '*'} timeout=${REQUEST_TIMEOUT}ms`
  );
  process.exit(0);
}

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) {
      return sendError(res, 400, 'URL inválida.');
    }

    const requestUrl = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
    const origin = req.headers.origin;
    applyCors(res, origin);

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method !== 'GET') {
      return sendError(res, 405, 'Método não suportado. Use GET.');
    }

    if (!isProxyPath(requestUrl.pathname)) {
      return sendError(res, 404, 'Endpoint não encontrado. Use /proxy?url=...');
    }

    const targetParam = requestUrl.searchParams.get('url');
    if (!targetParam) {
      return sendError(res, 400, 'Informe a URL Xtream via parâmetro ?url=.');
    }

    let targetUrl;
    try {
      targetUrl = new URL(targetParam);
    } catch (error) {
      return sendError(res, 400, 'URL fornecida é inválida.');
    }

    if (!hostAllowed(targetUrl.hostname)) {
      return sendError(
        res,
        403,
        `Host "${targetUrl.hostname}" não autorizado. Ajuste a variável ALLOWED_HOSTS do proxy.`
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const upstream = await fetch(targetUrl.toString(), {
      signal: controller.signal,
      headers: buildForwardHeaders(req.headers)
    });

    clearTimeout(timeoutId);

    if (!upstream.ok) {
      const bodyBuffer = Buffer.from(await upstream.arrayBuffer());
      const preview = bodyBuffer.toString('utf8').slice(0, 500) || 'sem corpo de resposta';
      console.error(
        `[xtream-proxy] upstream ${targetUrl.toString()} respondeu ${upstream.status}: ${preview}`
      );
      return sendError(
        res,
        upstream.status,
        `Proxy recebeu status ${upstream.status} do servidor Xtream. Resposta: ${preview}`
      );
    }

    // For video streaming, pipe the response directly instead of buffering
    const contentType = upstream.headers.get('content-type') || '';
    const isVideo = contentType.includes('video/') || contentType.includes('application/octet-stream') || 
                    targetUrl.pathname.match(/\.(mp4|mkv|avi|mov|webm|m3u8|ts)$/i);
    
    if (isVideo) {
      console.log('[xtream-proxy] streaming video:', targetUrl.toString());
      const headers = filterResponseHeaders(upstream.headers);
      res.writeHead(upstream.status, headers);
      
      // Stream the video data
      const reader = upstream.body.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(Buffer.from(value));
        }
        res.end();
      } catch (streamError) {
        console.error('[xtream-proxy] stream error:', streamError);
        res.end();
      }
    } else {
      // For non-video content, buffer as before
      const bodyBuffer = Buffer.from(await upstream.arrayBuffer());
      const headers = filterResponseHeaders(upstream.headers);
      res.writeHead(upstream.status, headers);
      res.end(bodyBuffer);
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return sendError(res, 504, 'Tempo limite ao contatar o servidor Xtream.');
    }
    console.error('[xtream-proxy] erro inesperado', error);
    return sendError(res, 502, 'Falha inesperada no proxy. Verifique os logs.');
  }
});

server.listen(DEFAULT_PORT, DEFAULT_HOST, () => {
  console.log(`[xtream-proxy] ouvindo em http://${DEFAULT_HOST}:${DEFAULT_PORT}`);
  if (allowedHosts.length) {
    console.log(`[xtream-proxy] hosts permitidos: ${allowedHosts.join(', ')}`);
  } else {
    console.log('[xtream-proxy] hosts permitidos: QUALQUER');
  }
  if (allowedOrigins.length) {
    console.log(`[xtream-proxy] CORS liberado para: ${allowedOrigins.join(', ')}`);
  } else {
    console.log('[xtream-proxy] CORS liberado para: *');
  }
});

function applyCors(res, origin) {
  const allowOrigin = resolveAllowedOrigin(origin);
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
}

function resolveAllowedOrigin(origin) {
  if (!origin) {
    return allowedOrigins.length ? allowedOrigins[0] : '*';
  }

  if (!allowedOrigins.length || allowedOrigins.includes('*')) {
    return origin;
  }

  return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
}

function normalizeHostPattern(entry) {
  return entry.toLowerCase();
}

function hostAllowed(hostname) {
  if (!allowedHosts.length || allowedHosts.includes('*')) {
    return true;
  }
  const normalized = hostname.toLowerCase();
  return allowedHosts.some((allowed) => normalized === allowed || normalized.endsWith(`.${allowed}`));
}

function isProxyPath(pathname) {
  return pathname === '/proxy' || pathname === '/proxy/';
}

function buildForwardHeaders(incomingHeaders) {
  const result = new Headers();
  const userAgent = process.env.XTREAM_PROXY_UA ?? 'Mozilla/5.0 (compatible; IPTVProxy/1.0)';
  result.set('User-Agent', userAgent);
  result.set('Accept', 'application/json, text/plain, */*');

  const acceptLanguage = incomingHeaders['accept-language'];
  if (acceptLanguage) {
    result.set('Accept-Language', Array.isArray(acceptLanguage) ? acceptLanguage.join(', ') : acceptLanguage);
  }

  return result;
}

function filterResponseHeaders(upstreamHeaders) {
  const headers = {};
  const allowed = ['content-type', 'content-length', 'cache-control', 'expires'];

  for (const [key, value] of upstreamHeaders.entries()) {
    if (allowed.includes(key.toLowerCase())) {
      headers[key] = value;
    }
  }

  return headers;
}

function sendError(res, status, message) {
  res.writeHead(status, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify({ error: message }));
}
