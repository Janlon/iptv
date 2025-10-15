import { AuthCredentials } from '../auth/AuthContext';

export interface ConnectionTestResult {
  success: boolean;
  error?: string;
  latency?: number;
}

export async function testConnection(credentials: AuthCredentials): Promise<ConnectionTestResult> {
  try {
    const startTime = Date.now();
    
    // Teste básico de conectividade com a API do servidor
    const response = await fetch(`${credentials.baseUrl}/player_api.php?username=${credentials.username}&password=${credentials.password}&action=get_server_info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10 segundos de timeout
    });

    const latency = Date.now() - startTime;

    if (!response.ok) {
      return {
        success: false,
        error: `Erro HTTP ${response.status}: ${response.statusText}`,
        latency
      };
    }

    const data = await response.json();
    
    // Verifica se a resposta contém informações válidas do servidor
    if (data && (data.server_info || data.user_info)) {
      return {
        success: true,
        latency
      };
    } else {
      return {
        success: false,
        error: 'Resposta inválida do servidor',
        latency
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Timeout - Servidor não respondeu em 10 segundos'
        };
      }
      return {
        success: false,
        error: error.message
      };
    }
    return {
      success: false,
      error: 'Erro desconhecido'
    };
  }
}