# Sistema de Perfis - Guia de Uso

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

## Recursos visuais

### Interface da seleção de perfis
- Design moderno com cards interativos
- Avatars com emojis coloridos
- Indicador de perfis protegidos por PIN (🔒)
- Botão de configuração que aparece no hover

### Header do dashboard
- Mostra o perfil ativo com avatar e nome
- Informações do usuário logado
- Botões de busca, trocar perfil e sair

### Modais intuitivos
- Modal de PIN para perfis protegidos
- Modal de criação/edição com seletor de avatars
- Validações e mensagens de erro claras

## Limitações
- Máximo de 8 perfis por conta
- Deve haver pelo menos 1 perfil sempre
- PINs são armazenados localmente (não criptografados)

## Dados salvos por perfil
Cada perfil mantém seus próprios dados:
- ✅ Lista de favoritos
- ✅ Histórico de reprodução
- ✅ Posição dos vídeos assistidos

Os dados são persistidos no localStorage do navegador.