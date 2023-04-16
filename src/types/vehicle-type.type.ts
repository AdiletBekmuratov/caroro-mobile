import { Vehicle } from './vehicle.type';

export type VehicleType = {
  id: number;
  name: string;
  vehicles: Vehicle[];
  createdAt: string;
  updatedAt: string;
};
