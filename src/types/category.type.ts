import { Vehicle } from './vehicle.type';

export type Category = {
  id: number;
  name: string;
  vehicles: Vehicle[];
  createdAt: Date;
  updatedAt: Date;
};
