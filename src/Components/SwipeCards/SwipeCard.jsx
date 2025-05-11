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
  useMediaQuery,
  Button
} from '@mui/material';
import { 
  Favorite as FavoriteIcon, 
  FavoriteBorder as FavoriteBorderIcon,
  Bed as BedIcon,
  SquareFoot as SquareFootIcon,
  LocalParking as LocalParkingIcon,
  Visibility as VisibilityIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import colors from '../../Style/colors';
import { useNavigate } from 'react-router-dom';

const SwipeCard = ({ product, isFavorite: initialFavorite = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('he-IL').format(price);
  };

  const handleFavorite = (e) => {
    e.stopPropagation(); // prevent card navigation
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{
        width: '100%',
        height: { xs: 200, sm: 450 },
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}
onClick={() => navigate(`/category/${product.id}/${product.subcategories?.[0]?.id}`)}
    >
      {/* Image */}
      <Box sx={{ 
        position: 'relative', 
        height: { xs: '100%', sm: 200 },
        width: { xs: '45%', sm: '100%' }
      }}>
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
            onClick={() => navigate(`/category/${product.id}/${product.subcategories?.[0]?.id}`)}

          />
        </Box>
      </Box>

      {/* Content */}
      <CardContent sx={{ 
        p: { xs: 1.5, sm: 2 },
        backgroundColor: 'white',
        height: { xs: '100%', sm: 250 },
        width: { xs: '55%', sm: '100%' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              color: colors.secondary,
              mb: 0.5,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textAlign: 'right',
              height: { xs: 24, sm: 28 }
            }}
          >
            {product.name}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 0.5,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              display: '-webkit-box',
              WebkitLineClamp: { xs: 1, sm: 2 },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textAlign: 'right',
              height: { xs: 20, sm: 48 }
            }}
          >
            {product.description}
          </Typography>

          {/* Details Row */}
          {product.rooms && (
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              mb: 0.5,
              flexWrap: 'wrap',
              height: { xs: 20, sm: 30 },
              '& > *': {
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }
            }}>
              <Box>
                <BedIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  {product.rooms} חדרים
                </Typography>
              </Box>
              <Box>
                <SquareFootIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  {product.size} מ"ר
                </Typography>
              </Box>
              <Box>
                <LocalParkingIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  {product.parking ? 'חניה' : 'ללא חניה'}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: colors.primary,
              fontWeight: 700,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textAlign: 'right',
              mb: 1,
              height: 24
            }}
          >
            ₪{formatPrice(product.price)}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            justifyContent: 'space-between',
            height: 36
          }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ChatIcon />}
              sx={{
                flex: 1,
                borderColor: colors.primary,
                color: colors.primary,
                '&:hover': {
                  borderColor: colors.primary,
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                },
                '& .MuiButton-startIcon': {
                  marginRight: 0.5,
                  marginLeft: 0.5
                }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              צ'אט
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<VisibilityIcon />}
              sx={{
                flex: 1,
                backgroundColor: colors.primary,
                '&:hover': {
                  backgroundColor: colors.primary
                },
                '& .MuiButton-startIcon': {
                  marginRight: 0.5,
                  marginLeft: 0.5
                }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              פרטים
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SwipeCard;
