import { Equipment } from './Equipment';

export type Bike = {
  bikeId: string;
  brandName: string;
  description?: string;
  frameType: number;
  metersLogged: number;
  modelName: string;
  name: string;
  equipment?: Equipment[];
};
