import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Fade,
  Slide,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import colors from '../../Style/colors';

const slides = [
  {
    id: 1,
    title: 'Zuzi',
    subtitle: 'חיים מודרניים',
    description: 'מחדשים את הדרך בה אנחנו מתחברים ומשתפים חוויות',
    gradient: `linear-gradient(135deg, ${colors.primaryDark}, black)`,
    isDark: true,
  },
  {
    id: 2,
    title: 'Zuzi',
    subtitle: 'פתרונות חכמים',
    description: 'גישות חדשניות לאתגרים יומיומיים',
    gradient: `linear-gradient(135deg, #f4c724, #f4c724)`,
    isDark: false,
  },
  {
    id: 3,
    title: 'Zuzi',
    subtitle: 'קדימה לעתיד',
    description: 'חלוצים בדרכים חדשות לשפר את אורח החיים שלך',
    gradient: `linear-gradient(135deg, black, black)`,
    isDark: true,
  },
];

export default function EnhancedHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSlide, setShowSlide] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timer = setInterval(() => {
      setShowSlide(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setShowSlide(true);
      }, 500);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];
  const textColor = slide.isDark ? '#f4c724' : '#000';
  const buttonBg = slide.isDark ? colors.primary : '#000';
  const buttonText = slide.isDark ? '#000' : '#fff';

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Fade in={showSlide} timeout={1000}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: slide.gradient,
            color: textColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 1s ease-in-out',
          }}
        >
          {/* Blur Circles */}
          <Box
            sx={{
              position: 'absolute',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: colors.primary,
              top: '-60px',
              left: '-60px',
              opacity: 0.1,
              filter: 'blur(100px)',
              animation: 'pulse 6s ease-in-out infinite',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: colors.primary,
              bottom: '-60px',
              right: '-60px',
              opacity: 0.1,
              filter: 'blur(100px)',
              animation: 'pulse 8s ease-in-out infinite',
            }}
          />

          {/* Slide Content */}
          <Container maxWidth="md" sx={{ textAlign: 'center', zIndex: 1 }}>
            <Slide direction="up" in={showSlide} timeout={800}>
              <Box>
                <Typography
                  variant={isMobile ? 'h3' : 'h2'}
                  sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', color: textColor }}
                >
                  {slide.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 500, mb: 2, color: textColor }}>
                  {slide.subtitle}
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, color: textColor }}>
                  {slide.description}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: buttonBg,
                    color: buttonText,
                    fontWeight: 600,
                    px: 5,
                    py: 1.5,
                    borderRadius: 4,
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.3)',
                    '&:hover': {
                      opacity: 0.9,
                    },
                  }}
                >
                  התחל את המסע שלך
                </Button>
              </Box>
            </Slide>
          </Container>

          {/* Dot Navigation */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: 'absolute',
              bottom: 24,
              left: 0,
              right: 0,
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            {slides.map((_, i) => (
              <Box
                key={i}
                onClick={() => {
                  setShowSlide(false);
                  setTimeout(() => {
                    setCurrentSlide(i);
                    setShowSlide(true);
                  }, 400);
                }}
                sx={{
                  width: i === currentSlide ? 24 : 12,
                  height: 12,
                  borderRadius: 999,
                  bgcolor: i === currentSlide ? buttonBg : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </Stack>
        </Box>
      </Fade>

      {/* Keyframes */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.2;
            }
          }
        `}
      </style>
    </Box>
  );
}
