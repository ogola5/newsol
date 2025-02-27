import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ParentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // No validation for now - accept any login attempt
    const mockParentData = {
      fullName: 'Test Parent',
      email: email || 'test@parent.com', // Use entered email or default
      phoneNumber: '123-456-7890', // Mock phone number
      childrenEmails: 'child1@example.com, child2@example.com', // Mock children emails
    };

    // Navigate to ParentProfile with mock data
    navigate('/profile/parent', { state: { parentData: mockParentData } });
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
        Parent Login
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

export default ParentLogin;