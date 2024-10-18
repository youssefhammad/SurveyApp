// src/api/surveyApi.js
import api from "./api";

export const fetchSurvey = async (surveyId) => {
  try {
    const response = await api.get(`/surveys/${surveyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitResponse = async (responseData) => {
  try {
    const response = await api.post(`/responses/Submit`, responseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
