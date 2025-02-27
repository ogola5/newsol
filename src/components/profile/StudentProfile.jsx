import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function StudentProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const studentData = location.state?.studentData || null;

  if (!studentData) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No student data available. Please register and log in.</Typography>
        <Button variant="contained" onClick={() => navigate('/register')} sx={{ mt: 2 }}>
          Go to Registration
        </Button>
      </Box>
    );
  }

  const { fullName, dateOfBirth, email, parentEmail, gradeLevel } = studentData;

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Student Profile
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Full Name:</strong> {fullName}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Date of Birth:</strong> {new Date(dateOfBirth).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Email:</strong> {email}
      </Typography>
      {parentEmail && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Parent/Guardian Email:</strong> {parentEmail}
        </Typography>
      )}
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Grade Level:</strong> {gradeLevel}
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Log Out (Simulation)
      </Button>
    </Box>
  );
}

export default StudentProfile;