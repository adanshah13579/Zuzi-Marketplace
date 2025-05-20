import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import colors from '../../Style/colors';
import ptBg from '../../assets/ptbg.png';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box 
      sx={{
        width: '100%',
        background: '#FFFDE7',
        minHeight: { xs: '40vh', sm: '45vh', md: '50vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: { xs: '2rem 1rem', sm: '3rem 2rem', md: '4rem 3rem' },
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${ptBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(255,232,115,0.15) 0%, rgba(255,245,231,0) 70%)',
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }
      }}
    >
      {/* Yellow glow effect in background */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(255,232,115,0.3) 0%, rgba(255,245,231,0) 70%)',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />

      <Container 
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 1,
          position: 'relative',
        }}
      >
        {/* Main Title */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            color: '#000',
            mb: 2,
            letterSpacing: '-0.5px',
          }}
        >
          ZUZI
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
            color: '#000',
            mb: 3,
          }}
        >
          חיים מודרניים
        </Typography>

        {/* Description Text */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            color: '#333',
            mb: 4,
            maxWidth: '75%',
          }}
        >
          קנייה אם אתם רוצים שתוכלו לשתף באותו אתר
        </Typography>

        {/* CTA Button */}
        <Button
          variant="contained"
          onClick={() => navigate('/get-started')}
          sx={{
            background: '#000',
            color: '#E6C235',
            fontWeight: 700,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            borderRadius: '0.6rem',
            padding: '0.6rem 2rem',
            textTransform: 'none',
            boxShadow: 'none',
            mb: 4,
            '&:hover': {
              background: '#E6C235',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            },
          }}
        >
          חח חיי המסע שלך
        </Button>

        {/* Dot Navigation Indicators */}
    
      </Container>
    </Box>
  );
};

export default HeroSection;