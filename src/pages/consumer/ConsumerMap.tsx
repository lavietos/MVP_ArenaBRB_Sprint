import { useEffect, useRef } from "react";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";
import { getMapPoints } from "@/data/mapPoints";
import { GOOGLE_MAPS_CONFIG } from "@/config/googleMaps";

const ConsumerMap = () => {
  const { map, isLoaded, error, addMarker, fitBounds, mapRef } =
    useGoogleMaps();
  const mapPoints = getMapPoints();
  const markersAdded = useRef(false);

  // Log de debug
  useEffect(() => {
    console.log("🗺️ ConsumerMap - Estado atual:", {
      isLoaded,
      hasMap: !!map,
      error,
      apiKeyConfigured: !!GOOGLE_MAPS_CONFIG.apiKey,
      pointsCount: mapPoints.length,
    });
  }, [isLoaded, map, error, mapPoints.length]);

  // Adicionar marcadores quando o mapa estiver carregado (apenas uma vez)
  useEffect(() => {
    if (isLoaded && map && !markersAdded.current) {
      markersAdded.current = true;
      console.log("📍 Adicionando marcadores ao mapa...");

      // Adicionar marcadores
      mapPoints.forEach((point) => {
        addMarker(point);
      });

      // Ajustar zoom para mostrar todos os pontos
      fitBounds(mapPoints);
    }
  }, [isLoaded, map, addMarker, fitBounds, mapPoints]);

  if (error) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <header className="bg-card border-b border-border p-4 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-center">
            <img
              src={logoConsumidorArenaBRB}
              alt="Arena BRB"
              className="h-12"
            />
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-red-600 mb-3 flex items-center gap-2">
                ❌ Erro ao carregar o Google Maps
              </h2>
              <p className="text-red-700 mb-4 font-medium">{error}</p>

              <div className="bg-white border border-red-200 rounded p-4 mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  🔍 Informações de Debug:
                </p>
                <div className="space-y-1 text-xs font-mono">
                  <p>• isLoaded: {isLoaded.toString()}</p>
                  <p>• map: {map ? "✅ Sim" : "❌ Não"}</p>
                  <p>
                    • API Key configurada:{" "}
                    {GOOGLE_MAPS_CONFIG.apiKey ? "✅ Sim" : "❌ Não"}
                  </p>
                  {GOOGLE_MAPS_CONFIG.apiKey && (
                    <p>
                      • API Key: {GOOGLE_MAPS_CONFIG.apiKey.substring(0, 10)}...
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  💡 Soluções:
                </p>
                <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                  <li>
                    Abra o Console do navegador (F12) e veja os erros detalhados
                  </li>
                  <li>
                    Verifique se o arquivo{" "}
                    <code className="bg-gray-200 px-1 rounded">.env</code>{" "}
                    existe na raiz do projeto
                  </li>
                  <li>
                    Habilite a{" "}
                    <a
                      href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Maps JavaScript API
                    </a>
                  </li>
                  <li>
                    Habilite a{" "}
                    <a
                      href="https://console.cloud.google.com/apis/library/places-backend.googleapis.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Places API
                    </a>
                  </li>
                  <li>
                    Reinicie o servidor:{" "}
                    <code className="bg-gray-200 px-1 rounded">
                      npm run dev
                    </code>
                  </li>
                </ol>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  🔄 Recarregar Página
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border p-4 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={logoConsumidorArenaBRB} alt="Arena BRB" className="h-12" />
        </div>
      </header>

      <div className="flex-1 relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-muted-foreground font-medium mb-2">
                Carregando Google Maps...
              </p>
              <p className="text-xs text-gray-500">
                Aguarde enquanto inicializamos o mapa
              </p>
              <div className="mt-4 text-xs text-gray-400">
                <p>✓ Carregando API do Google Maps</p>
                <p>✓ Configurando estilos do mapa</p>
                <p>✓ Preparando marcadores</p>
              </div>
            </div>
          </div>
        )}
        <div
          ref={mapRef}
          className="w-full h-full"
          style={{ minHeight: "400px" }}
        />
      </div>

      <div className="bg-card border-t border-border p-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-bold text-foreground mb-2">
            Arena BRB - Complexo Esportivo
          </h3>
          <p className="text-sm text-muted-foreground">
            SRPN - Brasília, DF, 70297-400
          </p>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span>🏟️ Arena BRB Mané Garrincha</span>
            <span>🏀 Ginásio Nilson Nelson</span>
            <span>🅿️ Estacionamento</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerMap;
