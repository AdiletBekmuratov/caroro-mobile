import { Category } from './category.type';
import { Company } from './company.type';
import { Engine } from './engine.type';
import { GearBox } from './gearbox.type';
import { Make } from './make.type';
import { VehicleImage } from './vehicle-image.type';
import { VehicleType } from './vehicle-type.type';

export type Vehicle = {
  id: number;
  company: Company;
  companyId: number;
  vin: string;
  make?: Make | null;
  model: string;
  plateNumber: number;
  available: boolean;
  enabled: boolean;
  lon: number;
  lat: number;
  price: number;
  year: number;
  distance?: number;
  otherInfo: {
    description: string;
    label: string;
  }[];
  description: string;
  images: VehicleImage[];
  vehicleType: VehicleType | null;
  vehicleTypeId: number;
  gearbox: GearBox | null;
  gearboxId: number;
  engine: Engine | null;
  engineId: number;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
};
