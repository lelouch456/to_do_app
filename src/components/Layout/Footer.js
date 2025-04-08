import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Typography variant="body2" color="textSecondary" align="center">
        Advanced Todo App &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;