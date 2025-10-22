#!/bin/bash

# Script de Verificação da Configuração do Google Maps
# Arena BRB - MVP Sprint

echo "🔍 Verificando configuração do Google Maps..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se o arquivo .env existe
echo "📄 Verificando arquivo .env..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ Arquivo .env encontrado${NC}"

    # Verificar se a API key está configurada
    if grep -q "VITE_GOOGLE_MAPS_API_KEY" .env; then
        API_KEY=$(grep "VITE_GOOGLE_MAPS_API_KEY" .env | cut -d '=' -f 2 | tr -d '"' | tr -d ' ')

        if [ ! -z "$API_KEY" ]; then
            # Mascarar a API key para exibição segura
            MASKED_KEY="${API_KEY:0:10}...${API_KEY: -4}"
            echo -e "${GREEN}✅ API Key configurada: $MASKED_KEY${NC}"
        else
            echo -e "${RED}❌ API Key está vazia${NC}"
        fi
    else
        echo -e "${RED}❌ VITE_GOOGLE_MAPS_API_KEY não encontrada no .env${NC}"
    fi
else
    echo -e "${RED}❌ Arquivo .env não encontrado${NC}"
    echo -e "${YELLOW}💡 Criando .env a partir de env.example...${NC}"

    if [ -f "env.example" ]; then
        cp env.example .env
        echo -e "${GREEN}✅ Arquivo .env criado com sucesso${NC}"
    else
        echo -e "${RED}❌ Arquivo env.example não encontrado${NC}"
        exit 1
    fi
fi

echo ""
echo "📍 Verificando coordenadas dos locais..."

# Verificar coordenadas do Ginásio Nilson Nelson
if grep -q "\-15.78314" src/data/mapPoints.ts && grep -q "\-47.903154" src/data/mapPoints.ts; then
    echo -e "${GREEN}✅ Coordenadas do Ginásio Nilson Nelson corretas (-15.783140, -47.903154)${NC}"
else
    echo -e "${RED}❌ Coordenadas do Ginásio Nilson Nelson incorretas${NC}"
fi

echo ""
echo "🔧 Verificando dependências..."

# Verificar se node_modules existe
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules encontrado${NC}"

    # Verificar se @googlemaps/js-api-loader está instalado
    if [ -d "node_modules/@googlemaps/js-api-loader" ]; then
        echo -e "${GREEN}✅ @googlemaps/js-api-loader instalado${NC}"
    else
        echo -e "${RED}❌ @googlemaps/js-api-loader não encontrado${NC}"
        echo -e "${YELLOW}💡 Execute: npm install${NC}"
    fi
else
    echo -e "${RED}❌ node_modules não encontrado${NC}"
    echo -e "${YELLOW}💡 Execute: npm install${NC}"
fi

echo ""
echo "📋 Resumo das Configurações:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}Locais no Mapa:${NC}"
echo "  🏟️  Arena BRB Mané Garrincha"
echo "      Coordenadas: -15.783611, -47.899167"
echo ""
echo "  🏀 Ginásio Nilson Nelson"
echo "      Coordenadas: -15.783140, -47.903154 ✅ CORRIGIDO"
echo ""
echo "  🅿️  Estacionamento Nilson Nelson"
echo "      Coordenadas: -15.7845, -47.901"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}⚠️  IMPORTANTE: Habilite as seguintes APIs no Google Cloud Console:${NC}"
echo ""
echo "  1. Maps JavaScript API"
echo "     https://console.cloud.google.com/apis/library/maps-backend.googleapis.com"
echo ""
echo "  2. Places API"
echo "     https://console.cloud.google.com/apis/library/places-backend.googleapis.com"
echo ""
echo "  3. Geocoding API (Recomendada)"
echo "     https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}📖 Para mais informações, consulte:${NC}"
echo "   GOOGLE_MAPS_SETUP.md"
echo ""
echo -e "${GREEN}✨ Próximo passo:${NC}"
echo "   1. Habilite as APIs no Google Cloud Console (links acima)"
echo "   2. Execute: npm run dev"
echo "   3. Acesse a página do mapa"
echo "   4. Clique nos pins para verificar as imagens"
echo ""

# Verificar se há processos do Vite rodando
if pgrep -f "vite" > /dev/null; then
    echo -e "${YELLOW}⚠️  Servidor Vite detectado rodando${NC}"
    echo -e "${YELLOW}💡 Reinicie o servidor para aplicar as alterações:${NC}"
    echo "   - Pressione Ctrl+C no terminal do servidor"
    echo "   - Execute: npm run dev"
    echo ""
fi

echo -e "${GREEN}✅ Verificação concluída!${NC}"
