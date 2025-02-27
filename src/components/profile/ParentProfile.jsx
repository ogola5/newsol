import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function ParentProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const parentData = location.state?.parentData || null;

  if (!parentData) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No parent data available. Please register and log in.</Typography>
        <Button variant="contained" onClick={() => navigate('/parent-register')} sx={{ mt: 2 }}>
          Go to Registration
        </Button>
      </Box>
    );
  }

  const { fullName, email, phoneNumber, childrenEmails } = parentData;

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Parent Profile
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Full Name:</strong> {fullName}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Email:</strong> {email}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Phone Number:</strong> {phoneNumber}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Children Emails:</strong> {childrenEmails}
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Log Out (Simulation)
      </Button>
    </Box>
  );
}

export default ParentProfile;