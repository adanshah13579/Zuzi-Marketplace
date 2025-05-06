import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import SwipeCard from './SwipeCard';
import { categories } from '../../data/data';
import colors from '../../Style/colors';
import { sampleListings } from '../../data/data';

// Sample listings for each category


const SwipeContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      width: '100%',
      py: 4
    }}>
      {categories.map(category => {
        const categoryListings = sampleListings[category.id] || [];

        return (
          <Box 
            key={category.id} 
            id={`category-${category.id}`}
            sx={{ mb: 6 }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                color: colors.secondary,
                fontWeight: 700,
                mb: 3,
                textAlign: 'right'
              }}
            >
              {category.name}
            </Typography>
            
            <Box sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              width: '100%',
              px: { xs: 0, sm: 4 },
              justifyContent: 'flex-start'
            }}>
              {categoryListings.map((product) => (
                <Box 
                  key={product.id} 
                  sx={{ 
                    width: isMobile ? '100%' : 'calc(25% - 24px)',
                    minWidth: { xs: '100%', sm: 250 },
                    flexShrink: 0
                  }}
                >
                  <SwipeCard product={product} />
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default SwipeContainer; 