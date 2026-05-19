import api from '../api/axiosInstance';
import { ReferenceData } from '../types';
import { AxiosError } from 'axios';

export const getGenders = async (): Promise<ReferenceData[]> => {
  try {
    const response = await api.get<ReferenceData[]>('/masterdata/Reference/genders');
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Gagal mengambil data gender:", err.message);
    throw err;
  }
};

export const getCitizenships = async (): Promise<ReferenceData[]> => {
  try {
    const response = await api.get<ReferenceData[]>('/masterdata/Reference/citizenships');
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Gagal mengambil data citizenship:", err.message);
    throw err;
  }
};

export const getRelationships = async (): Promise<ReferenceData[]> => {
  try {
    const response = await api.get<ReferenceData[]>('/masterdata/Reference/relationships');
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Gagal mengambil data relationship:", err.message);
    throw err;
  }
};

export const getEnrolmentStatuses = async (): Promise<ReferenceData[]> => {
  try {
    const response = await api.get<ReferenceData[]>('/masterdata/Reference/enrolment-statuses');
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Gagal mengambil data enrolment-statuses:", err.message);
    throw err;
  }
};
