import { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import axios from "../api/api";

const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];
const subjects = ["Mathematics", "Science", "English", "History", "Geography"];

const ExamGenerator = () => {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateExam = async () => {
    if (!grade || !subject || !topic) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setQuestions([]);

    try {
      const response = await axios.post("/generate-exam", {
        grade,
        subject,
        topic,
      });

      setQuestions(response.data.questions);
    } catch (err) {
      setError("Failed to generate exam. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 600, margin: "auto", backgroundColor: "#E3F2FD" }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Generate AI-Based Exam
      </Typography>

      <TextField
        fullWidth
        select
        label="Select Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        margin="normal"
      >
        {grades.map((g, index) => (
          <MenuItem key={index} value={g}>
            {g}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Select Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        margin="normal"
      >
        {subjects.map((s, index) => (
          <MenuItem key={index} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Enter Topic"
        variant="outlined"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<QuizIcon />}
        onClick={handleGenerateExam}
        fullWidth
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Generate Exam"}
      </Button>

      {error && <Typography color="error" variant="body2">{error}</Typography>}

      {questions.length > 0 && (
        <List style={{ marginTop: 10 }}>
          {questions.map((question, index) => (
            <ListItem key={index} divider>
              <Typography variant="body1" color="textPrimary">
                {index + 1}. {question}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default ExamGenerator;
