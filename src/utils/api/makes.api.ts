import axiosInstance from '@/config/axios';
import { PaginatedResponse, Make } from '@/types/index';

export const findPaginatedMakes = async ({
  page = 1,
  limit = 50,
  search = '',
}) => {
  const res = await axiosInstance.get<PaginatedResponse<Make>>(
    `/makes?limit=${limit}&page=${page}&search=${search}`,
  );
  return res.data;
};
