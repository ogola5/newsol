import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, Typography, Grid, Paper, CircularProgress, Button, TextField, Snackbar, Alert 
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { darken } from "@mui/system"; // Import darken function

function StudentDashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(65); // Mock progress percentage
  const [studentName, setStudentName] = useState("John Doe");
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/student-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/student-login");
  };

  const handleQuery = async () => {
    if (!query.trim()) {
      setError("Please enter a question");
      return;
    }
    
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:5000/query/",  // Note trailing slash
        { 
          query: query,
          // Add these if your backend uses them
          grade: "8", // Example grade, can be dynamic
          subject: "science" // Example subject
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.data.success) {
        setResponse(res.data.results || []);
      } else {
        setError(res.data.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Query Error:", error);
      setError(error.response?.data?.error || 
              error.message || 
              "Failed to get response from server");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
          🎓 Welcome, {studentName}!
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#34495e" }}>
          Keep pushing forward—every step counts!
        </Typography>
      </Box>

      {/* Dashboard Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={cardStyle("#2980b9")} elevation={3}>
            <SchoolIcon sx={{ fontSize: 50 }} />
            <Typography variant="h6">My Courses</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={cardStyle("#27ae60")} elevation={3}>
            <AssignmentIcon sx={{ fontSize: 50 }} />
            <Typography variant="h6">Assignments</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={cardStyle("#f39c12")} elevation={3}>
            <TrendingUpIcon sx={{ fontSize: 50 }} />
            <Typography variant="h6">Progress</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={cardStyle("#e74c3c")} elevation={3}>
            <NotificationsActiveIcon sx={{ fontSize: 50 }} />
            <Typography variant="h6">Announcements</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Progress Section */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
          Learning Progress
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress variant="determinate" value={progress} size={100} thickness={5} />
        </Box>
        <Typography variant="h6" sx={{ mt: 1, color: "#34495e" }}>
          {progress}% Completed
        </Typography>
      </Box>

      {/* Query Section for LLM-RAG */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: "white", borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#2c3e50" }}>
          🤖 Ask the AI Tutor
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your question here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleQuery} disabled={loading} sx={{ mr: 2 }}>
          {loading ? "Fetching..." : "Ask AI"}
        </Button>

        {/* AI Response Section */}
        {response.length > 0 && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: "#ecf0f1", borderRadius: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
              AI Recommendations:
            </Typography>
            <ul>
              {response.map((item, index) => (
                <li key={index} style={{ color: "#34495e" }}>{item}</li>
              ))}
            </ul>
          </Box>
        )}
      </Box>

      {/* Logout Button */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ px: 3, py: 1 }}>
          Logout
        </Button>
      </Box>

      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// Card Styles
const cardStyle = (color) => ({
  p: 3,
  textAlign: "center",
  backgroundColor: color,
  color: "white",
  borderRadius: 2,
  "&:hover": { backgroundColor: darken(color, 0.2) },
});

export default StudentDashboard;
