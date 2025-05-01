import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { sampleListings } from '../../data/data';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Subcategory = () => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you would fetch items based on categoryId and subcategoryId
  // For now, we'll use sample data
  const items = sampleListings[categoryId] || [];

  const handleItemClick = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <Box sx={{ 
        flex: 1, 
        p: { xs: 2, sm: 3, md: 4 }, 
        maxWidth: '1400px', 
        margin: '0 auto', 
        width: '100%',
        backgroundColor: '#f8f9fa'
      }}>
        
        
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {items.map((item) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4}
              lg={3}
              key={item.id}
              sx={{
                display: 'flex',
              }}
            >
              <Card 
                sx={{ 
                  width: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => handleItemClick(item.id)}
                  sx={{ height: '100%' }}
                >
                  <CardMedia
                    component="img"
                    sx={{ 
                      aspectRatio: '32/9',
                      objectFit: 'cover',
                    }}
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent 
                    sx={{ 
                      p: 1,
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: '#222',
                        flex: 1
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: '0.75rem',
                        fontWeight: 600,

                        color: '#222',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      ${item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Subcategory;