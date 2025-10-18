#!/usr/bin/env node

/**
 * LG webOS Build Script
 * Compila e empacota o app IPTV para LG webOS TVs
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Iniciando build para LG webOS...');

// Configurações
const config = {
    sourceDir: path.resolve(__dirname, '..'),
    buildDir: path.resolve(__dirname, '..', 'dist'),
    lgDir: path.resolve(__dirname),
    outputDir: path.resolve(__dirname, 'dist'),
    appInfo: JSON.parse(fs.readFileSync(path.join(__dirname, 'appinfo.json'), 'utf8'))
};

// Cores para logs
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function createDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        log(`📁 Diretório criado: ${dir}`, 'blue');
    }
}

function copyFile(src, dest) {
    try {
        fs.copyFileSync(src, dest);
        log(`📄 Copiado: ${path.basename(src)}`, 'green');
    } catch (error) {
        log(`❌ Erro ao copiar ${src}: ${error.message}`, 'red');
    }
}

function copyDirectory(src, dest) {
    if (!fs.existsSync(src)) {
        log(`⚠️ Diretório fonte não encontrado: ${src}`, 'yellow');
        return;
    }
    
    createDirectory(dest);
    
    const items = fs.readdirSync(src);
    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        if (fs.statSync(srcPath).isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            copyFile(srcPath, destPath);
        }
    }
}

async function buildReactApp() {
    log('🔨 Construindo aplicação React...', 'cyan');
    
    try {
        // Salvar diretório atual
        const originalDir = process.cwd();
        
        // Executar build do Vite
        process.chdir(config.sourceDir);
        execSync('npm run build', { stdio: 'inherit' });
        
        // Voltar ao diretório original
        process.chdir(originalDir);
        
        log('✅ Build React concluído!', 'green');
        return true;
    } catch (error) {
        log(`❌ Erro no build React: ${error.message}`, 'red');
        return false;
    }
}

function createLGWebOSStructure() {
    log('📦 Criando estrutura LG webOS...', 'cyan');
    
    // Criar diretório de saída
    createDirectory(config.outputDir);
    
    // Copiar appinfo.json
    const appInfoPath = path.join(config.outputDir, 'appinfo.json');
    copyFile(path.join(config.lgDir, 'appinfo.json'), appInfoPath);
    
    // Copiar assets do build React
    const reactDistDir = path.join(config.sourceDir, 'dist');
    if (fs.existsSync(reactDistDir)) {
        log('📁 Copiando assets React...', 'blue');
        
        // Copiar todos os assets
        const assetsDir = path.join(reactDistDir, 'assets');
        if (fs.existsSync(assetsDir)) {
            copyDirectory(assetsDir, path.join(config.outputDir, 'assets'));
        }
        
        // Copiar favicon e outros arquivos públicos
        const publicFiles = ['favicon.ico', 'config.js'];
        for (const file of publicFiles) {
            const srcFile = path.join(reactDistDir, file);
            if (fs.existsSync(srcFile)) {
                copyFile(srcFile, path.join(config.outputDir, file));
            }
        }
    } else {
        log('⚠️ Diretório dist não encontrado. Execute o build React primeiro.', 'yellow');
    }
    
    // Copiar index.html personalizado para LG
    copyFile(
        path.join(config.lgDir, 'index.html'),
        path.join(config.outputDir, 'index.html')
    );
    
    // Copiar CSS específico LG
    copyFile(
        path.join(config.lgDir, 'lgwebos.css'),
        path.join(config.outputDir, 'lgwebos.css')
    );
    
    // Criar icon.png se não existir
    const iconPath = path.join(config.outputDir, 'icon.png');
    if (!fs.existsSync(iconPath)) {
        log('🎨 Criando ícone padrão...', 'yellow');
        // Copiar do assets ou criar um placeholder
        const srcIcon = path.join(config.sourceDir, 'public', 'favicon.ico');
        if (fs.existsSync(srcIcon)) {
            copyFile(srcIcon, iconPath);
        }
    }
}

function updateIndexHtml() {
    log('🔧 Atualizando index.html para LG webOS...', 'cyan');
    
    const indexPath = path.join(config.outputDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
        log('❌ index.html não encontrado!', 'red');
        return;
    }
    
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Encontrar o nome do arquivo JS principal
    const reactDistDir = path.join(config.sourceDir, 'dist');
    const indexReactPath = path.join(reactDistDir, 'index.html');
    
    if (fs.existsSync(indexReactPath)) {
        const reactHtml = fs.readFileSync(indexReactPath, 'utf8');
        
        // Extrair nome do arquivo JS
        const scriptMatch = reactHtml.match(/assets\/(index-[^"]+\.js)/);
        if (scriptMatch) {
            const jsFileName = scriptMatch[1];
            log(`📄 JS principal encontrado: ${jsFileName}`, 'green');
            
            // Atualizar no HTML LG
            html = html.replace(
                'assets/index-DQQCVh5Z.js',
                `assets/${jsFileName}`
            );
            
            // Salvar HTML atualizado
            fs.writeFileSync(indexPath, html, 'utf8');
            log('✅ index.html atualizado com JS correto!', 'green');
        } else {
            log('⚠️ Não foi possível encontrar arquivo JS principal', 'yellow');
        }
    }
}

function createIPKPackage() {
    log('📦 Preparando para criar pacote IPK...', 'cyan');
    
    // Verificar se webOS CLI está instalado
    try {
        execSync('ares-package --version', { stdio: 'ignore' });
        log('✅ webOS CLI encontrado!', 'green');
        
        // Criar pacote IPK
        const packageName = `${config.appInfo.id}_${config.appInfo.version}_all.ipk`;
        const cmd = `ares-package "${config.outputDir}"`;
        
        log(`🔨 Executando: ${cmd}`, 'blue');
        execSync(cmd, { stdio: 'inherit', cwd: path.dirname(config.outputDir) });
        
        log(`📦 Pacote IPK criado: ${packageName}`, 'green');
        
    } catch (error) {
        log('⚠️ webOS CLI não encontrado. Instale com:', 'yellow');
        log('npm install -g @webosose/ares-cli', 'yellow');
        log('Ou faça a instalação manual na TV LG', 'yellow');
    }
}

function createDebugPage() {
    log('🔧 Criando página de debug...', 'cyan');
    
    const debugHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IPTV Debug - LG webOS</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #000;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 14px;
        }
        .debug-section {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #333;
            border-radius: 5px;
            background: rgba(0, 255, 0, 0.05);
        }
        .debug-title {
            color: #00ffff;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .debug-info {
            margin: 5px 0;
            padding: 5px;
        }
        .debug-error {
            color: #ff4444;
            background: rgba(255, 68, 68, 0.1);
            padding: 10px;
            border-radius: 3px;
        }
        .debug-success {
            color: #44ff44;
            background: rgba(68, 255, 68, 0.1);
            padding: 10px;
            border-radius: 3px;
        }
        button {
            background: #333;
            color: #00ff00;
            border: 1px solid #00ff00;
            padding: 10px 20px;
            margin: 5px;
            border-radius: 3px;
            cursor: pointer;
            font-family: inherit;
        }
        button:focus {
            outline: 2px solid #00ff00;
            background: #444;
        }
    </style>
</head>
<body>
    <div class="debug-title">🔧 IPTV Player - Debug LG webOS</div>
    
    <div class="debug-section">
        <div class="debug-title">📱 Informações do Sistema</div>
        <div id="systemInfo" class="debug-info">Carregando...</div>
    </div>
    
    <div class="debug-section">
        <div class="debug-title">🌐 Informações de Rede</div>
        <div id="networkInfo" class="debug-info">Carregando...</div>
    </div>
    
    <div class="debug-section">
        <div class="debug-title">🎮 Magic Remote</div>
        <div id="remoteInfo" class="debug-info">Pressione qualquer tecla...</div>
    </div>
    
    <div class="debug-section">
        <div class="debug-title">📊 Performance</div>
        <div id="performanceInfo" class="debug-info">Carregando...</div>
    </div>
    
    <div class="debug-section">
        <div class="debug-title">🚀 Ações</div>
        <button onclick="testApp()">Testar App Principal</button>
        <button onclick="testNetwork()">Testar Rede</button>
        <button onclick="clearStorage()">Limpar Storage</button>
        <button onclick="reloadApp()">Recarregar</button>
    </div>
    
    <div class="debug-section">
        <div class="debug-title">📝 Console Log</div>
        <div id="consoleLog" class="debug-info" style="max-height: 200px; overflow-y: auto;"></div>
    </div>

    <script>
        // Capturar logs do console
        const originalLog = console.log;
        const originalError = console.error;
        const logs = [];
        
        function addLog(message, type = 'log') {
            logs.push({ message, type, time: new Date().toLocaleTimeString() });
            updateConsoleDisplay();
        }
        
        console.log = function(...args) {
            originalLog.apply(console, args);
            addLog(args.join(' '), 'log');
        };
        
        console.error = function(...args) {
            originalError.apply(console, args);
            addLog(args.join(' '), 'error');
        };
        
        function updateConsoleDisplay() {
            const consoleDiv = document.getElementById('consoleLog');
            consoleDiv.innerHTML = logs.slice(-10).map(log => 
                \`<div class="debug-\${log.type === 'error' ? 'error' : 'success'}">
                    [\${log.time}] \${log.message}
                </div>\`
            ).join('');
            consoleDiv.scrollTop = consoleDiv.scrollHeight;
        }
        
        // Informações do sistema
        function updateSystemInfo() {
            const info = {
                'User Agent': navigator.userAgent,
                'Plataforma': navigator.platform,
                'Idioma': navigator.language,
                'Cookies Habilitados': navigator.cookieEnabled,
                'Online': navigator.onLine,
                'Largura da Tela': window.innerWidth,
                'Altura da Tela': window.innerHeight,
                'webOS API': typeof webOS !== 'undefined' ? 'Disponível' : 'Não disponível'
            };
            
            if (typeof webOS !== 'undefined' && webOS.deviceInfo) {
                webOS.deviceInfo(function(deviceInfo) {
                    Object.assign(info, {
                        'Modelo TV': deviceInfo.modelName || 'N/A',
                        'Versão webOS': deviceInfo.sdkVersion || 'N/A',
                        'ID do Device': deviceInfo.UHD || 'N/A'
                    });
                    displayInfo('systemInfo', info);
                });
            } else {
                displayInfo('systemInfo', info);
            }
        }
        
        function displayInfo(elementId, info) {
            const element = document.getElementById(elementId);
            element.innerHTML = Object.entries(info)
                .map(([key, value]) => \`<div><strong>\${key}:</strong> \${value}</div>\`)
                .join('');
        }
        
        // Informações de rede
        function updateNetworkInfo() {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const info = {
                'Status': navigator.onLine ? 'Online' : 'Offline',
                'Tipo de Conexão': connection ? connection.effectiveType || connection.type : 'N/A',
                'Downlink': connection ? connection.downlink + ' Mbps' : 'N/A'
            };
            
            displayInfo('networkInfo', info);
        }
        
        // Informações de performance
        function updatePerformanceInfo() {
            const info = {
                'Memória Usada': performance.memory ? 
                    Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + ' MB' : 'N/A',
                'Memória Total': performance.memory ? 
                    Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + ' MB' : 'N/A',
                'Timing Navigation': performance.timing ? 
                    (performance.timing.loadEventEnd - performance.timing.navigationStart) + ' ms' : 'N/A'
            };
            
            displayInfo('performanceInfo', info);
        }
        
        // Event listeners para Magic Remote
        document.addEventListener('keydown', function(e) {
            const remoteInfo = document.getElementById('remoteInfo');
            remoteInfo.innerHTML = \`
                <div><strong>Última Tecla:</strong> \${e.key} (Código: \${e.keyCode})</div>
                <div><strong>Shift:</strong> \${e.shiftKey}</div>
                <div><strong>Ctrl:</strong> \${e.ctrlKey}</div>
                <div><strong>Alt:</strong> \${e.altKey}</div>
                <div><strong>Timestamp:</strong> \${new Date().toLocaleTimeString()}</div>
            \`;
        });
        
        // Funções de teste
        function testApp() {
            console.log('🧪 Testando app principal...');
            window.location.href = 'index.html';
        }
        
        function testNetwork() {
            console.log('🌐 Testando conectividade...');
            fetch('https://httpbin.org/get')
                .then(response => response.json())
                .then(data => {
                    console.log('✅ Teste de rede bem-sucedido:', data);
                    addLog('Rede funcionando corretamente', 'log');
                })
                .catch(error => {
                    console.error('❌ Erro no teste de rede:', error);
                    addLog('Erro de rede: ' + error.message, 'error');
                });
        }
        
        function clearStorage() {
            console.log('🗑️ Limpando localStorage...');
            localStorage.clear();
            sessionStorage.clear();
            addLog('Storage limpo', 'log');
        }
        
        function reloadApp() {
            console.log('🔄 Recarregando aplicação...');
            location.reload();
        }
        
        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🔧 Debug page carregada');
            updateSystemInfo();
            updateNetworkInfo();
            updatePerformanceInfo();
            
            // Atualizar informações periodicamente
            setInterval(() => {
                updateNetworkInfo();
                updatePerformanceInfo();
            }, 5000);
        });
    </script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(config.outputDir, 'debug.html'), debugHtml, 'utf8');
    log('✅ Página de debug criada!', 'green');
}

function generateManifest() {
    log('📋 Gerando manifest.json...', 'cyan');
    
    const manifest = {
        name: config.appInfo.title,
        short_name: "IPTV LG",
        description: config.appInfo.description,
        version: config.appInfo.version,
        author: config.appInfo.vendor,
        icons: [
            {
                src: "icon.png",
                sizes: "130x130",
                type: "image/png"
            }
        ],
        start_url: "index.html",
        display: "fullscreen",
        orientation: "landscape",
        background_color: "#667eea",
        theme_color: "#764ba2"
    };
    
    fs.writeFileSync(
        path.join(config.outputDir, 'manifest.json'),
        JSON.stringify(manifest, null, 2),
        'utf8'
    );
    
    log('✅ Manifest criado!', 'green');
}

async function main() {
    try {
        log('🚀 Iniciando build completo para LG webOS...', 'magenta');
        
        // 1. Build da aplicação React
        const reactBuildSuccess = await buildReactApp();
        if (!reactBuildSuccess) {
            log('❌ Falha no build React. Abortando...', 'red');
            process.exit(1);
        }
        
        // 2. Criar estrutura LG webOS
        createLGWebOSStructure();
        
        // 3. Atualizar index.html com JS correto
        updateIndexHtml();
        
        // 4. Criar página de debug
        createDebugPage();
        
        // 5. Gerar manifest
        generateManifest();
        
        // 6. Tentar criar pacote IPK
        createIPKPackage();
        
        log('🎉 Build LG webOS concluído com sucesso!', 'green');
        log(`📁 Saída: ${config.outputDir}`, 'blue');
        log(`📦 App ID: ${config.appInfo.id}`, 'blue');
        log(`🔖 Versão: ${config.appInfo.version}`, 'blue');
        
        log('\n📋 Próximos passos:', 'cyan');
        log('1. Instalar na TV: Developer Mode > Device Manager', 'yellow');
        log('2. Ou usar: ares-install --device [TV_NAME] app.ipk', 'yellow');
        log('3. Debug: http://[TV_IP]:9998/debug.html', 'yellow');
        
    } catch (error) {
        log(`❌ Erro no build: ${error.message}`, 'red');
        process.exit(1);
    }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { main, config };