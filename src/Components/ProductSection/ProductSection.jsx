import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import SwipeContainer from '../SwipeCards/SwipeContainer';
import colors from '../../Style/colors';

const ProductSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      py: 6, 
      px: 3,
      direction: 'rtl'
    }}>
      <Typography 
        variant="h4" 
        align="right" 
        sx={{ 
          color: colors.secondary,
          fontWeight: 700,
          mb: 6
        }}
      >
        גלה פריטים
      </Typography>
      
      <SwipeContainer />
    </Box>
  );
};

export default ProductSection; 