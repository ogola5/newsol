import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function TeacherProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const teacherData = location.state?.teacherData || null;

  if (!teacherData) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6">No teacher data available. Please register and log in.</Typography>
        <Button variant="contained" onClick={() => navigate('/teacher-register')} sx={{ mt: 2 }}>
          Go to Registration
        </Button>
      </Box>
    );
  }

  const { fullName, email, qualifications, subjects } = teacherData;

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Teacher Profile
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Full Name:</strong> {fullName}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Email:</strong> {email}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Qualifications:</strong> {qualifications}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Subjects/Courses:</strong> {subjects}
      </Typography>
      <Button variant="contained" color="secondary" onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Log Out (Simulation)
      </Button>
    </Box>
  );
}

export default TeacherProfile;