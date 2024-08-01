import axios from 'axios';

const EXERCISEDB_API_BASE_URL = 'https://exercisedb.p.rapidapi.com';
const API_KEY = 'e091fc48cdmsh7e8c7956bdc557cp1e2d19jsnd76c0c068c49'; // Replace with your RapidAPI key

const axiosInstance = axios.create({
  baseURL: EXERCISEDB_API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
});

export const fetchExercises = async (searchQuery: string) => {
  try {
    const response = await axiosInstance.get(`/exercises/name/${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};