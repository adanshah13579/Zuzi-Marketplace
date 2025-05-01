import { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  IconButton,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Favorite as FavoriteIcon, 
  FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material';
import colors from '../../Style/colors';

const SwipeCard = ({ product, isFavorite: initialFavorite = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically update the global state or make an API call
    // to save the favorite status
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: 400,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
    >
      <Box sx={{ position: 'relative', flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        <Box sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: 1.5,
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <IconButton 
            onClick={handleFavorite}
            size="small"
            sx={{ 
              color: isFavorite ? colors.primary : colors.tertiary,
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.8)'
              }
            }}
          >
            {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
          <Chip
            label={product.location}
            size="small"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ 
        p: 2,
        backgroundColor: 'white'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            color: colors.secondary,
            mb: 0.5,
            fontSize: '1rem',
            textAlign: 'right'
          }}
        >
          {product.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 1.5,
            fontSize: '0.875rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textAlign: 'right'
          }}
        >
          {product.description}
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: colors.primary,
            fontWeight: 700,
            fontSize: '1rem',
            textAlign: 'right'
          }}
        >
          ₪{product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SwipeCard; 