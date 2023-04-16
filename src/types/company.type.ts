import { User } from './auth.type';
import { Vehicle } from './vehicle.type';

export type Company = {
  id: number;
  slug: string;
  vehicles: Vehicle[];
  email: string;
  phone: string;
  address: string;
  name: string;
  description: string;
  image: string;
  employees: User[];
  createdAt: string;
  updatedAt: string;
};
