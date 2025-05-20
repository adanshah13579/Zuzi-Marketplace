import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import SwipeCard from '../../Components/SwipeCards/SwipeCard';
import colors from '../../Style/colors';

const Favorites = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Dummy favorites data
  const favorites = [
    {
      id: 1,
      name: '4-Room Apartment in Tel Aviv',
      description: 'Spacious apartment on 3rd floor, 120 sqm, large balcony, parking',
      price: 2500000,
      location: 'Tel Aviv',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      isFavorite: true
    },
    {
      id: 2,
      name: 'Private House in Raanana',
      description: '5-room house, 200 sqm, large garden, 2 parking spaces',
      price: 3500000,
      location: 'Raanana',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      isFavorite: true
    },
    {
      id: 3,
      name: 'Labrador Puppy',
      description: 'Male puppy, 3 months old, vaccinated',
      price: 2500,
      location: 'Tel Aviv',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      isFavorite: true
    },
    {
      id: 4,
      name: 'Used Sofa',
      description: '3-seater sofa, excellent condition, gray color',
      price: 800,
      location: 'Holon',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      isFavorite: true
    },
    {
      id: 5,
      name: 'Renovation Services',
      description: 'Professional renovation services, repairs and installations',
      price: 150,
      location: 'Tel Aviv',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      isFavorite: true
    }
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: colors.background
    }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, py: 4, px: 3 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: colors.secondary,
            fontWeight: 700,
            mb: 4,
            textAlign: 'right'
          }}
        >
          פריטים מועדפים
        </Typography>

        {favorites.length === 0 ? (
          <Typography 
            variant="h6" 
            sx={{ 
              color: colors.tertiary,
              textAlign: 'center',
              mt: 4
            }}
          >
            אין פריטים מועדפים
          </Typography>
        ) : (
          <Box sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            width: '100%',
            justifyContent: 'flex-start',
            flexDirection: 'row-reverse'
          }}>
            {favorites.map((product) => (
              <Box 
                key={product.id} 
                sx={{ 
                  width: isMobile ? '100%' : 'calc(25% - 24px)',
                  minWidth: 250,
                  flexShrink: 0
                }}
              >
                <SwipeCard product={product} isFavorite={true} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Favorites; 