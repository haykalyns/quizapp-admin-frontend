import { useState } from "react";
import { Button, TextField, Typography, Box, Snackbar } from "@mui/material";
import { addQuestion } from "../../Api/question";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddQuestion() {
  const [questionData, setQuestionData] = useState({
    Pertanyaan: "",
    OpsiJawaban: Array.from({ length: 4 }, () => ""),
    JawabanBenar: 0,
    QuizID: "", // Tentukan ID dari quiz yang telah dibuat sebelumnya
  });

  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...questionData.OpsiJawaban];
    newOptions[index] = e.target.value;
    setQuestionData({ ...questionData, OpsiJawaban: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addQuestion(
        questionData.Pertanyaan,
        questionData.OpsiJawaban,
        questionData.JawabanBenar,
        questionData.QuizID
      );

      setShowSuccessSnackbar(true);
      clearForm();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const clearForm = () => {
    setQuestionData({
      Pertanyaan: "",
      OpsiJawaban: Array.from({ length: 4 }, () => ""),
      JawabanBenar: 0,
      QuizID: questionData.QuizID, // Tetap gunakan QuizID yang sama
    });
  };

  const handleCloseSnackbar = () => {
    setShowSuccessSnackbar(false);
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="120vh"
    >
      <Button
        onClick={() => navigate("/")}
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
          Add Question
        </Typography>
        <TextField
          name="QuizID"
          label="Quiz ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={questionData.QuizID}
          onChange={handleChange}
        />
        <TextField
          name="Pertanyaan"
          label="Pertanyaan"
          variant="outlined"
          fullWidth
          margin="normal"
          value={questionData.Pertanyaan}
          onChange={handleChange}
        />
        {questionData.OpsiJawaban.map((option, index) => (
          <TextField
            key={index}
            label={`Option ${index + 1}`}
            variant="outlined"
            fullWidth
            margin="normal"
            value={option}
            onChange={(e) => handleOptionChange(e, index)}
          />
        ))}
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            type="button"
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#4a00ff" }}
            onClick={clearForm}
          >
            Add Next Question
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#4a00ff" }}
          >
            Submit
          </Button>
        </Box>
      </form>

      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        message="Question added successfully!"
      />
    </Box>
  );
}
