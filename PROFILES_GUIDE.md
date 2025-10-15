# Sistema de Perfis e Gerenciamento - Guia de Uso

## Funcionalidades Implementadas

### ✅ Perfis sem PIN obrigatório
- Agora é possível criar perfis sem definir um PIN
- O campo PIN é opcional na criação e edição de perfis
- Perfis sem PIN são acessados diretamente ao clicar

### ✅ Tela de seleção de perfil ao iniciar
- O sistema sempre inicia mostrando a tela de seleção de perfis
- Não há mais login automático em um perfil específico
- O usuário deve escolher um perfil antes de acessar o sistema

### ✅ Gerenciamento completo de perfis
- **Criar perfil**: Botão "+" na tela de seleção
- **Editar perfil**: Ícone ⚙️ que aparece ao passar o mouse sobre o perfil
- **Excluir perfil**: Opção disponível no modal de edição
- **Trocar perfil**: Botão no header do dashboard

### ✅ Central de Gerenciamento (NOVO!)
- **Botão "⚙️ Gerenciar"** substitui o antigo botão "Sair"
- Modal completo com abas organizadas para diferentes funções
- Funcionalidades avançadas de limpeza e configuração

## Central de Gerenciamento

### 📋 Dados do Perfil
**Limpeza de Favoritos**
- Visualiza quantos favoritos estão salvos
- Remove todos os favoritos com confirmação
- Botão desabilitado se não houver favoritos

**Limpeza de Histórico**
- Mostra quantos itens estão no histórico
- Remove todo o histórico de reprodução e posições salvas
- Funciona apenas se houver histórico para limpar

### 🔧 Conexão
**Teste de Conectividade**
- Mostra informações do servidor atual
- Testa a conexão com o servidor IPTV
- Exibe latência e status da conexão
- Detecta problemas de timeout e conectividade

### 👤 Conta
**Visualização de Credenciais**
- Mostra URL do servidor, usuário e senha (mascarada)
- Modo de visualização seguro

**Edição de Credenciais**
- Permite alterar URL, usuário e senha
- Validação de campos obrigatórios
- Salva automaticamente no localStorage

**Logout Seguro**
- Confirmação antes de sair da conta
- Limpa todos os dados de autenticação
- Retorna para tela de login

## Como usar

### 1. Primeira vez no sistema
- O sistema criará automaticamente um "Perfil Principal" 
- Você verá a tela de seleção de perfis
- Clique no perfil para entrar

### 2. Criar novo perfil
- Na tela de seleção, clique no botão "+"
- Digite um nome para o perfil
- Escolha um avatar (emoji)
- Defina um PIN (opcional)
- Clique em "Criar Perfil"

### 3. Editar perfil existente
- Na tela de seleção, passe o mouse sobre um perfil
- Clique no ícone ⚙️ que aparece no canto
- Modifique nome, avatar ou PIN
- Use "Excluir" para remover o perfil (mínimo de 1 perfil)

### 4. Trocar de perfil durante o uso
- No dashboard, clique em "👤 Trocar Perfil" no header
- Você voltará para a tela de seleção de perfis

### 5. Gerenciar dados e configurações
- No dashboard, clique em "⚙️ Gerenciar" no header
- Use as abas para navegar entre diferentes funcções:
  - **Dados do Perfil**: Limpar favoritos e histórico
  - **Conexão**: Testar conectividade do servidor
  - **Conta**: Editar credenciais ou fazer logout

## Recursos visuais

### Interface da seleção de perfis
- Design moderno com cards interativos
- Avatars com emojis coloridos
- Indicador de perfis protegidos por PIN (🔒)
- Botão de configuração que aparece no hover
- Contador de perfis criados/disponíveis

### Header do dashboard
- Mostra o perfil ativo com avatar e nome
- Informações do usuário logado
- Botões de busca, trocar perfil e gerenciar

### Central de Gerenciamento
- Interface com abas para organização
- Cards informativos para cada funcionalidade
- Contadores em tempo real (favoritos, histórico)
- Validações e confirmações de segurança
- Feedback visual para ações executadas

## Segurança e Dados

### Armazenamento Local
- Todos os dados são salvos no localStorage do navegador
- Perfis e preferências persistem entre sessões
- Credenciais são salvas de forma simples (não criptografadas)

### Limpeza de Dados
- Favoritos e histórico podem ser limpos independentemente
- Confirmações antes de ações destrutivas
- Contadores mostram quantos itens serão afetados

### Teste de Conectividade
- Verifica se o servidor IPTV está respondendo
- Mede latência da conexão
- Detecta problemas de timeout (10 segundos)
- Valida resposta do servidor

## Limitações
- Máximo de 8 perfis por conta
- Deve haver pelo menos 1 perfil sempre
- PINs são armazenados localmente (não criptografados)
- Teste de conexão tem timeout de 10 segundos

## Dados salvos por perfil
Cada perfil mantém seus próprios dados:
- ✅ Lista de favoritos
- ✅ Histórico de reprodução
- ✅ Posição dos vídeos assistidos

Os dados são persistidos no localStorage do navegador.