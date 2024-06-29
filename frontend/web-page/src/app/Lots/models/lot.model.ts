export interface Lot {
    id: number;
    farmId: number;
    name: string;
    trees: number;
    stage: string;
    groups: Group[];
  }
  export interface Group {
    id: number;
    lotId: number;
    name: string;
  }