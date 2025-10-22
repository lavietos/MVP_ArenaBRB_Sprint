# 🚀 Scripts de Deploy - Arena BRB

Este diretório contém todos os scripts e configurações necessários para fazer deploy da aplicação Arena BRB no servidor Ubuntu.

## 📁 Arquivos

### `install.sh`
Script de instalação inicial do servidor. Execute apenas uma vez na primeira configuração.

**O que faz:**
- Instala Node.js 20 LTS
- Instala e configura Nginx
- Configura firewall (UFW)
- Clona o repositório
- Cria arquivo `.env`
- Faz o primeiro build
- Configura Nginx para o domínio
- Opcionalmente configura SSL/HTTPS

**Como usar:**
```bash
sudo bash install.sh
```

---

### `deploy.sh`
Script de deploy automático. Use para atualizar a aplicação após mudanças no código.

**O que faz:**
- Atualiza código do Git
- Mantém arquivo `.env` preservado
- Instala dependências
- Faz build da aplicação
- Ajusta permissões
- Recarrega Nginx
- Mostra status e logs

**Como usar:**
```bash
# Opção 1: Comando rápido (após instalação)
deploy-arena

# Opção 2: Script direto
./deploy.sh
```

---

### `nginx.conf`
Configuração do Nginx para o domínio arena.viegas.me e www.arena.viegas.me

**Recursos:**
- SPA routing (todas as rotas redirecionam para index.html)
- Compressão gzip
- Cache otimizado para assets
- Headers de segurança
- Logs customizados

**Localização no servidor:**
```
/etc/nginx/sites-available/arena-brb
```

---

### `GUIA_DEPLOY.md`
Documentação completa e detalhada do processo de deploy.

**Conteúdo:**
- Guia passo a passo de instalação
- Configuração de SSL/HTTPS
- Troubleshooting
- Comandos úteis
- Checklist de segurança
- Dicas de monitoramento

---

## 🎯 Quick Start

### Primeira vez (Instalação)

1. **Fazer upload dos scripts para o servidor:**
```bash
scp -r deploy/ usuario@seu-servidor:~/
```

2. **Conectar no servidor:**
```bash
ssh usuario@seu-servidor
```

3. **Executar instalação:**
```bash
cd ~/deploy
chmod +x install.sh
sudo bash install.sh
```

4. **Seguir as instruções do instalador**

---

### Deploy de Atualizações

Após a instalação inicial, para fazer deploy de novas versões:

```bash
# No servidor
deploy-arena
```

Ou manualmente:

```bash
cd /var/www/arena-brb
./deploy/deploy.sh
```

---

## 📋 Pré-requisitos

### No Servidor
- Ubuntu Server 20.04 LTS ou superior
- Acesso SSH com sudo
- Mínimo 1GB RAM
- Mínimo 10GB disco

### DNS
Configure os registros DNS antes de instalar:

```
Tipo    Nome                   Valor
----    ----                   -----
A       arena.viegas.me        SEU_IP_SERVIDOR
A       www.arena.viegas.me    SEU_IP_SERVIDOR
```

Verifique:
```bash
dig arena.viegas.me +short
```

### Credenciais
- URL do repositório Git
- Acesso ao repositório (se privado)
- Google Maps API Key

---

## 🔒 SSL/HTTPS

O SSL é configurado automaticamente durante a instalação usando Let's Encrypt.

Para configurar manualmente depois:

```bash
sudo certbot --nginx -d arena.viegas.me -d www.arena.viegas.me
```

Renovação é automática. Teste com:

```bash
sudo certbot renew --dry-run
```

---

## 🔧 Estrutura no Servidor

Após a instalação, a estrutura será:

```
/var/www/arena-brb/          # Aplicação
├── deploy/                  # Scripts (este diretório)
├── dist/                    # Build (gerado automaticamente)
├── src/                     # Código fonte
├── .env                     # Variáveis de ambiente
└── ...

/etc/nginx/
├── sites-available/
│   └── arena-brb           # Configuração do site
└── sites-enabled/
    └── arena-brb           # Link para sites-available

/var/log/nginx/
├── arena-brb-access.log    # Logs de acesso
└── arena-brb-error.log     # Logs de erro
```

---

## 📊 Comandos Úteis

### Ver logs
```bash
# Logs de erro
sudo tail -f /var/log/nginx/arena-brb-error.log

# Logs de acesso
sudo tail -f /var/log/nginx/arena-brb-access.log
```

### Gerenciar Nginx
```bash
# Testar configuração
sudo nginx -t

# Recarregar (sem downtime)
sudo systemctl reload nginx

# Reiniciar
sudo systemctl restart nginx

# Status
sudo systemctl status nginx
```

### Deploy
```bash
# Deploy rápido
deploy-arena

# Deploy manual
cd /var/www/arena-brb && ./deploy/deploy.sh
```

---

## 🐛 Troubleshooting

### Site não carrega (502)
```bash
cd /var/www/arena-brb
npm run build
sudo chown -R www-data:www-data dist/
sudo systemctl reload nginx
```

### Página em branco
```bash
# Verificar .env
cat /var/www/arena-brb/.env

# Verificar console do navegador (F12)

# Refazer build
cd /var/www/arena-brb
npm run build
sudo systemctl reload nginx
```

### Rotas não funcionam (404)
```bash
# Verificar se nginx.conf tem try_files correto
sudo nano /etc/nginx/sites-available/arena-brb

# Deve ter: try_files $uri $uri/ /index.html;

sudo nginx -t
sudo systemctl reload nginx
```

Para mais detalhes, consulte o arquivo `GUIA_DEPLOY.md`.

---

## 🔐 Segurança

Checklist de segurança implementado:

- ✅ Firewall (UFW) configurado
- ✅ Apenas portas necessárias abertas (22, 80, 443)
- ✅ SSL/HTTPS com Let's Encrypt
- ✅ Renovação automática de certificados
- ✅ Headers de segurança no Nginx
- ✅ `.env` protegido (não versionado)
- ✅ Permissões corretas nos arquivos

---

## 📚 Documentação

Para documentação completa, leia:

- **[GUIA_DEPLOY.md](GUIA_DEPLOY.md)** - Guia detalhado com tudo sobre deploy
- **[../README.md](../README.md)** - Documentação da aplicação

---

## 🆘 Suporte

Em caso de problemas:

1. Consulte o `GUIA_DEPLOY.md` seção Troubleshooting
2. Verifique os logs do Nginx
3. Execute `sudo nginx -t` para verificar configuração
4. Verifique se o build existe: `ls -la /var/www/arena-brb/dist`

---

## 🎯 Domínios

- **Produção**: https://arena.viegas.me
- **WWW**: https://www.arena.viegas.me

---

## ✅ Status

Após instalação bem-sucedida, você terá:

- ✅ Servidor configurado e atualizado
- ✅ Node.js 20 LTS instalado
- ✅ Nginx instalado e configurado
- ✅ Aplicação rodando
- ✅ SSL/HTTPS configurado
- ✅ Firewall ativo
- ✅ Deploy automatizado disponível

Para fazer deploy novamente:
```bash
deploy-arena
```

**Pronto! 🚀**