import { useState } from "react";
import { Button, TextField, Typography, Box, Snackbar } from "@mui/material";
import { addQuiz } from "../../Api/quizzes";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddQuiz() {
  const [quizData, setQuizData] = useState({
    Judul: "",
    Deskripsi: "",
    WaktuMulai: "",
    WaktuSelesai: "",
  });

  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedQuizData = {
        ...quizData,
        Judul: quizData.Judul.toString(),
        Deskripsi: quizData.Deskripsi.toString(),
        WaktuMulai: new Date(quizData.WaktuMulai).toISOString(),
        WaktuSelesai: new Date(quizData.WaktuSelesai).toISOString(),
      };
  
      await addQuiz(
        formattedQuizData.Judul,
        formattedQuizData.Deskripsi,
        formattedQuizData.WaktuMulai,
        formattedQuizData.WaktuSelesai
      );
  
      setShowSuccessSnackbar(true);
  
      setTimeout(() => {
        navigateToAddQuestion();
      }, 2000);
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  };
  
  
  const navigateToAddQuestion = () => {
    navigate("/addquestion");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {/* Menggunakan Button untuk navigasi ke halaman utama */}
      <Button
        onClick={navigateToHome}
        className="font-bold text-xl py-3 px-6 bg-[#4a00ff] text-white rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
        style={{
          position: "absolute",
          top: "100px",
          left: "145px",
        }}
      >
        <ArrowBackIcon /> Home
      </Button>

      <form onSubmit={handleSubmit} style={{ width: "80%" }}>
        <Typography variant="h5" gutterBottom className="text-center font-bold">
          Add Quiz
        </Typography>
        <a className="font-bold">Judul</a>
        <TextField
          name="Judul"
          label="Judul"
          variant="outlined"
          fullWidth
          margin="normal"
          value={quizData.Judul}
          onChange={handleChange}
        />
        <a className="font-bold">Deskripsi</a>
        <TextField
          name="Deskripsi"
          label="Deskripsi"
          variant="outlined"
          fullWidth
          margin="normal"
          value={quizData.Deskripsi}
          onChange={handleChange}
        />
        <a className="font-bold">Waktu Mulai</a>
        <TextField
          name="WaktuMulai"
          variant="outlined"
          fullWidth
          margin="normal"
          type="datetime-local"
          value={quizData.WaktuMulai}
          onChange={handleChange}
        />
        <a className="font-bold">Waktu Selesai</a>
        <TextField
          name="WaktuSelesai"
          variant="outlined"
          fullWidth
          margin="normal"
          type="datetime-local"
          value={quizData.WaktuSelesai}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#4a00ff" }}
        >
          Add Quiz
        </Button>
      </form>

      {/* Snackbar untuk menampilkan pesan sukses */}
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSuccessSnackbar(false)}
        message="Quiz added successfully!"
      />
    </Box>
  );
}
