# 📺 IPTV Player - LG webOS

Aplicação IPTV otimizada para Smart TVs LG com webOS.

## 🚀 Quick Start

### 1. Build do App
```bash
npm run build:lg
```

### 2. Setup da TV LG
```bash
# Configurar sua TV (substitua o IP)
npm run lg:setup minha-tv 192.168.1.100
```

### 3. Instalação Completa
```bash
# Build + Package + Install + Launch em um comando
npm run lg:full minha-tv
```

## 📱 Preparar TV LG

### Ativar Developer Mode
1. **Configurações** > **Geral** > **Sobre esta TV**
2. Pressione no Magic Remote: 🟥🟩🟨🔵🟥🟩🟨🔵
3. Ative **"Developer Mode Status"**
4. Digite qualquer passkey e anote
5. Reinicie a TV

### Instalar webOS CLI (Opcional)
```bash
npm install -g @webosose/ares-cli
```

## 🎮 Magic Remote

### Navegação
- **Direcionais**: ←↑→↓ para navegar
- **OK**: Selecionar/confirmar
- **Back**: Voltar
- **🟥 Vermelho**: Ações rápidas
- **🟩 Verde**: Configurações
- **🟨 Amarelo**: Busca
- **🔵 Azul**: Favoritos

### Cinema Mode
- **Botão colorido especial** para ativar modo cinema
- **Otimizado para TVs OLED** com pretos profundos
- **Controles minimalistas** para experiência imersiva

## 🔧 Debug

### Página Debug Integrada
- Acesse `debug.html` no app para diagnósticos
- Teste de Magic Remote em tempo real
- Informações do sistema webOS
- Console de logs JavaScript

### Debug Remoto
```bash
npm run lg:debug minha-tv
```

## 📋 Comandos Úteis

```bash
# Build apenas
npm run build:lg

# Listar TVs configuradas
node lgwebos/install-lg.mjs list

# Instalar app
npm run lg:install minha-tv

# Iniciar app
npm run lg:launch minha-tv

# Debug console
npm run lg:debug minha-tv

# Limpar builds
npm run lg:clean
```

## 🎯 Features LG webOS

### ✅ Otimizações Implementadas
- **Loading otimizado** com detecção React
- **Magic Remote** mapeamento completo
- **Performance** hardware acceleration
- **Memory management** thermal throttling
- **Gesture navigation** Magic Remote pointer
- **Cinema mode** para OLED
- **Error handling** robusto
- **Debug tools** integradas

### 📱 Compatibilidade
- **webOS 3.0+** (2016+)
- **Resolução**: 1920x1080, 4K
- **Orientação**: Landscape otimizada
- **Magic Remote**: Suporte completo

## ⚡ Performance

### Metrics Típicas
- **Startup**: < 3 segundos
- **Memory**: < 100MB RAM
- **CPU**: Otimizado para ARM TV
- **Network**: Streaming adaptativo

### Thermal Management
- **CPU throttling** automático
- **Animations** reduzidas quando necessário
- **Memory cleanup** periódico

## 🚨 Troubleshooting

### Problemas Comuns

**Tela Preta**
1. Verificar loading screen
2. Acessar `debug.html`
3. Checar console errors

**Magic Remote não responde**
1. Verificar focus management
2. Testar em debug page
3. Confirmar key mappings

**Performance lenta**
1. Ativar thermal-safe mode
2. Reduzir animations
3. Clear storage

**Erro de instalação**
1. Confirmar Developer Mode
2. Verificar SSH key
3. Testar conectividade

### Debug Avançado
```bash
# Logs em tempo real
ares-log --device minha-tv

# Filtrar por app
ares-log --device minha-tv | grep "iptv"

# Performance profiling
ares-inspect --device minha-tv --app com.iptv.player
```

## 🔄 Update Process

### Atualização Rápida
```bash
npm run lg:full minha-tv
```

### Update Manual
```bash
npm run build:lg
npm run lg:install minha-tv
npm run lg:launch minha-tv
```

---

**🎯 Status**: Produção-ready para LG webOS 3.0+  
**📱 Testado**: LG OLED, NanoCell, UHD  
**🎮 Magic Remote**: Suporte completo  
**🔧 Debug**: Tools integradas