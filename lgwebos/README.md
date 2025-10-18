# LG webOS Build Scripts

Scripts para construir e empacotar o IPTV Player para LG webOS Smart TVs.

## 📋 Pré-requisitos

### 1. Node.js e NPM
```bash
# Verificar instalação
node --version
npm --version
```

### 2. LG webOS CLI (Opcional para IPK)
```bash
# Instalar globalmente
npm install -g @webosose/ares-cli

# Verificar instalação
ares-package --version
ares-install --version
```

## 🚀 Build Process

### Build Automático
```bash
# Executar build completo
node lgwebos/build-lg.js

# Ou via npm script
npm run build:lg
```

### Build Manual

1. **Build React App**
   ```bash
   npm run build
   ```

2. **Copiar arquivos para LG**
   ```bash
   cp lgwebos/appinfo.json lgwebos/dist/
   cp lgwebos/index.html lgwebos/dist/
   cp lgwebos/lgwebos.css lgwebos/dist/
   cp -r dist/assets lgwebos/dist/
   ```

3. **Criar pacote IPK (opcional)**
   ```bash
   cd lgwebos
   ares-package dist/
   ```

## 📁 Estrutura de Saída

```
lgwebos/dist/
├── appinfo.json          # Metadados do app LG
├── index.html           # HTML otimizado para webOS
├── lgwebos.css          # Estilos específicos LG
├── debug.html           # Página de debug
├── manifest.json        # Manifest Web App
├── icon.png            # Ícone do app
└── assets/             # Assets React compilados
    ├── index-[hash].js
    ├── index-[hash].css
    └── ...
```

## 📱 Instalação na TV

### Método 1: Developer Mode

1. **Ativar Developer Mode na TV LG**
   - Settings > General > About This TV
   - Pressionar 🟥🟩🟨🔵🟥🟩🟨🔵 no Magic Remote
   - Ativar "Developer Mode Status"

2. **Configurar webOS CLI**
   ```bash
   # Adicionar TV como device
   ares-setup-device --add lg-tv --info "{'ip':'192.168.1.XXX','port':'22','username':'developer'}"
   
   # Configurar chave SSH
   ares-novacom --device lg-tv --getkey
   ```

3. **Instalar App**
   ```bash
   # Com IPK
   ares-install --device lg-tv app.ipk
   
   # Ou diretamente da pasta
   ares-install --device lg-tv lgwebos/dist/
   ```

### Método 2: USB (Desenvolvimento)

1. Copiar pasta `lgwebos/dist/` para pendrive
2. Renomear para nome do app (ex: `iptv-player/`)
3. Inserir USB na TV
4. Apps > Meus Apps > USB Apps

## 🔧 Debug e Desenvolvimento

### Debug Console
```bash
# Abrir debug console da TV
ares-inspect --device lg-tv --app com.iptv.player

# Ou via browser
http://[TV_IP]:9998/
```

### Página Debug Integrada
Acesse `debug.html` no app para:
- Informações do sistema
- Teste de rede
- Debug Magic Remote
- Performance monitoring
- Console logs

### Log Remoto
```bash
# Ver logs em tempo real
ares-log --device lg-tv --app com.iptv.player
```

## 🎮 Magic Remote Testing

### Simulação no Browser
```javascript
// Simular teclas LG no browser
document.dispatchEvent(new KeyboardEvent('keydown', {
    keyCode: 403, // Red button
    which: 403
}));
```

### Mapeamento de Teclas
- **Direcionais**: 37,38,39,40 (←↑→↓)
- **OK/Enter**: 13
- **Back**: 461, 8, 27
- **Cores**: 403🟥, 404🟩, 405🟨, 406🔵
- **Mídia**: 415▶️, 19⏸️, 413⏹️

## 📊 Performance

### Otimizações Aplicadas
- Hardware acceleration CSS
- Thermal throttling prevention
- Memory efficient animations
- Gesture navigation
- OLED cinema mode

### Monitoramento
- Memory usage tracking
- Network connectivity status
- Frame rate monitoring
- Error reporting

## 🚨 Troubleshooting

### Problemas Comuns

1. **Tela Preta**
   - Verificar loading screen
   - Checar console errors
   - Testar em debug.html

2. **Magic Remote não funciona**
   - Verificar mapeamento de teclas
   - Testar focus management
   - Usar debug page para capturar eventos

3. **Performance lenta**
   - Reduzir animations
   - Ativar thermal-safe mode
   - Verificar memory leaks

4. **Erro de instalação**
   - Verificar Developer Mode
   - Confirmar SSH key
   - Checar network connectivity

### Logs de Debug
```bash
# Ver todos os logs
ares-log --device lg-tv

# Filtrar por app
ares-log --device lg-tv | grep "iptv"

# Logs de JavaScript
ares-inspect --device lg-tv --app com.iptv.player
```

## 🔄 Update Process

### Atualização via CLI
```bash
# Rebuild e reinstall
npm run build:lg
ares-install --device lg-tv lgwebos/dist/
```

### Hot Reload (Desenvolvimento)
```bash
# Servidor de desenvolvimento
ares-server --device lg-tv --app com.iptv.player
```

## 📋 Scripts Úteis

```bash
# Build completo
npm run build:lg

# Apenas empacotar
npm run package:lg

# Instalar na TV
npm run install:lg

# Debug remoto
npm run debug:lg

# Limpar build
npm run clean:lg
```

## 🎯 Próximos Passos

1. **Testing automatizado**
   - Unit tests para LG APIs
   - E2E testing no webOS
   - Magic Remote simulation

2. **CI/CD Pipeline**
   - Auto build IPK
   - Deploy para multiple TVs
   - Version management

3. **Advanced Features**
   - Voice control integration
   - Screen mirroring
   - Multi-room sync

---

📺 **LG webOS IPTV Player** - Versão otimizada para Smart TVs LG