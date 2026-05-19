import api from '../api/axiosInstance';
import { Student } from '../types';
import { AxiosError } from 'axios';

export const getStudents = async () => {
    try {
        // Path disesuaikan dengan UpstreamPathTemplate di ocelot.json
        //const response = await axios.get(`${BASE_URL}/student/Students`);
        const response = await api.get<Student[]>('/student/Students');
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data murid:", error);
        throw error;
    }
};
// Menambahkan murid baru
export const createStudent = async (studentData: Student): Promise<Student> => {
  try {
    const response = await api.post<Student>('/student/Students', studentData);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Gagal menambahkan murid:", err.response?.data || err.message);
    throw err;
  }
};