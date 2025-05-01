import { useState, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Button } from '@mui/material';
import colors from '../../Style/colors';

const HeroSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Zuzi',
      subtitle: 'חיים מודרניים',
      description: 'מחדשים את הדרך בה אנחנו מתחברים ומשתפים חוויות',
      color: colors.primary,
      bgColor: colors.secondary
    },
    {
      id: 2,
      title: 'Zuzi',
      subtitle: 'פתרונות חכמים',
      description: 'גישות חדשניות לאתגרים יומיומיים',
      color: colors.secondary,
      bgColor: colors.primary
    },
    {
      id: 3,
      title: 'Zuzi',
      subtitle: 'קדימה לעתיד',
      description: 'חלוצים בדרכים חדשות לשפר את אורח החיים שלך',
      color: colors.primary,
      bgColor: colors.secondary
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ 
      position: 'relative',
      height: isMobile ? '70vh' : '90vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: slide.bgColor,
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4
          }}
        >
          <Box sx={{ 
            maxWidth: '1000px',
            width: '100%',
            textAlign: 'center',
            color: slide.color,
            p: 6,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(45deg, ${slide.bgColor} 0%, transparent 100%)`,
              opacity: 0.8,
              zIndex: 0
            }
          }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant={isMobile ? "h2" : "h1"}
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  letterSpacing: -1,
                  fontSize: isMobile ? '3rem' : '5rem',
                  fontFamily:"'Poppins', sans-serif"
                }}
              >
                {slide.title}
              </Typography>
              <Typography 
                variant={isMobile ? "h4" : "h3"}
                sx={{ 
                  mb: 4,
                  fontWeight: 600,
                  letterSpacing: -0.5,
                  fontSize: isMobile ? '1.5rem' : '2.5rem'
                }}
              >
                {slide.subtitle}
              </Typography>
              <Typography 
                variant="body1"
                sx={{ 
                  mb: 6,
                  fontSize: isMobile ? '1.1rem' : '1.5rem',
                  fontWeight: 400,
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                {slide.description}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: slide.color,
                  color: slide.bgColor,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: slide.color,
                    opacity: 0.9,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                התחל את המסע שלך
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HeroSlider; 