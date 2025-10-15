import { describe, expect, it } from 'vitest';
import { createXtreamUrl } from './api';

describe('createXtreamUrl', () => {
  it('normaliza URLs sem barra final', () => {
    const url = createXtreamUrl('http://example.com', 'player_api.php', {
      username: 'user',
      password: 'pass',
      action: 'get_vod_categories'
    });

    expect(url).toBe('http://example.com/player_api.php?username=user&password=pass&action=get_vod_categories');
  });

  it('ignora parâmetros indefinidos', () => {
    const url = createXtreamUrl('http://example.com/', 'player_api.php', {
      username: 'user',
      password: 'pass',
      category_id: undefined
    });

    expect(url).toBe('http://example.com/player_api.php?username=user&password=pass');
  });
});
