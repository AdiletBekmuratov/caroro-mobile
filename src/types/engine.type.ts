import { Vehicle } from "./vehicle.type";

export type Engine = {
  id: number;
  name: string;
  vehicles: Vehicle[];
  createdAt: string;
  updatedAt: string;
}
