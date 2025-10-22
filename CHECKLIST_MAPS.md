# ✅ Checklist - Configuração Google Maps

## 🎯 Status Atual das Correções

### ✅ Concluído Automaticamente
- [x] API Key atualizada para: `AIzaSyAhg1nMd8JJhhhDnm4pTM0waCGEk_p-WbA`
- [x] Arquivo `.env` criado com a nova chave
- [x] Coordenadas do Ginásio Nilson Nelson corrigidas
  - Antes: `-15.784, -47.9005` ❌
  - Agora: `-15.783140, -47.903154` ✅
- [x] Busca de fotos melhorada (raio 5km, mais variações)
- [x] Dependências instaladas (`@googlemaps/js-api-loader`)
- [x] Documentação completa criada

---

## ⚠️ VOCÊ PRECISA FAZER (OBRIGATÓRIO)

### 1️⃣ Habilitar APIs no Google Cloud Console

Acesse: https://console.cloud.google.com/

#### [ ] Maps JavaScript API
- Link: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
- Clique em **"Enable"** ou **"Ativar"**
- ✅ Necessária para renderizar o mapa

#### [ ] Places API
- Link: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
- Clique em **"Enable"** ou **"Ativar"**
- ✅ Necessária para buscar fotos dos locais

#### [ ] Geocoding API (Opcional mas recomendada)
- Link: https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com
- Clique em **"Enable"** ou **"Ativar"**
- ✅ Útil para funcionalidades futuras

---

## 🧪 Testes

### 2️⃣ Reiniciar o Servidor
```bash
# Pare o servidor atual (Ctrl+C)
# Depois execute:
npm run dev
```

#### [ ] Servidor reiniciado com sucesso

---

### 3️⃣ Testar no Navegador

#### [ ] Abrir a aplicação
- URL: http://localhost:5173

#### [ ] Navegar até a página do mapa

#### [ ] Verificar os 3 pins no mapa:
- [ ] 🏟️ Arena BRB Mané Garrincha
- [ ] 🏀 Ginásio Nilson Nelson (local correto agora!)
- [ ] 🅿️ Estacionamento Nilson Nelson

#### [ ] Clicar em cada pin e verificar:
- [ ] Nome do local aparece
- [ ] Descrição aparece
- [ ] Foto do local aparece (ou mensagem "Imagem não disponível")
- [ ] Informações de horário e endereço aparecem

#### [ ] Abrir DevTools (F12) e verificar:
- [ ] Aba Console não tem erros em vermelho
- [ ] Mensagem "Foto encontrada para..." aparece (opcional)

---

## 🐛 Se Algo Não Funcionar

### Erros Comuns:

#### Erro: `ApiNotActivatedMapError`
- [ ] Verifiquei que habilitei a **Maps JavaScript API**
- [ ] Aguardei 2-3 minutos após habilitar
- [ ] Limpei o cache do navegador

#### Erro: `RefererNotAllowedMapError`
- [ ] Configurei HTTP referrers no Google Cloud Console
- [ ] Adicionei `localhost:*` nas restrições

#### Erro: Places API negada
- [ ] Verifiquei que habilitei a **Places API**
- [ ] Aguardei 2-3 minutos após habilitar

#### Mapa aparece cinza/sem estradas
- [ ] Verifiquei que a API Key está correta no `.env`
- [ ] Reiniciei o servidor após alterar `.env`
- [ ] APIs estão habilitadas no Google Cloud Console

---

## 📚 Recursos de Ajuda

#### [ ] Li o arquivo `RESUMO_ALTERACOES_MAPS.md`
#### [ ] Consultei o arquivo `GOOGLE_MAPS_SETUP.md`
#### [ ] Executei o script `./verify-maps.sh`

---

## ✨ Checklist Final

- [ ] APIs habilitadas no Google Cloud Console
- [ ] Servidor reiniciado
- [ ] Mapa carregando corretamente
- [ ] 3 pins visíveis e no local correto
- [ ] Ginásio Nilson Nelson no local exato (-15.783140, -47.903154)
- [ ] Fotos aparecendo ao clicar nos pins
- [ ] Sem erros no console do navegador

---

## 🎉 Quando Tudo Estiver ✅

**Parabéns! O Google Maps está funcionando perfeitamente!**

- O pin do Ginásio Nilson Nelson está no local correto
- As imagens dos locais devem aparecer
- A estilização customizada está aplicada
- Tudo pronto para uso!

---

## 📞 Precisa de Mais Ajuda?

Execute o script de verificação:
```bash
./verify-maps.sh
```

Ou consulte a documentação completa em:
- `GOOGLE_MAPS_SETUP.md` - Guia completo
- `RESUMO_ALTERACOES_MAPS.md` - Resumo das alterações

---

**Última atualização**: Configuração concluída - APIs pendentes de habilitação