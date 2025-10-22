# 🔧 Guia de Solução de Erros - Google Maps

## 🔴 Erro: "Esta página não carregou o Google Maps corretamente"

### Causas Comuns e Soluções:

---

### 1️⃣ APIs não habilitadas (MAIS COMUM)

**Sintoma:** Mensagem de erro genérica ou mapa não carrega

**Solução:**
1. Acesse: https://console.cloud.google.com/
2. Selecione seu projeto
3. Habilite as APIs:

**Maps JavaScript API:**
https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
→ Clique em "ENABLE" / "ATIVAR"

**Places API:**
https://console.cloud.google.com/apis/library/places-backend.googleapis.com
→ Clique em "ENABLE" / "ATIVAR"

4. Aguarde 2-3 minutos para as APIs serem ativadas
5. Recarregue a página

---

### 2️⃣ API Key não configurada

**Sintoma:** Console mostra "API Key não definida"

**Solução:**
```bash
# 1. Verifique se o arquivo .env existe
ls -la .env

# 2. Se não existir, crie a partir do exemplo
cp env.example .env

# 3. Verifique o conteúdo
cat .env

# Deve conter:
# VITE_GOOGLE_MAPS_API_KEY="AIzaSyAhg1nMd8JJhhhDnm4pTM0waCGEk_p-WbA"

# 4. IMPORTANTE: Reinicie o servidor
npm run dev
```

---

### 3️⃣ Restrições de domínio bloqueando localhost

**Sintoma:** Erro "RefererNotAllowedMapError"

**Solução:**
1. Acesse: https://console.cloud.google.com/apis/credentials
2. Clique na sua API Key
3. Em "Application restrictions":
   - Escolha "HTTP referrers (web sites)"
   - Adicione: `localhost:*`
   - Adicione: `127.0.0.1:*`
   - Adicione: `http://localhost:*/*`
   - Adicione: `http://127.0.0.1:*/*`
4. Salve e aguarde 5 minutos
5. Recarregue a página

**OU** (mais simples para desenvolvimento):
1. Em "Application restrictions", escolha: "None"
2. Salve (mas lembre-se de configurar restrições em produção!)

---

### 4️⃣ Billing não configurado

**Sintoma:** Erro sobre billing ou pagamento

**Solução:**
1. Acesse: https://console.cloud.google.com/billing
2. Associe um cartão de crédito ao projeto
3. Não se preocupe: $200/mês são GRATUITOS!
4. Você não será cobrado a menos que ultrapasse esse valor

---

### 5️⃣ API Key inválida

**Sintoma:** Erro "InvalidKeyMapError"

**Solução:**
1. Verifique se copiou a API Key corretamente
2. Acesse: https://console.cloud.google.com/apis/credentials
3. Copie a API Key novamente
4. Atualize o arquivo .env
5. Reinicie o servidor: `npm run dev`

---

## 🧪 Como Testar

### Teste Rápido com HTML puro:

1. Abra o arquivo no navegador:
```bash
# Se estiver usando o servidor do npm
# Acesse: http://localhost:5173/test-maps.html
```

2. Ou abra diretamente o arquivo `test-maps.html` no navegador

3. Verifique:
   - ✅ Status verde = tudo OK
   - ❌ Status vermelho = veja a mensagem de erro

---

### Teste no Console do Navegador:

1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Procure por mensagens:
   - ✅ "✅ Mapa inicializado com sucesso"
   - ❌ Qualquer mensagem em vermelho

---

## 📋 Checklist de Verificação

Execute este checklist na ordem:

- [ ] Arquivo .env existe na raiz do projeto
- [ ] .env contém VITE_GOOGLE_MAPS_API_KEY="..."
- [ ] Maps JavaScript API está habilitada no Google Cloud
- [ ] Places API está habilitada no Google Cloud
- [ ] Billing está configurado (cartão associado)
- [ ] Aguardei 2-3 minutos após habilitar as APIs
- [ ] Reiniciei o servidor com: npm run dev
- [ ] Limpei o cache do navegador (Ctrl+Shift+Delete)
- [ ] Verifiquei o console do navegador (F12) por erros

---

## 🔍 Comandos de Debug

Execute estes comandos para diagnosticar:

```bash
# Verificar se .env existe e tem a chave
cat .env | grep VITE_GOOGLE_MAPS_API_KEY

# Executar script de verificação
./verify-maps.sh

# Verificar se as dependências estão instaladas
npm list @googlemaps/js-api-loader

# Reinstalar dependências (se necessário)
npm install
```

---

## 💡 Dicas Importantes

1. **Sempre reinicie o servidor** após alterar o .env
2. **Aguarde 2-3 minutos** após habilitar APIs no Google Cloud
3. **Limpe o cache** se continuar vendo erros antigos
4. **Verifique o console** do navegador para erros detalhados
5. **Use test-maps.html** para testes isolados

---

## 📞 Ainda não funcionou?

1. Abra o arquivo `test-maps.html` no navegador
2. Copie as mensagens de erro do console
3. Verifique se o erro está listado acima
4. Execute: `./verify-maps.sh` e veja o que está errado

---

## 🎯 Resumo Rápido

**Para 90% dos casos, isso resolve:**

```bash
# 1. Verificar .env
cat .env

# 2. Habilitar APIs
# - Maps JavaScript API
# - Places API

# 3. Reiniciar servidor
npm run dev

# 4. Aguardar 2-3 minutos
# 5. Recarregar página
```

**Links diretos:**
- Maps API: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
- Places API: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
- Credentials: https://console.cloud.google.com/apis/credentials
