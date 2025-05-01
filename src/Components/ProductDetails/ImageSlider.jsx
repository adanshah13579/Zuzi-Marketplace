import { useState } from 'react';
import { 
  Box, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Paper
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Main Image */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: isMobile ? '300px' : '500px',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box
          component="img"
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Paper>

      {/* Navigation Buttons */}
      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,1)'
          }
        }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'rgba(255,255,255,0.9)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,1)'
          }
        }}
      >
        <ChevronRightIcon />
      </IconButton>

      {/* Thumbnail Navigation */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mt: 2,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': {
            height: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px'
          }
        }}
      >
        {images.map((image, index) => (
          <Paper
            key={index}
            elevation={0}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: 1,
              overflow: 'hidden',
              cursor: 'pointer',
              border: `2px solid ${currentIndex === index ? 'primary.main' : 'transparent'}`,
              opacity: currentIndex === index ? 1 : 0.7,
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 1
              }
            }}
          >
            <Box
              component="img"
              src={image}
              alt={`Thumbnail ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider; 