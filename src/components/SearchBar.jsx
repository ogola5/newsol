import { useState } from 'react';
import { TextField, Button, Paper, Typography, List, ListItem, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "../api/api"; // Import API utility

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.get(`/query?search=${searchTerm}`);
      setResults(response.data.results);
    } catch (err) {
      setError("Failed to fetch results. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 600, margin: "auto", backgroundColor: "#E3F2FD" }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Search Learning Materials
      </Typography>

      <TextField
        fullWidth
        label="Enter keyword"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
        fullWidth
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Search"}
      </Button>

      {error && <Typography color="error" variant="body2">{error}</Typography>}

      {results.length > 0 && (
        <List style={{ marginTop: 10 }}>
          {results.map((item, index) => (
            <ListItem key={index} divider>
              <Typography variant="body1" color="textPrimary">
                {item.title}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default SearchBar;
