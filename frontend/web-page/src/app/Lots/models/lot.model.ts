import { Group } from "../../Groups/models/group.model";

export interface Lot {
    id: number;
    farmId: number;
    name: string;
    trees: number;
    stage: string;
    groups: Group[];
  }