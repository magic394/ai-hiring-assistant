// src/api/candidates.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5678/webhook';

export const fetchCandidates = async () => {
  const response = await axios.get(`${API_BASE_URL}/candidates`);
  return response.data;
};

export const fetchCandidateById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/candidates/${id}`);
  return response.data;
};

export const submitCandidate = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/candidate-submission`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateCandidateStatus = async (id, status) => {
  const response = await axios.patch(`${API_BASE_URL}/candidates/${id}`, { status });
  return response.data;
};