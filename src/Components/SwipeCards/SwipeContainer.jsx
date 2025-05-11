import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import SwipeCard from './SwipeCard';
import { categories } from '../../data/data';
import colors from '../../Style/colors';

const SwipeContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', py: 4 }}>
      {categories.map((category) => {
        // Create an array with 4 or more "dummy" listings from this category
   const listings = Array.from({ length: 4 }, (_, i) => ({
  ...category,
  _id: `${category.id}-${i}`, // use _id for unique rendering key
}));


        return (
          <Box key={category.id} id={`category-${category.id}`} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{
                color: colors.secondary,
                fontWeight: 700,
                mb: 3,
                textAlign: 'right',
              }}
            >
              {category.name}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                width: '100%',
                px: { xs: 0, sm: 4 },
                justifyContent: 'flex-start',
              }}
            >
              {listings.map((listing) => (
                <Box
                 key={listing._id}
                  sx={{
                    width: isMobile ? '100%' : 'calc(25% - 24px)',
                    minWidth: { xs: '100%', sm: 250 },
                    flexShrink: 0,
                  }}
                >
                  <SwipeCard product={listing} />
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
