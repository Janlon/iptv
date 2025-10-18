#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, copyFileSync, readdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = resolve(__dirname, '..');
const distDir = join(projectRoot, 'dist');
const samsungDir = join(projectRoot, 'iptvplayer', 'www');

console.log('🔧 Atualizando Samsung TV App...');

// 1. Verificar se o build existe
if (!existsSync(distDir)) {
    console.error('❌ Pasta dist não encontrada! Execute npm run build primeiro.');
    process.exit(1);
}

// 2. Copiar assets
const distAssetsDir = join(distDir, 'assets');
const samsungAssetsDir = join(samsungDir, 'assets');

if (existsSync(distAssetsDir)) {
    console.log('📁 Copiando assets...');
    
    // Limpar assets antigos
    if (existsSync(samsungAssetsDir)) {
        const oldFiles = readdirSync(samsungAssetsDir);
        oldFiles.forEach(file => {
            console.log(`🗑️  Removendo asset antigo: ${file}`);
        });
    }
    
    // Copiar novos assets
    const newAssets = readdirSync(distAssetsDir);
    newAssets.forEach(file => {
        const src = join(distAssetsDir, file);
        const dest = join(samsungAssetsDir, file);
        copyFileSync(src, dest);
        console.log(`✅ Copiado: ${file}`);
    });
}

// 3. Copiar config.js
const configSrc = join(distDir, 'config.js');
const configDest = join(samsungDir, 'config.js');

if (existsSync(configSrc)) {
    copyFileSync(configSrc, configDest);
    console.log('✅ Config.js atualizado');
}

// 4. Atualizar index.html para Samsung TV
const distIndexPath = join(distDir, 'index.html');
const samsungIndexPath = join(samsungDir, 'index.html');

if (existsSync(distIndexPath)) {
    let htmlContent = readFileSync(distIndexPath, 'utf8');
    
    // Encontrar o nome do arquivo JS atual
    const jsMatch = htmlContent.match(/src="\/assets\/(index-[^"]+\.js)"/);
    const jsFile = jsMatch ? jsMatch[1] : 'index.js';
    
    // Verificar se já existe um index.html customizado
    if (existsSync(samsungIndexPath)) {
        const existingHTML = readFileSync(samsungIndexPath, 'utf8');
        
        // Se já tem customizações (loading screen, error handling), só atualizar o script
        if (existingHTML.includes('loading-screen') || existingHTML.includes('loadReactApp')) {
            console.log('📝 HTML customizado detectado, atualizando apenas o script...');
            
            const updatedHTML = existingHTML.replace(
                /src="assets\/index-[^"]+\.js"/,
                `src="assets/${jsFile}"`
            ).replace(
                /href="assets\/index-[^"]+\.js"/,
                `href="assets/${jsFile}"`
            );
            
            writeFileSync(samsungIndexPath, updatedHTML, 'utf8');
            console.log(`✅ Script atualizado para ${jsFile} no HTML customizado`);
        } else {
            // Gerar HTML básico
            generateBasicHTML(jsFile, samsungIndexPath);
        }
    } else {
        // Gerar HTML básico
        generateBasicHTML(jsFile, samsungIndexPath);
    }
}

function generateBasicHTML(jsFile, samsungIndexPath) {
function generateBasicHTML(jsFile, samsungIndexPath) {
    const samsungHTML = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IPTV Player</title>
    <script src="$WEBAPIS/webapis/webapis.js"></script>
    <script crossorigin src="assets/${jsFile}"></script>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #000;
        overflow: hidden;
        font-family: 'Samsung Sharp Sans', Arial, sans-serif;
      }
      #root {
        width: 100vw;
        height: 100vh;
      }
      /* Samsung TV optimizations */
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      button:focus {
        outline: 2px solid #00ff00;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

    writeFileSync(samsungIndexPath, samsungHTML, 'utf8');
    console.log(`✅ Index.html básico gerado (usando ${jsFile})`);
}
    console.log(`✅ Index.html atualizado (usando ${jsFile})`);
}

// 5. Verificar config.xml
const configXmlPath = join(projectRoot, 'iptvplayer', 'config.xml');
if (existsSync(configXmlPath)) {
    let configXml = readFileSync(configXmlPath, 'utf8');
    
    // Verificar se está apontando para o arquivo correto
    if (configXml.includes('www/debug.html')) {
        configXml = configXml.replace('www/debug.html', 'www/index.html');
        writeFileSync(configXmlPath, configXml, 'utf8');
        console.log('✅ Config.xml atualizado para usar index.html');
    }
}

console.log('🎉 Samsung TV App atualizado com sucesso!');
console.log('');
console.log('📋 Próximos passos:');
console.log('1. Abra o Tizen Studio');
console.log('2. Import o projeto iptvplayer');
console.log('3. Build & Package o projeto');
console.log('4. Install no Samsung TV');
console.log('');
console.log('🛠️  Para debug: abra www/debug.html no navegador');