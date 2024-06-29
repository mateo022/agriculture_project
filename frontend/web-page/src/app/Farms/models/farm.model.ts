import { Lot } from "../../Lots/models/lot.model";

export interface Farm {
    id: number;
    name: string;
    location: string;
    hectares: number;
    description: string;
    lots: Lot[];
  }
  
