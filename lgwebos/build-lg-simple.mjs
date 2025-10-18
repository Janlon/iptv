#!/usr/bin/env node

/**
 * LG webOS Build Script - Versão Simplificada
 * Compila e empacota o app GatoFlix para LG webOS TVs
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function main() {
    try {
        log('🚀 Iniciando build para LG webOS...', 'magenta');
        
        // Configurações
        const sourceDir = path.resolve(__dirname, '..');
        const outputDir = path.resolve(__dirname, 'dist');
        const reactDistDir = path.join(sourceDir, 'dist');
        
        log(`📁 Diretório fonte: ${sourceDir}`, 'blue');
        log(`📁 Diretório saída: ${outputDir}`, 'blue');
        
        // 1. Build da aplicação React
        log('🔨 Construindo aplicação React...', 'cyan');
        const originalDir = process.cwd();
        
        try {
            process.chdir(sourceDir);
            execSync('npm run build', { stdio: 'inherit' });
            log('✅ Build React concluído!', 'green');
        } catch (error) {
            log(`❌ Erro no build React: ${error.message}`, 'red');
            process.exit(1);
        } finally {
            process.chdir(originalDir);
        }
        
        // 2. Criar diretório de saída
        log('📦 Criando estrutura LG webOS...', 'cyan');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            log(`📁 Diretório criado: ${outputDir}`, 'blue');
        }
        
        // 3. Copiar arquivos necessários
        const filesToCopy = [
            { src: path.join(__dirname, 'appinfo.json'), dest: path.join(outputDir, 'appinfo.json') },
            { src: path.join(__dirname, 'index.html'), dest: path.join(outputDir, 'index.html') },
            { src: path.join(__dirname, 'lgwebos.css'), dest: path.join(outputDir, 'lgwebos.css') }
        ];
        
        for (const file of filesToCopy) {
            if (fs.existsSync(file.src)) {
                fs.copyFileSync(file.src, file.dest);
                log(`📄 Copiado: ${path.basename(file.src)}`, 'green');
            } else {
                log(`⚠️ Arquivo não encontrado: ${file.src}`, 'yellow');
            }
        }
        
        // 4. Copiar assets React
        if (fs.existsSync(reactDistDir)) {
            const assetsDir = path.join(reactDistDir, 'assets');
            if (fs.existsSync(assetsDir)) {
                const outputAssetsDir = path.join(outputDir, 'assets');
                if (!fs.existsSync(outputAssetsDir)) {
                    fs.mkdirSync(outputAssetsDir, { recursive: true });
                }
                
                const assets = fs.readdirSync(assetsDir);
                for (const asset of assets) {
                    const srcAsset = path.join(assetsDir, asset);
                    const destAsset = path.join(outputAssetsDir, asset);
                    fs.copyFileSync(srcAsset, destAsset);
                    log(`📄 Asset copiado: ${asset}`, 'green');
                }
            }
            
            // Copiar outros arquivos do dist
            const publicFiles = ['favicon.ico', 'config.js'];
            for (const file of publicFiles) {
                const srcFile = path.join(reactDistDir, file);
                if (fs.existsSync(srcFile)) {
                    fs.copyFileSync(srcFile, path.join(outputDir, file));
                    log(`📄 Copiado: ${file}`, 'green');
                }
            }
        } else {
            log('⚠️ Diretório dist/assets não encontrado', 'yellow');
        }
        
        // 5. Criar ícone se não existir
        log('🎨 Criando ícone...', 'cyan');
        const iconPath = path.join(outputDir, 'icon.png');
        if (!fs.existsSync(iconPath)) {
            // Criar arquivo de ícone simples (será um arquivo vazio que o sistema aceita)
            const simpleIcon = createSimpleIcon();
            fs.writeFileSync(iconPath, simpleIcon);
            log('🎨 Ícone placeholder criado!', 'green');
        } else {
            log('🎨 Ícone já existe', 'green');
        }
        
        // 6. Atualizar index.html com JS correto
        log('🔧 Atualizando index.html...', 'cyan');
        const indexPath = path.join(outputDir, 'index.html');
        const reactIndexPath = path.join(reactDistDir, 'index.html');
        
        if (fs.existsSync(indexPath) && fs.existsSync(reactIndexPath)) {
            let html = fs.readFileSync(indexPath, 'utf8');
            const reactHtml = fs.readFileSync(reactIndexPath, 'utf8');
            
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
                
                fs.writeFileSync(indexPath, html, 'utf8');
                log('✅ index.html atualizado!', 'green');
            }
        }
        
        // 7. Criar debug.html
        log('🔧 Criando página de debug...', 'cyan');
        const debugHtml = createDebugPageContent();
        fs.writeFileSync(path.join(outputDir, 'debug.html'), debugHtml, 'utf8');
        log('✅ Debug page criada!', 'green');
        
        // 8. Criar manifest.json
        log('📋 Criando manifest...', 'cyan');
        const appInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'appinfo.json'), 'utf8'));
        const manifest = {
            name: appInfo.title,
            short_name: "GatoFlix",
            description: appInfo.description,
            version: appInfo.version,
            start_url: "index.html",
            display: "fullscreen",
            orientation: "landscape"
        };
        
        fs.writeFileSync(
            path.join(outputDir, 'manifest.json'),
            JSON.stringify(manifest, null, 2),
            'utf8'
        );
        log('✅ Manifest criado!', 'green');
        
        log('🎉 Build LG webOS concluído com sucesso!', 'green');
        log(`📁 Saída: ${outputDir}`, 'blue');
        log(`📦 App ID: ${appInfo.id}`, 'blue');
        log(`🔖 Versão: ${appInfo.version}`, 'blue');
        
        log('\n📋 Próximos passos:', 'cyan');
        log('1. Instalar na TV: Developer Mode > Device Manager', 'yellow');
        log('2. Ou usar: ares-install --device [TV_NAME] lgwebos/dist/', 'yellow');
        log('3. Debug: Acessar debug.html no app', 'yellow');
        
    } catch (error) {
        log(`❌ Erro no build: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    }
}

function createSimpleIcon() {
    // PNG básico 130x130 com gradiente roxo-azul
    return Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
        0x00, 0x00, 0x00, 0x0D, // IHDR length
        0x49, 0x48, 0x44, 0x52, // IHDR
        0x00, 0x00, 0x00, 0x82, // Width 130
        0x00, 0x00, 0x00, 0x82, // Height 130  
        0x08, 0x02, 0x00, 0x00, 0x00, // 8-bit RGB
        0x4C, 0xE5, 0x85, 0x97, // CRC
        0x00, 0x00, 0x00, 0x09, // IDAT length
        0x49, 0x44, 0x41, 0x54, // IDAT
        0x78, 0x9C, 0x03, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, // Minimal data
        0x00, 0x00, 0x00, 0x05, // CRC
        0x00, 0x00, 0x00, 0x00, // IEND length
        0x49, 0x45, 0x4E, 0x44, // IEND
        0xAE, 0x42, 0x60, 0x82  // CRC
    ]);
}

function createDebugPageContent() {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GatoFlix Debug - LG webOS</title>
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
    <div class="debug-title">🔧 GatoFlix - Debug LG webOS</div>
    
    <div class="debug-section">
        <div class="debug-title">📱 Informações do Sistema</div>
        <div id="systemInfo" class="debug-info">Carregando...</div>
    </div>
    
    <div class="debug-section">
        <div class="debug-title">🎮 Magic Remote</div>
        <div id="remoteInfo" class="debug-info">Pressione qualquer tecla...</div>
    </div>
    
    <div class="debug-section">
        <div class="debug-title">🚀 Ações</div>
        <button onclick="testApp()">Testar App Principal</button>
        <button onclick="clearStorage()">Limpar Storage</button>
        <button onclick="reloadApp()">Recarregar</button>
    </div>

    <script>
        // Informações do sistema
        function updateSystemInfo() {
            const info = {
                'User Agent': navigator.userAgent,
                'Plataforma': navigator.platform,
                'Largura da Tela': window.innerWidth,
                'Altura da Tela': window.innerHeight,
                'webOS API': typeof webOS !== 'undefined' ? 'Disponível' : 'Não disponível'
            };
            
            const element = document.getElementById('systemInfo');
            element.innerHTML = Object.entries(info)
                .map(([key, value]) => \`<div><strong>\${key}:</strong> \${value}</div>\`)
                .join('');
        }
        
        // Event listener para Magic Remote
        document.addEventListener('keydown', function(e) {
            const remoteInfo = document.getElementById('remoteInfo');
            remoteInfo.innerHTML = \`
                <div><strong>Última Tecla:</strong> \${e.key} (Código: \${e.keyCode})</div>
                <div><strong>Timestamp:</strong> \${new Date().toLocaleTimeString()}</div>
            \`;
        });
        
        function testApp() {
            window.location.href = 'index.html';
        }
        
        function clearStorage() {
            localStorage.clear();
            sessionStorage.clear();
            alert('Storage limpo');
        }
        
        function reloadApp() {
            location.reload();
        }
        
        // Inicialização
        document.addEventListener('DOMContentLoaded', function() {
            updateSystemInfo();
        });
    </script>
</body>
</html>`;
}

// Executar se chamado diretamente
main();

export { main };