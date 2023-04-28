import axiosInstance from '@/config/axios';
import { PaginatedResponse, Vehicle } from '@/types/index';

export const findPaginatedVehicles = async ({
  page = 1,
  limit = 50,
  search = '',
  query = '',
}) => {
  const res = await axiosInstance.get<PaginatedResponse<Vehicle>>(
    `/vehicles?limit=${limit}&page=${page}&filter.available=$eq:true&filter.enabled=$eq:true&search=${search}${query}`,
  );
  return res.data;
};
