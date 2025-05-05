import { Card, CardMedia, CardContent, Typography, Box, useTheme, useMediaQuery, Chip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import colors from '../../Style/colors';

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('he-IL').format(price);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
        },
        direction: 'rtl'
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.images[currentImageIndex]}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        <Chip
          label={product.location}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: 'rgba(255,255,255,0.9)',
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
        
        {/* Image Navigation Buttons */}
        {product.images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: 8,
                bottom: 8,
                backgroundColor: 'rgba(255,255,255,0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.8)'
                }
              }}
            >
              <ChevronRight />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 8,
                bottom: 8,
                backgroundColor: 'rgba(255,255,255,0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.8)'
                }
              }}
            >
              <ChevronLeft />
            </IconButton>
          </>
        )}
      </Box>
      
      <CardContent sx={{ 
        flexGrow: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            color: colors.secondary,
            mb: 1
          }}
        >
          {product.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: colors.primary,
              fontWeight: 700
            }}
          >
            ₪{formatPrice(product.price)}
          </Typography>
          
          <Chip
            label="משומש"
            size="small"
            sx={{
              backgroundColor: colors.secondary,
              color: 'white',
              fontWeight: 600
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 