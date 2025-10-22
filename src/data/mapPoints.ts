import { MapPoint } from "@/types/map";

export const MAP_POINTS: MapPoint[] = [
  {
    id: "arena-brb",
    title: "Arena BRB Mané Garrincha",
    description: "Estádio principal para eventos esportivos e shows",
    position: {
      lat: -15.783611,
      lng: -47.899167,
    },
    type: "venue",
    icon: "🏟️",
  },
  {
    id: "ginasio-nilson-nelson",
    title: "Ginásio Nilson Nelson",
    description: "Ginásio para eventos esportivos e atividades",
    position: {
      lat: -15.78314,
      lng: -47.903154,
    },
    type: "venue",
    icon: "🏀",
  },
  {
    id: "estacionamento-nilson-nelson",
    title: "Estacionamento Nilson Nelson",
    description: "Área de estacionamento para visitantes",
    position: {
      lat: -15.7845,
      lng: -47.901,
    },
    type: "parking",
    icon: "🅿️",
  },
];

export const getMapPoints = (): MapPoint[] => {
  return MAP_POINTS;
};

export const getMapPointById = (id: string): MapPoint | undefined => {
  return MAP_POINTS.find((point) => point.id === id);
};
