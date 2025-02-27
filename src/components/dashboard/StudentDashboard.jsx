import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // For prop-types
import { Box, Typography, LinearProgress, Grid, Button, Paper, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School'; // For student identity
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // For completion
import StarIcon from '@mui/icons-material/Star'; // For mastery
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For achievements
import { styled } from '@mui/system';

// Styled component for progress bars
const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginBottom: theme.spacing(2),
}));

function StudentDashboard({ isAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Mock data for student progress
  const [studentProgress, setStudentProgress] = useState({
    name: 'Sarah',
    subjects: [
      { name: 'Mathematics', completion: 85, mastery: 'Advanced' },
      { name: 'Reading', completion: 60, mastery: 'Intermediate' },
      { name: 'Science', completion: 45, mastery: 'Beginner' },
      { name: 'History', completion: 70, mastery: 'Intermediate' },
      { name: 'Geography', completion: 55, mastery: 'Beginner' },
    ],
    achievements: [
      { name: 'Math Whiz', icon: <CheckCircleIcon /> },
      { name: 'Bookworm', icon: <CheckCircleIcon /> },
    ],
  });

  // Commented-out authentication logic (uncomment when needed)
  /*
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/student-login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);
  */

  // API placeholder (uncomment when backend is ready)
  /*
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('/api/student/progress');
        const data = await response.json();
        setStudentProgress(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchStudentData();
  }, []);
  */

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <SchoolIcon sx={{ mr: 2, color: theme.palette.primary.main }} /> Welcome, {studentProgress.name}! Your Learning Progress
      </Typography>

      {/* Subjects Grid */}
      <Grid container spacing={4}>
        {studentProgress.subjects.map((subject, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                {subject.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUpIcon sx={{ mr: 1, color: theme.palette.success.main }} />
                <Typography>Completion: {subject.completion}%</Typography>
              </Box>
              <StyledLinearProgress variant="determinate" value={subject.completion} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
                <Typography>Mastery: {subject.mastery}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Achievements Section */}
      <Typography variant="h5" sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}>
        <CheckCircleIcon sx={{ mr: 2, color: theme.palette.secondary.main }} /> Achievements
      </Typography>
      <Grid container spacing={3}>
        {studentProgress.achievements.map((achievement, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
              {achievement.icon}
              <Typography variant="body1" sx={{ ml: 2 }}>
                {achievement.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Encouragement Message */}
      <Typography variant="body1" sx={{ mt: 6, textAlign: 'center', fontStyle: 'italic' }}>
        Keep up the great work! Your progress is accelerating—explore more challenges ahead.
      </Typography>

      {/* Logout Button (Simulation) */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Log Out (Simulation)
        </Button>
      </Box>
    </Box>
  );
}

// PropTypes to fix ESLint warning
StudentDashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default StudentDashboard;