# Samsung TV IPTV Player

Este é o aplicativo IPTV Player otimizado para Samsung Smart TV (Tizen OS).

## 🚀 Como Usar

### 1. Build e Atualização Automática
```bash
# Build completo + atualização do Samsung TV
npm run build:samsung

# Ou separadamente
npm run build
npm run samsung:update
```

### 2. Desenvolvimento
```bash
# Desenvolvimento normal
npm run dev

# Para testar no Samsung TV, faça build primeiro
npm run build:samsung
```

## 📱 Instalação no Samsung TV

### Pré-requisitos
- Samsung TV 2016+ (Tizen 2.4+)
- Tizen Studio instalado
- TV em modo desenvolvedor

### Passos
1. Abra o Tizen Studio
2. Import Project → `iptvplayer/`
3. Build Project
4. Install on Device

## 🛠️ Debug

### Debug no Navegador
Abra `iptvplayer/www/debug.html` em um navegador para diagnosticar problemas:
- ✅ Verificar assets
- 🔍 Testar conexões
- ⚛️ Estado do React
- 📦 Carregamento de scripts

### Debug no Samsung TV
1. Conecte via Developer Mode
2. Use Remote Inspector
3. Verifique console logs

## 📁 Estrutura

```
iptvplayer/
├── config.xml          # Configuração do app Tizen
├── icon.png            # Ícone do app
├── www/
│   ├── index.html      # App principal
│   ├── debug.html      # Página de debug
│   ├── config.js       # Configurações
│   └── assets/         # Scripts e CSS compilados
```

## 🔧 Configuração

### config.xml
- **ID do App**: `uy56nlrDzB.IPTVPlayer`
- **Privilégios**: Internet, Network, Audio, Display
- **Entrada**: `www/index.html`

### Características
- ✅ Navegação por controle remoto
- ✅ Interface otimizada para TV
- ✅ Suporte a IPTV streams
- ✅ Sistema de perfis
- ✅ Favoritos e histórico
- ✅ Proxy CORS integrado

## ⚡ Otimizações Samsung TV

### JavaScript
- Removido `type="module"` para compatibilidade
- Bundle IIFE para execução direta
- Target ES2015 para suporte amplo

### CSS
- Fonte Samsung Sharp Sans
- Foco otimizado para navegação
- Layout responsivo para diferentes TVs

### Performance
- Assets minificados
- Lazy loading de categorias
- Cache otimizado

## 🚨 Troubleshooting

### App não inicia
1. Verifique se `assets/index-*.js` existe
2. Use `debug.html` para diagnosticar
3. Verifique logs no Remote Inspector

### Controle remoto não funciona
1. Verifique privilege `inputdevice`
2. Teste eventos de teclado no debug
3. Verifique foco dos elementos

### Streams não carregam
1. Use `Testar Proxy` no debug
2. Verifique configurações IPTV
3. Teste no navegador primeiro

### Performance lenta
1. Verifique modelo da TV (2016+)
2. Reduza número de categorias exibidas
3. Use proxy local para otimizar requests

## 📝 Logs Úteis

```javascript
// No debug console
console.log(window.tizen ? 'Tizen OK' : 'Tizen Missing');
console.log(window.webapis ? 'WebAPIs OK' : 'WebAPIs Missing');
```

---

**Desenvolvido para Samsung Smart TV - Tizen OS 2.4+**