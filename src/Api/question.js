import api from "./index"

export const addQuestion = async (quizID, questionData) => {
    try {
      const response = await api.post(`/create-questions/${quizID}`, questionData);
      return response.data || null;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  };
  