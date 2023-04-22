import { OrderStatus } from '../types';

export const translateOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case 'cancelled':
      return 'Отменено';
    case 'pending':
      return 'В Ожидании';
    case 'inprogress':
      return 'Активно';
    case 'completed':
      return 'Завершено';
  }
};

export const orderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'cancelled':
      return 'text-red-400';
    case 'pending':
      return 'text-blue-400';
    case 'inprogress':
      return 'text-teal-500';
    case 'completed':
      return 'text-green-400';
  }
};
