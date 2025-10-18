#!/usr/bin/env node

/**
 * LG webOS Installation Script
 * Facilita a instalação do app GatoFlix em TVs LG
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
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

function checkWebOSCLI() {
    try {
        execSync('ares-package --version', { stdio: 'ignore' });
        return true;
    } catch (error) {
        return false;
    }
}

function listDevices() {
    try {
        const output = execSync('ares-device-list', { encoding: 'utf8' });
        return output;
    } catch (error) {
        return null;
    }
}

function setupDevice(deviceName, ip) {
    try {
        log(`🔧 Configurando device ${deviceName} (${ip})...`, 'cyan');
        
        const deviceInfo = `{"ip":"${ip}","port":"22","username":"developer"}`;
        execSync(`ares-setup-device --add ${deviceName} --info '${deviceInfo}'`, { stdio: 'inherit' });
        
        log(`✅ Device ${deviceName} configurado!`, 'green');
        
        // Configurar chave SSH
        log('🔑 Configurando chave SSH...', 'cyan');
        execSync(`ares-novacom --device ${deviceName} --getkey`, { stdio: 'inherit' });
        
        return true;
    } catch (error) {
        log(`❌ Erro ao configurar device: ${error.message}`, 'red');
        return false;
    }
}

function packageApp() {
    try {
        log('📦 Criando pacote IPK...', 'cyan');
        
        const distDir = path.join(__dirname, 'dist');
        if (!fs.existsSync(distDir)) {
            log('❌ Diretório dist não encontrado. Execute o build primeiro!', 'red');
            return null;
        }
        
        execSync(`ares-package "${distDir}"`, { stdio: 'inherit', cwd: __dirname });
        
        // Encontrar arquivo IPK criado
        const files = fs.readdirSync(__dirname);
        const ipkFile = files.find(file => file.endsWith('.ipk'));
        
        if (ipkFile) {
            log(`✅ Pacote criado: ${ipkFile}`, 'green');
            return path.join(__dirname, ipkFile);
        } else {
            log('❌ Arquivo IPK não encontrado', 'red');
            return null;
        }
    } catch (error) {
        log(`❌ Erro ao criar pacote: ${error.message}`, 'red');
        return null;
    }
}

function installApp(deviceName, appPath) {
    try {
        log(`📱 Instalando app no device ${deviceName}...`, 'cyan');
        
        execSync(`ares-install --device ${deviceName} "${appPath}"`, { stdio: 'inherit' });
        
        log('✅ App instalado com sucesso!', 'green');
        return true;
    } catch (error) {
        log(`❌ Erro na instalação: ${error.message}`, 'red');
        return false;
    }
}

function launchApp(deviceName, appId = 'com.gatoflix.player') {
    try {
        log(`🚀 Iniciando app ${appId}...`, 'cyan');
        
        execSync(`ares-launch --device ${deviceName} ${appId}`, { stdio: 'inherit' });
        
        log('✅ App iniciado!', 'green');
        return true;
    } catch (error) {
        log(`❌ Erro ao iniciar app: ${error.message}`, 'red');
        return false;
    }
}

function closeApp(deviceName, appId = 'com.gatoflix.player') {
    try {
        log(`⏹️ Fechando app ${appId}...`, 'cyan');
        
        execSync(`ares-launch --device ${deviceName} --close ${appId}`, { stdio: 'inherit' });
        
        log('✅ App fechado!', 'green');
        return true;
    } catch (error) {
        log(`❌ Erro ao fechar app: ${error.message}`, 'red');
        return false;
    }
}

function uninstallApp(deviceName, appId = 'com.gatoflix.player') {
    try {
        log(`🗑️ Desinstalando app ${appId}...`, 'cyan');
        
        execSync(`ares-uninstall --device ${deviceName} ${appId}`, { stdio: 'inherit' });
        
        log('✅ App desinstalado!', 'green');
        return true;
    } catch (error) {
        log(`❌ Erro ao desinstalar app: ${error.message}`, 'red');
        return false;
    }
}

function showHelp() {
    log('📋 LG webOS Installation Helper', 'magenta');
    log('');
    log('Comandos disponíveis:', 'cyan');
    log('  setup <name> <ip>     - Configurar nova TV LG', 'yellow');
    log('  list                  - Listar devices configurados', 'yellow');
    log('  package               - Criar pacote IPK', 'yellow');
    log('  install <device>      - Instalar app na TV', 'yellow');
    log('  launch <device>       - Iniciar app na TV', 'yellow');
    log('  close <device>        - Fechar app na TV', 'yellow');
    log('  uninstall <device>    - Desinstalar app da TV', 'yellow');
    log('  debug <device>        - Abrir debug console', 'yellow');
    log('  full <device>         - Build + Package + Install + Launch', 'yellow');
    log('');
    log('Exemplos:', 'cyan');
    log('  node install-lg.mjs setup minha-tv 192.168.1.100', 'blue');
    log('  node install-lg.mjs full minha-tv', 'blue');
    log('  node install-lg.mjs install minha-tv', 'blue');
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    
    if (!command) {
        showHelp();
        return;
    }
    
    // Verificar se webOS CLI está instalado
    if (!checkWebOSCLI()) {
        log('❌ LG webOS CLI não encontrado!', 'red');
        log('Instale com: npm install -g @webosose/ares-cli', 'yellow');
        return;
    }
    
    switch (command) {
        case 'setup':
            const deviceName = args[1];
            const deviceIP = args[2];
            
            if (!deviceName || !deviceIP) {
                log('❌ Uso: setup <nome> <ip>', 'red');
                return;
            }
            
            setupDevice(deviceName, deviceIP);
            break;
            
        case 'list':
            log('📱 Devices configurados:', 'cyan');
            const devices = listDevices();
            if (devices) {
                console.log(devices);
            } else {
                log('❌ Erro ao listar devices', 'red');
            }
            break;
            
        case 'package':
            packageApp();
            break;
            
        case 'install':
            const installDevice = args[1];
            if (!installDevice) {
                log('❌ Uso: install <device>', 'red');
                return;
            }
            
            const appPath = packageApp();
            if (appPath) {
                installApp(installDevice, appPath);
            }
            break;
            
        case 'launch':
            const launchDevice = args[1];
            if (!launchDevice) {
                log('❌ Uso: launch <device>', 'red');
                return;
            }
            
            launchApp(launchDevice);
            break;
            
        case 'close':
            const closeDevice = args[1];
            if (!closeDevice) {
                log('❌ Uso: close <device>', 'red');
                return;
            }
            
            closeApp(closeDevice);
            break;
            
        case 'uninstall':
            const uninstallDevice = args[1];
            if (!uninstallDevice) {
                log('❌ Uso: uninstall <device>', 'red');
                return;
            }
            
            uninstallApp(uninstallDevice);
            break;
            
        case 'debug':
            const debugDevice = args[1];
            if (!debugDevice) {
                log('❌ Uso: debug <device>', 'red');
                return;
            }
            
            try {
                log(`🔧 Abrindo debug console para ${debugDevice}...`, 'cyan');
                execSync(`ares-inspect --device ${debugDevice} --app com.gatoflix.player`, { stdio: 'inherit' });
            } catch (error) {
                log(`❌ Erro ao abrir debug: ${error.message}`, 'red');
            }
            break;
            
        case 'full':
            const fullDevice = args[1];
            if (!fullDevice) {
                log('❌ Uso: full <device>', 'red');
                return;
            }
            
            log('🚀 Executando workflow completo...', 'magenta');
            
            // 1. Build
            log('1️⃣ Executando build...', 'cyan');
            try {
                execSync('npm run build:lg', { stdio: 'inherit', cwd: path.dirname(__dirname) });
            } catch (error) {
                log('❌ Erro no build', 'red');
                return;
            }
            
            // 2. Package
            const fullAppPath = packageApp();
            if (!fullAppPath) return;
            
            // 3. Install
            const installSuccess = installApp(fullDevice, fullAppPath);
            if (!installSuccess) return;
            
            // 4. Launch
            launchApp(fullDevice);
            
            log('🎉 Workflow completo executado com sucesso!', 'green');
            break;
            
        default:
            log(`❌ Comando desconhecido: ${command}`, 'red');
            showHelp();
    }
}

main();