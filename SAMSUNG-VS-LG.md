# 📺 IPTV Player - Comparação Samsung vs LG

Documentação das diferenças entre as versões Samsung Tizen e LG webOS.

## 🏗️ Estrutura de Arquivos

### Samsung Tizen
```
iptvplayer/
├── config.xml          # Configuração Tizen
├── index.html          # Samsung-optimized
├── icon.png            # 117x117px
└── css/
    └── style.css       # Samsung-specific
```

### LG webOS
```
lgwebos/
├── appinfo.json        # Configuração webOS
├── index.html          # LG-optimized
├── icon.png            # 130x130px
└── lgwebos.css         # webOS-specific
```

## 🎮 Controle Remoto

### Samsung Smart Remote
```javascript
// Samsung Key Mapping
const SAMSUNG_KEYS = {
    37: 'left',    // ←
    38: 'up',      // ↑  
    39: 'right',   // →
    40: 'down',    // ↓
    13: 'enter',   // OK
    10009: 'back', // Return
    
    // Botões coloridos Samsung
    403: 'red',    // 🟥
    404: 'green',  // 🟩
    405: 'yellow', // 🟨
    406: 'blue'    // 🔵
};
```

### LG Magic Remote
```javascript
// LG Key Mapping
const LG_KEYS = {
    37: 'left',    // ←
    38: 'up',      // ↑
    39: 'right',   // →
    40: 'down',    // ↓
    13: 'enter',   // OK
    461: 'back',   // Back
    
    // Botões coloridos LG
    403: 'red',    // 🟥
    404: 'green',  // 🟩
    405: 'yellow', // 🟨
    406: 'blue',   // 🔵
    
    // Magic Remote específicos
    415: 'play',   // ▶️
    19: 'pause',   // ⏸️
    457: 'info'    // ℹ️
};
```

## 🚀 Build Process

### Samsung Tizen
```bash
# Build Samsung
npm run build:samsung

# Output: iptvplayer/ (WGT package)
# Install: Samsung TV SDK
# Deploy: tizen install --name MyTV -- iptvplayer.wgt
```

### LG webOS
```bash
# Build LG
npm run build:lg

# Output: lgwebos/dist/ (IPK package)
# Install: webOS CLI
# Deploy: ares-install --device MyTV lgwebos/dist/
```

## 📱 APIs Específicas

### Samsung Tizen APIs
```javascript
// Samsung Device Info
if (typeof tizen !== 'undefined') {
    tizen.systeminfo.getPropertyValue('DEVICE', function(device) {
        console.log('Samsung Model:', device.model);
    });
}

// Samsung Key Registration
document.addEventListener('keydown', function(e) {
    if (e.keyCode === 10009) { // Samsung Return
        tizen.application.getCurrentApplication().exit();
    }
});
```

### LG webOS APIs
```javascript
// LG Device Info
if (typeof webOS !== 'undefined') {
    webOS.deviceInfo(function(info) {
        console.log('LG Model:', info.modelName);
        console.log('webOS Version:', info.sdkVersion);
    });
}

// LG Service Calls
webOS.service.request('luna://com.webos.service.tv.systemproperty', {
    method: 'getSystemInfo',
    parameters: { 'keys': ['modelName', 'firmwareVersion'] },
    onSuccess: function(result) {
        console.log('LG System Info:', result);
    }
});
```

## 🎨 UI/UX Differences

### Samsung Design Guidelines
- **Accent Color**: #1428A0 (Samsung Blue)
- **Focus Style**: Blue outline with shadow
- **Grid Layout**: 16:9 optimized
- **Typography**: Samsung One UI fonts
- **Remote Navigation**: D-pad focused

### LG Design Guidelines  
- **Accent Color**: #00FF00 (LG Green)
- **Focus Style**: Green outline with glow
- **Grid Layout**: Magic Remote pointer optimized
- **Typography**: LG Smart UI fonts
- **Remote Navigation**: Point & click + D-pad

## ⚡ Performance Optimizations

### Samsung Tizen
```css
/* Tizen GPU Acceleration */
.tizen-optimized {
    transform: translate3d(0,0,0);
    -webkit-transform: translate3d(0,0,0);
}

/* Tizen Memory Management */
.tizen-efficient {
    will-change: auto;
    contain: layout style paint;
}
```

### LG webOS
```css
/* webOS Hardware Acceleration */
.webos-optimized {
    transform: translateZ(0);
    backface-visibility: hidden;
}

/* webOS Thermal Management */
.webos-thermal-safe {
    animation-duration: 0.5s; /* Reduced for performance */
    transition-duration: 0.2s;
}
```

## 🔧 Development Tools

### Samsung Tizen Studio
- **IDE**: Tizen Studio IDE
- **Simulator**: Tizen TV Emulator
- **Debug**: Chrome DevTools via network
- **Package**: `tizen package`
- **Install**: `tizen install`

### LG webOS SDK
- **CLI**: ares-cli tools
- **Simulator**: webOS TV Simulator
- **Debug**: ares-inspect
- **Package**: `ares-package`
- **Install**: `ares-install`

## 📊 Platform Capabilities

### Samsung Tizen Features
| Feature | Support | Notes |
|---------|---------|-------|
| 4K Video | ✅ | Native HEVC support |
| HDR | ✅ | HDR10, HDR10+ |
| DRM | ✅ | PlayReady, Widevine |
| Voice Control | ✅ | Bixby integration |
| Multi-room | ✅ | SmartThings |

### LG webOS Features
| Feature | Support | Notes |
|---------|---------|-------|
| 4K Video | ✅ | Native HEVC support |
| HDR | ✅ | HDR10, Dolby Vision |
| DRM | ✅ | PlayReady, Widevine |
| Voice Control | ✅ | LG ThinQ AI |
| Multi-room | ✅ | LG ThinQ |

## 🐛 Common Issues

### Samsung Tizen Issues
```javascript
// Issue: Black screen on load
// Solution: Tizen-specific loading detection
function waitForTizen() {
    if (typeof tizen === 'undefined') {
        setTimeout(waitForTizen, 100);
    } else {
        initializeApp();
    }
}

// Issue: Memory leaks
// Solution: Proper cleanup
tizen.application.addEventListener('lowmemory', function() {
    // Clean up resources
    clearInterval(intervals);
    removeEventListeners();
});
```

### LG webOS Issues
```javascript
// Issue: Magic Remote pointer lag
// Solution: Optimize pointer events
document.addEventListener('mousemove', throttle(function(e) {
    updatePointer(e.clientX, e.clientY);
}, 16)); // 60fps

// Issue: Performance degradation
// Solution: Thermal monitoring
function monitorThermalState() {
    if (performance.memory?.usedJSHeapSize > 50 * 1024 * 1024) {
        enableThermalSafeMode();
    }
}
```

## 📦 Package Specifications

### Samsung .wgt Package
```xml
<!-- config.xml -->
<widget xmlns="http://www.w3.org/ns/widgets" id="http://iptv.player.samsung">
    <name>IPTV Player</name>
    <icon src="icon.png"/>
    <content src="index.html"/>
    <feature name="http://tizen.org/feature/screen.size.all"/>
    <tizen:application id="iptv.player" package="iptv.player" required_version="6.0"/>
</widget>
```

### LG .ipk Package
```json
// appinfo.json
{
    "id": "com.iptv.player",
    "version": "1.0.0",
    "vendor": "IPTV Player",
    "type": "web",
    "main": "index.html",
    "icon": "icon.png",
    "resolution": "1920x1080",
    "requestedWindowOrientation": "landscape"
}
```

## 🎯 Deployment Summary

### Samsung Tizen Deployment
1. **Build**: `npm run build:samsung`
2. **Package**: Auto WGT creation
3. **Install**: Via Samsung TV SDK or Developer Mode
4. **Launch**: Samsung Apps or via SDK

### LG webOS Deployment
1. **Build**: `npm run build:lg`
2. **Package**: `ares-package dist/`
3. **Install**: `ares-install --device TV dist/`
4. **Launch**: `ares-launch --device TV com.iptv.player`

---

**🎯 Recomendação**: Use Samsung para melhor performance de video, LG para melhor experiência de navegação com Magic Remote.

**📊 Cobertura**: Samsung ~35% mercado global, LG ~20% mercado global.

**🔧 Manutenção**: Ambas plataformas requerem updates regulares para compatibilidade com novos modelos.