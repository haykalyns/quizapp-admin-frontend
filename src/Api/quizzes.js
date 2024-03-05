import api from "./index";

export const fetchAllQuizzes = async () => {
  try {
    const response = await api.get("/quiz");
    return response.data.quizzes || [];
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
    throw error;
  }
};

export const fetchQuizzesByEndTime = async (endTime) => {
  try {
    const response = await api.get(`/quiz?endTime=${endTime}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes by end time:", error);
    throw error;
  }
};

export const updateQuiz = async (quizId, updatedQuizData) => {
  try {
    const response = await api.put(`/quiz/${quizId}`, updatedQuizData);
    return response.data;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
};

export const addQuiz = async (Judul, Deskripsi, WaktuMulai, WaktuSelesai) => {
  try {
    const formattedJudul = Judul.toString();
    const formattedDeskripsi = Deskripsi.toString();
    const formattedWaktuMulai = WaktuMulai.toString();
    const formattedWaktuSelesai = WaktuSelesai.toString();

    const nonStringData = [];
    if (typeof formattedJudul !== 'string') nonStringData.push('Judul');
    if (typeof formattedDeskripsi !== 'string') nonStringData.push('Deskripsi');
    if (typeof formattedWaktuMulai !== 'string') nonStringData.push('WaktuMulai');
    if (typeof formattedWaktuSelesai !== 'string') nonStringData.push('WaktuSelesai');

    if (nonStringData.length > 0) {
      const errorMessage = `Non-string data found: ${nonStringData.join(', ')}`;
      throw new Error(errorMessage);
    }

    const response = await api.post("/quiz",{
      "Judul": formattedJudul,
      "Deskripsi": formattedDeskripsi,
      "WaktuMulai": formattedWaktuMulai,
      "WaktuSelesai": formattedWaktuSelesai
    });
    return response.data || null;
  } catch (error) {
    console.error("Error adding quiz:", error);
    throw error;
  }
};

export const removeQuiz = async (quizId) => {
  try {
    await api.delete(`/quizzes/${quizId}`);
  } catch (error) {
    console.error("Error removing quiz:", error);
    throw error;
  }
};

export const markQuizAttempted = async (
  userId,
  quizId,
  questionId,
  userAnswer,
  score
) => {
  try {
    const response = await api.patch(`/jawaban_peserta/${userId}/${quizId}`, {
      pertanyaan_id: questionId,
      jawaban_peserta: userAnswer,
      skor: score,
    });
    return response.data;
  } catch (error) {
    console.error("Error marking quiz as attempted:", error);
    throw error;
  }
};

export const fetchQuizById = async (quizId) => {
  try {
    const response = await api.get(`/quiz/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    throw error;
  }
};
