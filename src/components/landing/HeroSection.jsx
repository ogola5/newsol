import { Box, Typography, Button, Container, Menu, MenuItem } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import StudentForm from '../onboarding/StudentForm';
import ParentForm from '../onboarding/ParentForm';
import TeacherForm from '../onboarding/TeacherForm';
import AdminForm from '../onboarding/AdminForm';

// Import images from src/assets/images
import person1 from '../../assets/images/person1.jpg';
import person2 from '../../assets/images/person2.png';
import person3 from '../../assets/images/person3.jpg';
import person4 from '../../assets/images/person4.avif';

// Array of imported images
const images = [person1, person2, person3, person4];

function HeroSection() {
  const controls = useAnimation();
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [selectedRole, setSelectedRole] = useState(null); // Selected role (Student, Parent, Teacher, Admin)

  // Animation for the sliding images
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await controls.start({ x: '-100%', transition: { duration: 45, ease: 'linear' } });
        await controls.start({ x: '0%', transition: { duration: 0 } }); // Reset position
      }
    };
    sequence();
  }, [controls]);

  // Handle dropdown menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle dropdown menu close
  const handleMenuClose = (role) => {
    setAnchorEl(null);
    setSelectedRole(role);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
      }}
    >
      {/* Background Image Slider */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '400%', // 4 images side by side
          height: '100%',
          display: 'flex',
          zIndex: -1,
        }}
        animate={controls}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
        }}
      >
        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}
          >
            Revolutionizing Education with AI-Powered Learning
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ mb: 4, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
          >
            Personalized, Accelerated, and Inclusive Learning for Every Student
          </Typography>
        </motion.div>

        {/* "Get Started" Button with Dropdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4 }}
            onClick={handleMenuOpen}
          >
            Get Started
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleMenuClose('student')}>Student</MenuItem>
            <MenuItem onClick={() => handleMenuClose('parent')}>Parent</MenuItem>
            <MenuItem onClick={() => handleMenuClose('teacher')}>Teacher</MenuItem>
            <MenuItem onClick={() => handleMenuClose('admin')}>Admin</MenuItem>
          </Menu>
        </motion.div>

        {/* Display the Selected Form */}
        {selectedRole === 'student' && <StudentForm />}
        {selectedRole === 'parent' && <ParentForm />}
        {selectedRole === 'teacher' && <TeacherForm />}
        {selectedRole === 'admin' && <AdminForm />}
      </Container>
    </Box>
  );
}

export default HeroSection;