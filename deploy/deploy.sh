#!/bin/bash

# Script de Deploy - Arena BRB
# Domínio: arena.viegas.me

set -e  # Parar em caso de erro

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variáveis
APP_DIR="/var/www/arena-brb"
REPO_URL="https://github.com/seu-usuario/MVP_ArenaBRB_Sprint.git"
BRANCH="main"
NGINX_SITE="arena-brb"

echo -e "${BLUE}🚀 Iniciando deploy da Arena BRB...${NC}\n"

# Verificar se está rodando como usuário correto (não root)
if [ "$EUID" -eq 0 ]; then
    echo -e "${RED}❌ Não execute este script como root${NC}"
    exit 1
fi

# Navegar para o diretório da aplicação
if [ ! -d "$APP_DIR" ]; then
    echo -e "${RED}❌ Diretório $APP_DIR não encontrado${NC}"
    echo -e "${YELLOW}Execute o script de instalação primeiro (install.sh)${NC}"
    exit 1
fi

cd $APP_DIR

# Fazer backup do .env se existir
if [ -f ".env" ]; then
    echo -e "${BLUE}📋 Fazendo backup do arquivo .env...${NC}"
    cp .env .env.backup
fi

# Atualizar código do repositório
echo -e "${BLUE}📥 Atualizando código do repositório...${NC}"
git fetch origin
git reset --hard origin/$BRANCH
git pull origin $BRANCH

# Restaurar .env se foi feito backup
if [ -f ".env.backup" ]; then
    echo -e "${BLUE}📋 Restaurando arquivo .env...${NC}"
    cp .env.backup .env
    rm .env.backup
fi

# Verificar se existe arquivo .env
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  Arquivo .env não encontrado!${NC}"
    echo -e "${YELLOW}Por favor, crie o arquivo .env com as variáveis necessárias${NC}"
    exit 1
fi

# Instalar/atualizar dependências
echo -e "${BLUE}📦 Instalando dependências...${NC}"
npm install --production=false

# Fazer build da aplicação
echo -e "${BLUE}🔨 Fazendo build da aplicação...${NC}"
npm run build

# Verificar se o build foi criado
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Erro: Pasta dist não foi criada${NC}"
    exit 1
fi

# Ajustar permissões
echo -e "${BLUE}🔐 Ajustando permissões...${NC}"
sudo chown -R www-data:www-data dist/

# Testar configuração do Nginx
echo -e "${BLUE}🔍 Testando configuração do Nginx...${NC}"
sudo nginx -t

if [ $? -eq 0 ]; then
    # Recarregar Nginx
    echo -e "${BLUE}🔄 Recarregando Nginx...${NC}"
    sudo systemctl reload nginx
else
    echo -e "${RED}❌ Erro na configuração do Nginx${NC}"
    exit 1
fi

# Limpar arquivos desnecessários
echo -e "${BLUE}🧹 Limpando cache...${NC}"
npm cache clean --force 2>/dev/null || true

# Verificar status
echo -e "\n${GREEN}✅ Deploy concluído com sucesso!${NC}\n"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🌐 Site disponível em:${NC}"
echo -e "${BLUE}   https://arena.viegas.me${NC}"
echo -e "${BLUE}   https://www.arena.viegas.me${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Mostrar informações úteis
echo -e "${YELLOW}📊 Informações do Deploy:${NC}"
echo -e "   Data/Hora: $(date '+%Y-%m-%d %H:%M:%S')"
echo -e "   Branch: $BRANCH"
echo -e "   Commit: $(git rev-parse --short HEAD)"
echo -e "   Diretório: $APP_DIR"
echo -e ""

# Mostrar logs recentes do Nginx (últimas 10 linhas)
echo -e "${YELLOW}📝 Últimos logs do Nginx:${NC}"
sudo tail -n 5 /var/log/nginx/arena-brb-error.log 2>/dev/null || echo "   Nenhum erro recente"
echo -e ""

echo -e "${GREEN}✨ Tudo pronto!${NC}"
