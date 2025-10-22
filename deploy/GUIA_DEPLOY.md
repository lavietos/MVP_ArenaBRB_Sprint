# 🚀 Guia Completo de Deploy - Arena BRB

## Domínio: arena.viegas.me | www.arena.viegas.me

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação Inicial](#instalação-inicial)
3. [Deploy Manual](#deploy-manual)
4. [Deploy Automatizado](#deploy-automatizado)
5. [Configuração SSL/HTTPS](#configuração-sslhttps)
6. [Manutenção](#manutenção)
7. [Troubleshooting](#troubleshooting)
8. [Comandos Úteis](#comandos-úteis)

---

## 🎯 Pré-requisitos

### No Servidor Ubuntu

- Ubuntu Server 20.04 LTS ou superior
- Acesso SSH como root ou sudo
- Mínimo 1GB RAM
- Mínimo 10GB disco

### DNS Configurado

Certifique-se que os domínios apontam para o IP do servidor:

```
A     arena.viegas.me      →  SEU_IP_SERVIDOR
A     www.arena.viegas.me  →  SEU_IP_SERVIDOR
```

Verifique com:
```bash
dig arena.viegas.me +short
dig www.arena.viegas.me +short
```

### Acesso ao Repositório

- URL do repositório Git
- Credenciais de acesso (se privado)
- Google Maps API Key

---

## 🚀 Instalação Inicial

### Opção 1: Instalação Automática (Recomendado)

1. **Conectar no servidor via SSH**
```bash
ssh usuario@seu-servidor-ip
```

2. **Fazer upload dos scripts de deploy**
```bash
# Na sua máquina local, dentro do projeto
scp -r deploy/ usuario@seu-servidor-ip:~/
```

3. **No servidor, executar o script de instalação**
```bash
cd ~/deploy
chmod +x install.sh
sudo bash install.sh
```

4. **Seguir as instruções do instalador**
   - Confirmar URL do repositório
   - Informar se é repositório privado
   - Digitar Google Maps API Key
   - Configurar SSL (se DNS já estiver apontando)

5. **Pronto! O site estará no ar** 🎉

---

### Opção 2: Instalação Manual

#### Passo 1: Atualizar o Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

#### Passo 2: Instalar Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalação
node --version  # deve mostrar v20.x.x
npm --version
```

#### Passo 3: Instalar Nginx

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

#### Passo 4: Configurar Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

#### Passo 5: Clonar o Repositório

```bash
cd /var/www
sudo git clone https://github.com/seu-usuario/MVP_ArenaBRB_Sprint.git arena-brb
sudo chown -R $USER:$USER /var/www/arena-brb
cd arena-brb
```

#### Passo 6: Configurar Variáveis de Ambiente

```bash
nano .env
```

Adicionar:
```
VITE_GOOGLE_MAPS_API_KEY="sua_chave_aqui"
```

#### Passo 7: Instalar Dependências e Build

```bash
npm install
npm run build
```

#### Passo 8: Configurar Nginx

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/arena-brb
sudo ln -s /etc/nginx/sites-available/arena-brb /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

#### Passo 9: Ajustar Permissões

```bash
sudo chown -R www-data:www-data /var/www/arena-brb/dist
```

---

## 🔒 Configuração SSL/HTTPS

### Instalar Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Obter Certificado SSL

```bash
sudo certbot --nginx -d arena.viegas.me -d www.arena.viegas.me
```

Siga as instruções:
1. Digite seu e-mail
2. Aceite os termos de serviço
3. Escolha se quer compartilhar e-mail (opcional)

### Testar Renovação Automática

```bash
sudo certbot renew --dry-run
```

O Certbot irá renovar automaticamente o certificado antes de expirar (90 dias).

### Verificar Status do Certificado

```bash
sudo certbot certificates
```

---

## 📦 Deploy Manual

### Passo a Passo

```bash
# 1. Conectar no servidor
ssh usuario@seu-servidor

# 2. Navegar para o diretório
cd /var/www/arena-brb

# 3. Fazer backup do .env (importante!)
cp .env .env.backup

# 4. Atualizar código
git pull origin main

# 5. Restaurar .env
cp .env.backup .env

# 6. Instalar dependências
npm install

# 7. Fazer build
npm run build

# 8. Ajustar permissões
sudo chown -R www-data:www-data dist/

# 9. Recarregar Nginx
sudo nginx -t
sudo systemctl reload nginx
```

---

## ⚡ Deploy Automatizado

### Usando o Script de Deploy

```bash
# Opção 1: Comando rápido
deploy-arena

# Opção 2: Script direto
cd /var/www/arena-brb
./deploy/deploy.sh
```

### O que o Script Faz

✅ Faz backup do arquivo `.env`  
✅ Atualiza o código do Git  
✅ Restaura o `.env`  
✅ Instala dependências  
✅ Faz build da aplicação  
✅ Ajusta permissões  
✅ Testa configuração do Nginx  
✅ Recarrega o Nginx  
✅ Mostra logs e status  

---

## 🔧 Manutenção

### Ver Logs do Nginx

```bash
# Logs de acesso
sudo tail -f /var/log/nginx/arena-brb-access.log

# Logs de erro
sudo tail -f /var/log/nginx/arena-brb-error.log

# Últimas 50 linhas
sudo tail -n 50 /var/log/nginx/arena-brb-error.log
```

### Reiniciar Serviços

```bash
# Recarregar Nginx (sem downtime)
sudo systemctl reload nginx

# Reiniciar Nginx (com downtime breve)
sudo systemctl restart nginx

# Ver status do Nginx
sudo systemctl status nginx
```

### Verificar Espaço em Disco

```bash
df -h
du -sh /var/www/arena-brb
```

### Limpar Cache e Arquivos Antigos

```bash
cd /var/www/arena-brb
npm cache clean --force
rm -rf node_modules
npm install
```

### Backup

```bash
# Backup completo da aplicação
cd /var/www
sudo tar -czf arena-brb-backup-$(date +%Y%m%d).tar.gz arena-brb/

# Backup apenas do código fonte (sem node_modules)
cd /var/www/arena-brb
tar --exclude='node_modules' --exclude='dist' -czf ~/arena-brb-src-$(date +%Y%m%d).tar.gz .
```

### Restaurar Backup

```bash
cd /var/www
sudo tar -xzf arena-brb-backup-20240115.tar.gz
sudo systemctl reload nginx
```

---

## 🔍 Troubleshooting

### Problema: Site não carrega (502 Bad Gateway)

**Causa**: Nginx não consegue servir os arquivos

**Solução**:
```bash
# Verificar se o build existe
ls -la /var/www/arena-brb/dist

# Se não existir, fazer build
cd /var/www/arena-brb
npm run build

# Verificar permissões
sudo chown -R www-data:www-data /var/www/arena-brb/dist

# Recarregar Nginx
sudo systemctl reload nginx
```

---

### Problema: Página em branco

**Causa**: Erro no JavaScript ou variável de ambiente faltando

**Solução**:
```bash
# Verificar se .env existe
cat /var/www/arena-brb/.env

# Verificar console do navegador (F12)
# Procurar por erros de API Key ou recursos não carregados

# Refazer build
cd /var/www/arena-brb
npm run build
sudo systemctl reload nginx
```

---

### Problema: Rotas não funcionam (404)

**Causa**: Configuração do Nginx não está com `try_files` correto

**Solução**:
```bash
# Verificar configuração
sudo nano /etc/nginx/sites-available/arena-brb

# Deve ter esta linha:
# try_files $uri $uri/ /index.html;

# Testar e recarregar
sudo nginx -t
sudo systemctl reload nginx
```

---

### Problema: SSL não renova automaticamente

**Causa**: Certbot timer não está ativo

**Solução**:
```bash
# Verificar status do timer
sudo systemctl status certbot.timer

# Ativar se desabilitado
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Testar renovação
sudo certbot renew --dry-run
```

---

### Problema: Erro de permissões

**Causa**: Arquivos com permissões incorretas

**Solução**:
```bash
# Ajustar permissões do código
cd /var/www
sudo chown -R $USER:$USER arena-brb

# Ajustar permissões do build
sudo chown -R www-data:www-data arena-brb/dist

# Garantir que o usuário pode escrever logs
sudo chown -R www-data:www-data /var/log/nginx
```

---

### Problema: Git pull falha

**Causa**: Alterações locais conflitando com o repositório

**Solução**:
```bash
cd /var/www/arena-brb

# Ver status
git status

# Descartar alterações locais (cuidado!)
git reset --hard origin/main

# Ou fazer stash das mudanças
git stash
git pull origin main
```

---

### Problema: Build falha

**Causa**: Dependências desatualizadas ou conflitantes

**Solução**:
```bash
cd /var/www/arena-brb

# Limpar cache
npm cache clean --force

# Remover node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Tentar build novamente
npm run build
```

---

### Problema: Site lento

**Causa**: Cache não configurado ou compressão desabilitada

**Solução**:
```bash
# Verificar se configuração do Nginx tem gzip
sudo nano /etc/nginx/sites-available/arena-brb

# Deve ter:
# gzip on;
# gzip_types text/plain text/css application/json application/javascript;

# Recarregar
sudo systemctl reload nginx

# Verificar resposta com curl
curl -I https://arena.viegas.me
# Deve ter: Content-Encoding: gzip
```

---

## 📝 Comandos Úteis

### Sistema

```bash
# Ver uso de CPU e memória
htop

# Ver processos do Nginx
ps aux | grep nginx

# Ver portas em uso
sudo netstat -tulpn | grep LISTEN

# Ver logs do sistema
sudo journalctl -xe
```

### Nginx

```bash
# Testar configuração
sudo nginx -t

# Recarregar configuração
sudo systemctl reload nginx

# Reiniciar Nginx
sudo systemctl restart nginx

# Ver status
sudo systemctl status nginx

# Ver todas as configurações de sites
ls -la /etc/nginx/sites-enabled/
```

### Git

```bash
# Ver branch atual
git branch

# Ver últimos commits
git log --oneline -5

# Ver mudanças não commitadas
git status

# Ver diferenças
git diff

# Atualizar
git pull origin main
```

### Node/NPM

```bash
# Ver versão
node --version
npm --version

# Listar pacotes instalados
npm list --depth=0

# Verificar por atualizações
npm outdated

# Limpar cache
npm cache clean --force
```

### Certificados SSL

```bash
# Listar certificados
sudo certbot certificates

# Renovar manualmente
sudo certbot renew

# Revogar certificado
sudo certbot revoke --cert-path /etc/letsencrypt/live/arena.viegas.me/cert.pem

# Deletar certificado
sudo certbot delete --cert-name arena.viegas.me
```

---

## 🔐 Segurança

### Checklist de Segurança

- [ ] Firewall (UFW) ativo e configurado
- [ ] SSL/HTTPS configurado e funcionando
- [ ] Renovação automática de SSL ativa
- [ ] Apenas portas necessárias abertas (22, 80, 443)
- [ ] Chaves de API não expostas no código
- [ ] `.env` não commitado no Git
- [ ] Headers de segurança configurados no Nginx
- [ ] Backup regular configurado
- [ ] Sistema atualizado regularmente

### Headers de Segurança

Os seguintes headers já estão configurados no `nginx.conf`:

```nginx
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Verificar Segurança

```bash
# Testar headers de segurança
curl -I https://arena.viegas.me

# Verificar SSL
openssl s_client -connect arena.viegas.me:443 -servername arena.viegas.me

# Verificar firewall
sudo ufw status verbose
```

---

## 📊 Monitoramento

### Logs em Tempo Real

```bash
# Todos os acessos
sudo tail -f /var/log/nginx/arena-brb-access.log

# Apenas erros
sudo tail -f /var/log/nginx/arena-brb-error.log

# Ambos
sudo tail -f /var/log/nginx/arena-brb-*.log
```

### Estatísticas de Acesso

```bash
# Número total de requisições hoje
grep "$(date +%d/%b/%Y)" /var/log/nginx/arena-brb-access.log | wc -l

# IPs únicos
awk '{print $1}' /var/log/nginx/arena-brb-access.log | sort -u | wc -l

# Top 10 páginas mais acessadas
awk '{print $7}' /var/log/nginx/arena-brb-access.log | sort | uniq -c | sort -rn | head -10

# Erros mais comuns
grep "error" /var/log/nginx/arena-brb-error.log | cut -d' ' -f9- | sort | uniq -c | sort -rn
```

---

## 🎯 Checklist de Deploy

### Antes do Deploy

- [ ] Código testado localmente
- [ ] Build funcionando sem erros
- [ ] Variáveis de ambiente verificadas
- [ ] Backup do servidor atual feito
- [ ] DNS apontando corretamente

### Durante o Deploy

- [ ] Código atualizado do Git
- [ ] Dependências instaladas
- [ ] Build executado com sucesso
- [ ] Configuração do Nginx testada
- [ ] Nginx recarregado

### Após o Deploy

- [ ] Site acessível via HTTP/HTTPS
- [ ] Todas as páginas carregando
- [ ] Rotas funcionando corretamente
- [ ] Google Maps carregando
- [ ] Console sem erros críticos
- [ ] Logs do Nginx sem erros

---

## 🆘 Suporte

### Contatos

- **Repositório**: [GitHub]
- **Documentação**: Este arquivo

### Links Úteis

- [Documentação Nginx](https://nginx.org/en/docs/)
- [Certbot](https://certbot.eff.org/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

## 📄 Estrutura de Arquivos

```
/var/www/arena-brb/
├── deploy/
│   ├── deploy.sh          # Script de deploy
│   ├── install.sh         # Script de instalação
│   ├── nginx.conf         # Configuração Nginx
│   └── GUIA_DEPLOY.md     # Este arquivo
├── dist/                  # Build da aplicação (gerado)
├── node_modules/          # Dependências (gerado)
├── public/                # Assets públicos
├── src/                   # Código fonte
├── .env                   # Variáveis de ambiente (criar)
├── package.json
├── vite.config.ts
└── README.md

/etc/nginx/
├── sites-available/
│   └── arena-brb          # Config do site
└── sites-enabled/
    └── arena-brb          # Link simbólico

/var/log/nginx/
├── arena-brb-access.log   # Logs de acesso
└── arena-brb-error.log    # Logs de erro
```

---

## 🎉 Pronto!

Seu site Arena BRB está no ar em:

- 🌐 https://arena.viegas.me
- 🌐 https://www.arena.viegas.me

Para fazer deploy novamente, basta executar:
```bash
deploy-arena
```

**Bom trabalho! 🚀**