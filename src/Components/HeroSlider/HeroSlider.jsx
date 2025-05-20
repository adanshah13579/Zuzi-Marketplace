import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  keyframes,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import colors from '../../Style/colors';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulseGlow = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.3;
  }
`;

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box 
      sx={{
        width: '100%',
        minHeight: { xs: '40vh', sm: '45vh', md: '50vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: { xs: '2rem 1rem', sm: '3rem 2rem', md: '4rem 3rem' },
        position: 'relative',
        overflow: 'hidden',
        // Base yellow gradient
        background: 'linear-gradient(to bottom, #FFEC8B 0%, #FFF8DC 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 10% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 35%),
            radial-gradient(circle at 90% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 35%)
          `,
          zIndex: 0,
          top: 0,
          left: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)', 
          zIndex: 0,
          top: 0,
          left: 0,
        }
      }}
    >
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
            animation: `${fadeIn} 1s ease-out, ${slideUp} 1s ease-out`,
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
            animation: `${fadeIn} 1s ease-out 0.3s both, ${slideUp} 1s ease-out 0.3s both`,
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
            animation: `${fadeIn} 1s ease-out 0.6s both, ${slideUp} 1s ease-out 0.6s both`,
          }}
        >
          קנייה אם אתם רוצים שתוכלו לשתף באותו אתר
        </Typography>

        {/* CTA Button */}
        <Button
          variant="contained"
          onClick={() => navigate('/get-started')}
          sx={{
            background: '#F7D144',
            color: '#000',
            fontWeight: 700,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            borderRadius: '0.6rem',
            padding: '0.6rem 2rem',
            textTransform: 'none',
            boxShadow: 'none',
            mb: 4,
            animation: `${fadeIn} 1s ease-out 0.9s both, ${slideUp} 1s ease-out 0.9s both`,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: '#E6C235',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }}
        >
          חח חיי המסע שלך
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;