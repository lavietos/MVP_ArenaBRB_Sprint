# Configuração do Google Maps API

## ✅ Alterações Realizadas

### 1. Chave da API Atualizada
- **Nova chave**: `AIzaSyAhg1nMd8JJhhhDnm4pTM0waCGEk_p-WbA`
- Atualizada em: `env.example` e `.env`

### 2. Coordenadas do Ginásio Nilson Nelson Corrigidas
- **Coordenadas antigas**: `-15.784, -47.9005` ❌
- **Coordenadas corretas**: `-15.783140, -47.903154` ✅
- Arquivo atualizado: `src/data/mapPoints.ts`

---

## 🔧 Configuração Necessária no Google Cloud Console

Para que o mapa funcione corretamente com estilização e imagens, você precisa habilitar as seguintes APIs:

### Passo 1: Acesse o Google Cloud Console
1. Acesse: https://console.cloud.google.com/
2. Selecione seu projeto ou crie um novo

### Passo 2: Habilite as APIs Necessárias

Vá em **APIs & Services > Library** e habilite:

#### ✅ APIs Obrigatórias:
1. **Maps JavaScript API**
   - Necessária para renderizar o mapa
   - Link direto: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com

2. **Places API**
   - Necessária para buscar fotos e informações dos locais
   - Link direto: https://console.cloud.google.com/apis/library/places-backend.googleapis.com

3. **Geocoding API** (Recomendada)
   - Para buscar endereços e coordenadas
   - Link direto: https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com

### Passo 3: Configure Restrições da API Key (Recomendado)

1. Vá em **APIs & Services > Credentials**
2. Clique na sua API Key
3. Em **Application restrictions**, escolha:
   - **HTTP referrers (web sites)** para produção
   - Adicione seus domínios autorizados (ex: `localhost:*`, `*.seudominio.com/*`)

4. Em **API restrictions**, escolha:
   - **Restrict key**
   - Selecione apenas as APIs que você habilitou acima

---

## 🧪 Testando a Configuração

### 1. Reinicie o servidor de desenvolvimento:
```bash
# Pare o servidor (Ctrl+C) e reinicie
npm run dev
```

### 2. Verifique o Console do Navegador:
Abra o DevTools (F12) e vá na aba Console. Procure por:

#### ✅ Sinais de Sucesso:
- "Foto encontrada para: Ginásio Nilson Nelson"
- Mapa carregado sem erros

#### ❌ Erros Comuns:
- **"Google Maps JavaScript API error: ApiNotActivatedMapError"**
  - Solução: Habilite a Maps JavaScript API no Console

- **"Google Maps JavaScript API error: RefererNotAllowedMapError"**
  - Solução: Configure as restrições de HTTP referrers

- **"PLACES_SERVICE_QUOTAS_EXCEEDED"**
  - Solução: Verifique suas cotas na Google Cloud Console

---

## 📍 Locais no Mapa

### Arena BRB Mané Garrincha 🏟️
- **Coordenadas**: `-15.783611, -47.899167`
- **Status**: ✅ Configurado

### Ginásio Nilson Nelson 🏀
- **Coordenadas**: `-15.783140, -47.903154` ✅ **CORRIGIDO**
- **Status**: ✅ Configurado
- **Problema anterior**: Coordenadas incorretas causavam pin no local errado

### Estacionamento Nilson Nelson 🅿️
- **Coordenadas**: `-15.7845, -47.901`
- **Status**: ✅ Configurado

---

## 🖼️ Sobre as Imagens dos Locais

As imagens são buscadas automaticamente da **Google Places API**. O sistema:

1. Busca pelo nome do local nas coordenadas especificadas
2. Tenta diferentes variações do nome (com "Brasília", "DF", etc.)
3. Exibe a primeira foto encontrada
4. Se não encontrar, mostra uma mensagem "📷 Imagem não disponível"

### Por que a imagem pode não aparecer?

1. **Places API não habilitada** - Habilite conforme instruções acima
2. **Coordenadas incorretas** - ✅ **JÁ CORRIGIDO**
3. **Local não tem fotos cadastradas no Google** - Neste caso é normal
4. **Limite de requisições atingido** - Verifique suas cotas no Console

---

## 💰 Custos e Cotas

### Cotas Gratuitas (Google Maps Platform):
- **$200 USD/mês em créditos gratuitos**
- Maps JavaScript API: ~28.000 carregamentos/mês grátis
- Places API (photos): ~5.000 requisições/mês grátis

### Monitoramento:
1. Acesse: https://console.cloud.google.com/google/maps-apis/quotas
2. Monitore o uso em tempo real
3. Configure alertas de cota se necessário

---

## 🚀 Próximos Passos

1. ✅ Habilite as APIs necessárias no Google Cloud Console
2. ✅ Reinicie o servidor de desenvolvimento
3. ✅ Teste o mapa acessando a página de mapa
4. ✅ Clique nos pins e verifique se as imagens aparecem
5. ✅ Verifique o console do navegador por erros

---

## 📞 Suporte

Se após seguir todos os passos o mapa ainda não funcionar:

1. Verifique o console do navegador (F12)
2. Verifique se as APIs estão habilitadas no Google Cloud Console
3. Confirme que o arquivo `.env` foi criado e contém a chave correta
4. Limpe o cache do navegador (Ctrl+Shift+Delete)

---

## 🔗 Links Úteis

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)