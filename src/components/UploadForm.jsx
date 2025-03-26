import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "../api/api"; // Import API utility

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // "success" or "error"

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !grade || !subject) {
      setMessage("⚠️ Please fill all fields and select a PDF file.");
      setMessageType("error");
      return;
    }
  
    setLoading(true);
    setMessage("");
  
    // 🔥 Retrieve token from localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      setMessage("⚠️ Unauthorized: Please log in as an admin.");
      setMessageType("error");
      setLoading(false);
      return;
    }
  
    // 🔥 Decode JWT to get admin_id
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      var admin_id = payload.admin_id; // Extract admin_id
  
      console.log("Extracted admin_id:", admin_id); // Debugging log
    } catch (error) {
      console.error("Error decoding token:", error);
      setMessage("⚠️ Invalid token. Please log in again.");
      setLoading(false);
      return;
    }
  
    if (!admin_id) {
      setMessage("⚠️ Unauthorized: Missing admin ID.");
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("grade", grade);
    formData.append("subject", subject);
    formData.append("admin_id", admin_id); // Include admin_id in the request
  
    try {
      console.log("Sending request to /upload...");
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      console.log("Upload successful:", response.data);
      setMessage(response.data.message || "✅ File uploaded successfully!");
      setMessageType("success");
  
      setFile(null);
      setGrade("");
      setSubject("");
    } catch (error) {
      console.error("Upload error:", error);
  
      if (error.response) {
        if (error.response.status === 401) {
          setMessage("⚠️ Unauthorized: Your session may have expired. Please log in again.");
        } else {
          setMessage(error.response.data.error || "❌ Upload failed. Please try again.");
        }
      } else {
        setMessage("❌ Upload failed. Please check your connection.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 400, margin: "auto", backgroundColor: "#E3F2FD" }}>
      <Typography variant="h5" gutterBottom color="primary">
        Upload Learning Material
      </Typography>

      <TextField
        fullWidth
        select
        label="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        margin="normal"
      >
        {["Grade 1", "Grade 2", "Grade 3"].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        margin="normal"
      >
        {["Math", "Science", "English"].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ margin: "10px 0", display: "block" }}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Upload"}
      </Button>

      {message && (
        <Alert severity={messageType} style={{ marginTop: 10 }}>
          {message}
        </Alert>
      )}
    </Paper>
  );
};

export default UploadForm;
