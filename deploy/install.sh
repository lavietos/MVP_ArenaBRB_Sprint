#!/bin/bash

# Script de Instalação Inicial - Arena BRB
# Domínio: arena.viegas.me
# Sistema: Ubuntu Server

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
DOMAIN="arena.viegas.me"
WWW_DOMAIN="www.arena.viegas.me"

echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Instalação Arena BRB - Ubuntu Server   ║${NC}"
echo -e "${BLUE}║         arena.viegas.me                   ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}\n"

# Verificar se está rodando como root ou com sudo
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ Este script precisa ser executado com sudo${NC}"
    echo -e "${YELLOW}Execute: sudo bash install.sh${NC}"
    exit 1
fi

# Pegar o usuário real (não root)
REAL_USER=${SUDO_USER:-$USER}
REAL_HOME=$(eval echo ~$REAL_USER)

echo -e "${BLUE}👤 Usuário: $REAL_USER${NC}\n"

# Atualizar sistema
echo -e "${BLUE}🔄 Atualizando sistema...${NC}"
apt update && apt upgrade -y

# Instalar dependências básicas
echo -e "\n${BLUE}📦 Instalando dependências básicas...${NC}"
apt install -y curl wget git ufw build-essential

# Instalar Node.js 20 LTS
echo -e "\n${BLUE}📦 Instalando Node.js 20 LTS...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
    echo -e "${GREEN}✅ Node.js instalado: $(node --version)${NC}"
    echo -e "${GREEN}✅ npm instalado: $(npm --version)${NC}"
else
    echo -e "${YELLOW}⚠️  Node.js já está instalado: $(node --version)${NC}"
fi

# Instalar Nginx
echo -e "\n${BLUE}📦 Instalando Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl enable nginx
    systemctl start nginx
    echo -e "${GREEN}✅ Nginx instalado e iniciado${NC}"
else
    echo -e "${YELLOW}⚠️  Nginx já está instalado${NC}"
fi

# Configurar Firewall
echo -e "\n${BLUE}🔥 Configurando Firewall (UFW)...${NC}"
ufw --force enable
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
echo -e "${GREEN}✅ Firewall configurado${NC}"

# Criar diretório da aplicação
echo -e "\n${BLUE}📁 Criando diretório da aplicação...${NC}"
if [ -d "$APP_DIR" ]; then
    echo -e "${YELLOW}⚠️  Diretório já existe. Fazendo backup...${NC}"
    mv $APP_DIR ${APP_DIR}.backup.$(date +%Y%m%d%H%M%S)
fi

mkdir -p $APP_DIR
cd $APP_DIR

# Clonar repositório
echo -e "\n${BLUE}📥 Clonando repositório...${NC}"
echo -e "${YELLOW}Digite a URL do seu repositório Git:${NC}"
read -p "URL (ou Enter para usar padrão): " USER_REPO
REPO_URL=${USER_REPO:-$REPO_URL}

# Perguntar se é repositório privado
echo -e "\n${YELLOW}O repositório é privado? (y/n):${NC}"
read -p "Resposta: " IS_PRIVATE

if [ "$IS_PRIVATE" = "y" ] || [ "$IS_PRIVATE" = "Y" ]; then
    echo -e "${YELLOW}Por favor, configure a autenticação Git antes de continuar${NC}"
    echo -e "${YELLOW}Você pode usar GitHub CLI (gh auth login) ou SSH keys${NC}"
    read -p "Pressione Enter quando estiver pronto..."
fi

git clone $REPO_URL $APP_DIR
chown -R $REAL_USER:$REAL_USER $APP_DIR

# Criar arquivo .env
echo -e "\n${BLUE}📝 Configurando variáveis de ambiente...${NC}"
if [ ! -f "$APP_DIR/.env" ]; then
    echo -e "${YELLOW}Digite sua Google Maps API Key:${NC}"
    read -p "API Key: " MAPS_KEY

    cat > $APP_DIR/.env << EOF
# Google Maps API Key
# Obtenha sua chave em: https://console.cloud.google.com/
# Ative as APIs: Maps JavaScript API e Places API
VITE_GOOGLE_MAPS_API_KEY="$MAPS_KEY"
EOF

    chown $REAL_USER:$REAL_USER $APP_DIR/.env
    echo -e "${GREEN}✅ Arquivo .env criado${NC}"
else
    echo -e "${YELLOW}⚠️  Arquivo .env já existe${NC}"
fi

# Instalar dependências do projeto
echo -e "\n${BLUE}📦 Instalando dependências do projeto...${NC}"
cd $APP_DIR
sudo -u $REAL_USER npm install

# Fazer build
echo -e "\n${BLUE}🔨 Fazendo build da aplicação...${NC}"
sudo -u $REAL_USER npm run build

# Verificar se o build foi criado
if [ ! -d "$APP_DIR/dist" ]; then
    echo -e "${RED}❌ Erro: Build falhou, pasta dist não foi criada${NC}"
    exit 1
fi

# Ajustar permissões
chown -R www-data:www-data $APP_DIR/dist

# Configurar Nginx
echo -e "\n${BLUE}⚙️  Configurando Nginx...${NC}"

# Copiar arquivo de configuração
if [ -f "$APP_DIR/deploy/nginx.conf" ]; then
    cp $APP_DIR/deploy/nginx.conf /etc/nginx/sites-available/arena-brb
else
    # Criar configuração manualmente se não existir
    cat > /etc/nginx/sites-available/arena-brb << 'EOF'
server {
    listen 80;
    listen [::]:80;

    server_name arena.viegas.me www.arena.viegas.me;

    root /var/www/arena-brb/dist;
    index index.html;

    # Compressão gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/javascript application/xml+rss application/json image/svg+xml;

    # Configuração principal - SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Desabilitar cache para o index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Logs
    access_log /var/log/nginx/arena-brb-access.log;
    error_log /var/log/nginx/arena-brb-error.log;
}
EOF
fi

# Remover site padrão do Nginx
if [ -L "/etc/nginx/sites-enabled/default" ]; then
    rm /etc/nginx/sites-enabled/default
fi

# Criar link simbólico
ln -sf /etc/nginx/sites-available/arena-brb /etc/nginx/sites-enabled/

# Testar configuração do Nginx
echo -e "${BLUE}🔍 Testando configuração do Nginx...${NC}"
nginx -t

if [ $? -eq 0 ]; then
    # Recarregar Nginx
    systemctl reload nginx
    echo -e "${GREEN}✅ Nginx configurado e recarregado${NC}"
else
    echo -e "${RED}❌ Erro na configuração do Nginx${NC}"
    exit 1
fi

# Instalar Certbot para SSL
echo -e "\n${BLUE}🔒 Instalando Certbot para SSL...${NC}"
apt install -y certbot python3-certbot-nginx

# Configurar SSL
echo -e "\n${YELLOW}Deseja configurar SSL/HTTPS agora? (y/n)${NC}"
echo -e "${YELLOW}IMPORTANTE: Certifique-se que os domínios apontam para este servidor!${NC}"
read -p "Resposta: " SETUP_SSL

if [ "$SETUP_SSL" = "y" ] || [ "$SETUP_SSL" = "Y" ]; then
    echo -e "${BLUE}📧 Digite seu e-mail para o certificado SSL:${NC}"
    read -p "E-mail: " SSL_EMAIL

    certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --non-interactive --agree-tos --email $SSL_EMAIL

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ SSL configurado com sucesso!${NC}"

        # Testar renovação automática
        echo -e "${BLUE}🔄 Testando renovação automática do certificado...${NC}"
        certbot renew --dry-run
    else
        echo -e "${YELLOW}⚠️  Não foi possível configurar SSL automaticamente${NC}"
        echo -e "${YELLOW}Execute manualmente depois: sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  SSL não configurado. Para configurar depois execute:${NC}"
    echo -e "${YELLOW}sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN${NC}"
fi

# Tornar scripts executáveis
if [ -f "$APP_DIR/deploy/deploy.sh" ]; then
    chmod +x $APP_DIR/deploy/deploy.sh
    chown $REAL_USER:$REAL_USER $APP_DIR/deploy/deploy.sh
fi

# Criar script de atalho para deploy
cat > /usr/local/bin/deploy-arena << 'EOF'
#!/bin/bash
cd /var/www/arena-brb
./deploy/deploy.sh
EOF
chmod +x /usr/local/bin/deploy-arena

# Sumário final
echo -e "\n${GREEN}╔═══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO   ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════╝${NC}\n"

echo -e "${GREEN}🌐 Site disponível em:${NC}"
if [ "$SETUP_SSL" = "y" ] || [ "$SETUP_SSL" = "Y" ]; then
    echo -e "${BLUE}   https://$DOMAIN${NC}"
    echo -e "${BLUE}   https://$WWW_DOMAIN${NC}"
else
    echo -e "${BLUE}   http://$DOMAIN${NC}"
    echo -e "${BLUE}   http://$WWW_DOMAIN${NC}"
fi

echo -e "\n${YELLOW}📋 Informações Importantes:${NC}"
echo -e "   • Diretório da app: $APP_DIR"
echo -e "   • Config Nginx: /etc/nginx/sites-available/arena-brb"
echo -e "   • Logs de acesso: /var/log/nginx/arena-brb-access.log"
echo -e "   • Logs de erro: /var/log/nginx/arena-brb-error.log"
echo -e "   • Arquivo .env: $APP_DIR/.env"

echo -e "\n${YELLOW}🚀 Comandos úteis:${NC}"
echo -e "   • Deploy rápido: ${BLUE}deploy-arena${NC}"
echo -e "   • Deploy manual: ${BLUE}cd $APP_DIR && ./deploy/deploy.sh${NC}"
echo -e "   • Ver logs Nginx: ${BLUE}sudo tail -f /var/log/nginx/arena-brb-error.log${NC}"
echo -e "   • Recarregar Nginx: ${BLUE}sudo systemctl reload nginx${NC}"
echo -e "   • Status Nginx: ${BLUE}sudo systemctl status nginx${NC}"

echo -e "\n${YELLOW}🔐 Segurança:${NC}"
echo -e "   • Firewall (UFW) está ativo"
echo -e "   • Portas abertas: 22 (SSH), 80 (HTTP), 443 (HTTPS)"
echo -e "   • SSL/HTTPS: $([ "$SETUP_SSL" = "y" ] && echo "✅ Configurado" || echo "❌ Não configurado")"

if [ "$SETUP_SSL" = "y" ] || [ "$SETUP_SSL" = "Y" ]; then
    echo -e "\n${YELLOW}🔄 Renovação automática SSL:${NC}"
    echo -e "   • Certbot irá renovar automaticamente o certificado"
    echo -e "   • Teste: ${BLUE}sudo certbot renew --dry-run${NC}"
fi

echo -e "\n${GREEN}✨ Tudo pronto! Seu site está no ar!${NC}\n"
