import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/images/logo.png'; // Ensure this path is correct

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is medium or smaller
  const [anchorEl, setAnchorEl] = useState(null); // State for mobile menu

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar>
        {/* Logo on the left */}
        <Box sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ height: '50px' }} /> {/* Adjust height as needed */}
        </Box>

        {/* Navigation links (visible on larger screens) */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Typography variant="body1" component="a" href="/" sx={{ color: 'white', textDecoration: 'none' }}>
              Home
            </Typography>
            <Typography variant="body1" component="a" href="/dashboard" sx={{ color: 'white', textDecoration: 'none' }}>
              Dashboard
            </Typography>
            <Typography variant="body1" component="a" href="/learning" sx={{ color: 'white', textDecoration: 'none' }}>
              Learning
            </Typography>
            <Typography variant="body1" component="a" href="/profile" sx={{ color: 'white', textDecoration: 'none' }}>
              Profile
            </Typography>
          </Box>
        )}

        {/* Hamburger menu (visible on smaller screens) */}
        {isMobile && (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component="a" href="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component="a" href="/dashboard">
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component="a" href="/learning">
                Learning
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component="a" href="/profile">
                Profile
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;