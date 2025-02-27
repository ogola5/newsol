import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';

const features = [
  {
    title: 'Personalized Learning Paths',
    description: 'Tailored lessons based on your strengths and weaknesses.',
    icon: '🎯',
  },
  {
    title: 'Real-Time AI Tutoring',
    description: 'Get instant feedback and guidance from AI tutors.',
    icon: '🤖',
  },
  {
    title: 'Gamified Learning',
    description: 'Learn through fun and interactive games.',
    icon: '🎮',
  },
];

function FeaturesSection() {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;