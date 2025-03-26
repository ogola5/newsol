import { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import axios from "../api/api";

const feedbackTypes = ["Student", "Teacher", "Parent"];

const FeedbackForm = () => {
  const [userType, setUserType] = useState("");
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!userType || !comment) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("/submit-feedback", {
        userType,
        rating,
        comment,
      });

      setOpenSnackbar(true);
      setUserType("");
      setRating(3);
      setComment("");
    } catch (err) {
      setError("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <Paper
      elevation={4}
      style={{
        padding: 30,
        maxWidth: 500,
        margin: "auto",
        background: "linear-gradient(135deg, #E3F2FD, #A5D6A7)",
        borderRadius: 15,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        gutterBottom
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        <FeedbackIcon fontSize="large" color="secondary" /> Share Your Feedback
      </Typography>

      <TextField
        fullWidth
        select
        label="Who are you?"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        margin="normal"
        variant="outlined"
      >
        {feedbackTypes.map((type, index) => (
          <MenuItem key={index} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>

      <Typography variant="body1" style={{ margin: "10px 0", fontWeight: "bold" }}>
        Rate Your Experience:
      </Typography>
      <Rating
        name="user-rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        size="large"
      />

      <TextField
        fullWidth
        label="Your Comments"
        variant="outlined"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        style={{ marginTop: 15, fontWeight: "bold" }}
      >
        Submit Feedback
      </Button>

      {error && <Typography color="error" variant="body2">{error}</Typography>}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">Thank you for your feedback!</Alert>
      </Snackbar>
    </Paper>
  );
};

export default FeedbackForm;
