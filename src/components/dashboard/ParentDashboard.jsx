import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // For prop-types
import { Box, Typography, Grid, Card, CardContent, Button, Paper, useTheme,LinearProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'; // For parent identity
import FeedbackIcon from '@mui/icons-material/Feedback'; // For feedback
import ChildCareIcon from '@mui/icons-material/ChildCare'; // For children progress
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For achievements
import { styled } from '@mui/system';

// Styled component for progress bars
const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  marginBottom: theme.spacing(2),
}));

function ParentDashboard({ isAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  // Mock data for parent engagement
  const [parentData, setParentData] = useState({
    name: 'Jane Doe',
    feedbackProvided: 8,
    children: [
      { name: 'Sarah', progress: 75 },
      { name: 'David', progress: 60 },
      { name: 'Emily', progress: 90 },
    ],
    achievements: [
      { name: 'Active Contributor', icon: <CheckCircleIcon /> },
      { name: 'Top Supporter', icon: <CheckCircleIcon /> },
    ],
  });

  // Commented-out authentication logic (uncomment when needed)
  /*
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/parent-login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);
  */

  // API placeholder (uncomment when backend is ready)
  /*
  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const response = await fetch('/api/parent/engagement');
        const data = await response.json();
        setParentData(data);
      } catch (error) {
        console.error('Error fetching parent data:', error);
      }
    };
    fetchParentData();
  }, []);
  */

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <FamilyRestroomIcon sx={{ mr: 2, color: theme.palette.primary.main }} /> Welcome, {parentData.name}! Your Engagement
      </Typography>

      {/* Feedback and Children Progress Grid */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FeedbackIcon sx={{ mr: 1, color: theme.palette.success.main }} /> Feedback Provided
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {parentData.feedbackProvided}
            </Typography>
          </Paper>
        </Grid>
        {parentData.children.map((child, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ChildCareIcon sx={{ mr: 1, color: theme.palette.warning.main }} /> {child.name}, Progress
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {child.progress}%
              </Typography>
              <StyledLinearProgress variant="determinate" value={child.progress} />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Achievements Section */}
      <Typography variant="h5" sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}>
        <CheckCircleIcon sx={{ mr: 2, color: theme.palette.secondary.main }} /> Achievements
      </Typography>
      <Grid container spacing={3}>
        {parentData.achievements.map((achievement, index) => (
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
        Your feedback is helping tailor a better learning experience—thank you for your involvement!
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
ParentDashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ParentDashboard;