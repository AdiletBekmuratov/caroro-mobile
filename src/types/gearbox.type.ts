import { Vehicle } from './vehicle.type';

export type GearBox = {
  id: number;
  name: string;
  vehicles: Vehicle[];
  createdAt: string;
  updatedAt: string;
};
