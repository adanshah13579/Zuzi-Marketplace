import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/data';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 6, px: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        קטגוריות פופולריות
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
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
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={category.image}
                alt={category.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </CardContent>
              <Button 
                size="small" 
                color="primary"
                sx={{ mb: 2, mx: 2 }}
              >
                צפה בקטגוריה
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories; 