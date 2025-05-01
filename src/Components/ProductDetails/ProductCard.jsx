import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onSkip, onFavorite }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavorite && onFavorite(product.id, !isFavorite);
  };

  const handleSkipClick = (e) => {
    e.stopPropagation();
    onSkip && onSkip(product.id);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Paper 
      elevation={2} 
      onClick={handleCardClick}
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        height: '200px',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
          transition: 'all 0.2s ease'
        }
      }}
    >
      <Box 
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: '300px',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      
      <Box sx={{ p: 3, flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 2,
        p: 2
      }}>
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            color: isFavorite ? 'error.main' : 'inherit',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.1)'
            }
          }}
        >
          {isFavorite ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
        </IconButton>
        
        <IconButton
          onClick={handleSkipClick}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ProductCard; 