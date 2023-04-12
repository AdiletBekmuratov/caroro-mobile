import { User } from '../types';

export const translateStatus = (status: User['status']) => {
  switch (status) {
    case 'disabled':
      return 'Не активирован';
    case 'pending':
      return 'Ожидание';
    case 'enabled':
      return 'Активно';
    default:
      return 'Не активирован';
  }
};

export const statusColor = (status: User['status']) => {
  switch (status) {
    case 'disabled':
      return 'text-red-400';
    case 'pending':
      return 'text-blue-400';
    case 'enabled':
      return 'text-green-400';
    default:
      return 'text-red-400';
  }
};