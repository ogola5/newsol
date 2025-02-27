import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4, textAlign: 'center' }}>
      <Typography variant="body1">
        © 2023 AI Edu. All rights reserved.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Link href="#" color="inherit" sx={{ mx: 2 }}>
          About Us
        </Link>
        <Link href="#" color="inherit" sx={{ mx: 2 }}>
          Contact
        </Link>
        <Link href="#" color="inherit" sx={{ mx: 2 }}>
          Privacy Policy
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;