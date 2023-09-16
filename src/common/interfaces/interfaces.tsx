export interface StarSystemType {
  name: string;
  x: number;
  y: number;
}

  export interface StarSystemProps {
    system: {
      name: string;
      x: number;
      y: number;
    },
    onMiniMapClick?: (x: number, y: number) => void;  // Add this line  
  }

export interface MiniMapProps {  
  starSystems: StarSystemType[];  
  onMiniMapClick: (x: number, y: number) => void;  
}  

export interface Game {
  systems: StarSystemType[];
}