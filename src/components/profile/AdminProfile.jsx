import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function AdminProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const adminData = location.state?.adminData || null;

  if (!adminData) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No admin data available. Please register and log in.</Typography>
        <Button variant="contained" onClick={() => navigate('/admin-register')} sx={{ mt: 2 }}>
          Go to Registration
        </Button>
      </Box>
    );
  }

  const { fullName, email } = adminData;

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Admin Profile
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Full Name:</strong> {fullName}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Email:</strong> {email}
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Log Out (Simulation)
      </Button>
    </Box>
  );
}

export default AdminProfile;