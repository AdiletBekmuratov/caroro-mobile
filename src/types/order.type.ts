import { User } from './auth.type';
import { Company } from './company.type';
import { Vehicle } from './vehicle.type';

export type OrderStatus = 'pending' | 'inprogress' | 'completed' | 'cancelled';

export class Order {
  id: number;
  status: OrderStatus;
  finalPrice: number;
  user: User | null;
  userId?: number | null;
  company: Company | null;
  companyId?: number | null;
  vehicle: Vehicle | null;
  vehicleId?: number | null;
  createdAt: string;
  startedAt?: string | null;
  finishedAt?: string | null;
}

export class CreateOrderData {
  companyId: number;
  vehicleId: number;
}
