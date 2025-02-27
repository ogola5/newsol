import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // No validation for now - accept any login attempt
    // Create a mock student profile with entered data (or leave it minimal)
    const mockStudentData = {
      fullName: 'Test Student', // Mock data if no registration data is needed
      email: email || 'test@student.com', // Use entered email or default
      dateOfBirth: '2005-01-01', // Mock DOB
      gradeLevel: '10', // Mock grade level
      // Add parentEmail if required, but optional for now
    };

    // Navigate to StudentProfile with mock data
    navigate('/profile/student', { state: { studentData: mockStudentData } });
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold' }}>
        Student Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Log In
      </Button>
    </Box>
  );
}

export default StudentLogin;