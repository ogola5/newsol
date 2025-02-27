import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // For prop-types
import { Box, Typography, Grid, Card, CardContent, Button, Paper, useTheme, LinearProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People'; // For students mentored
import EventIcon from '@mui/icons-material/Event'; // For classes conducted
import CreateIcon from '@mui/icons-material/Create'; // For lessons created
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'; // For assessments graded
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For achievements
import { styled } from '@mui/system';

// Styled component for progress bars
const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginBottom: theme.spacing(2),
}));

function TeacherDashboard({ isAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Mock data for teacher contributions
  const [teacherData, setTeacherData] = useState({
    name: 'Mr. Johnson',
    studentsMentored: 25,
    classesConducted: 40,
    contributions: {
      lessonsCreated: 15,
      assessmentsGraded: 120,
    },
    achievements: [
      { name: 'Top Mentor', icon: <CheckCircleIcon /> },
      { name: 'Lesson Innovator', icon: <CheckCircleIcon /> },
    ],
  });

  // Commented-out authentication logic (uncomment when needed)
  /*
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/teacher-login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);
  */

  // API placeholder (uncomment when backend is ready)
  /*
  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await fetch('/api/teacher/contributions');
        const data = await response.json();
        setTeacherData(data);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };
    fetchTeacherData();
  }, []);
  */

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <PeopleIcon sx={{ mr: 2, color: theme.palette.primary.main }} /> Welcome, {teacherData.name}! Your Contributions
      </Typography>

      {/* Contributions Grid */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon sx={{ mr: 1, color: theme.palette.success.main }} /> Students Mentored
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {teacherData.studentsMentored}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon sx={{ mr: 1, color: theme.palette.warning.main }} /> Classes Conducted
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {teacherData.classesConducted}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CreateIcon sx={{ mr: 1, color: theme.palette.info.main }} /> Lessons Created
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {teacherData.contributions.lessonsCreated}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AssignmentTurnedInIcon sx={{ mr: 1, color: theme.palette.error.main }} /> Assessments Graded
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {teacherData.contributions.assessmentsGraded}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Achievements Section */}
      <Typography variant="h5" sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}>
        <CheckCircleIcon sx={{ mr: 2, color: theme.palette.secondary.main }} /> Achievements
      </Typography>
      <Grid container spacing={3}>
        {teacherData.achievements.map((achievement, index) => (
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
        Your impact is shaping the future of education—keep inspiring your students!
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
TeacherDashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default TeacherDashboard;