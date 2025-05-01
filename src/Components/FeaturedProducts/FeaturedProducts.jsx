import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { featuredProducts } from '../../data/data';

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 6, px: 3, bgcolor: 'background.paper' }}>
      <Typography variant="h4" align="center" gutterBottom>
        מוצרים מומלצים
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {featuredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={product.rating} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    ({product.reviews})
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary">
                  ₪{product.price}
                </Typography>
              </CardContent>
              <Button 
                variant="contained" 
                color="primary"
                sx={{ mb: 2, mx: 2 }}
              >
                הוסף לסל
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedProducts; 