export interface Farm {
    id: number;
    name: string;
    location: string;
    hectares: number;
    description: string;
    lots: Lot[];
  }
  
  export interface Lot {
    id: number;
    farmId: number;
    name: string;
    trees: number;
    stage: string;
    groups: any; // Ajusta según el tipo real de 'groups'
  }