import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
} from '@mui/material';
import { sampleListings } from '../../data/data';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Subcategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const items = sampleListings[categoryId] || [];

  const handleItemClick = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        direction: 'rtl', // RTL layout
        fontFamily: '"Arial", sans-serif',
      }}
    >
      <Navbar />

      {/* סרגל סינון */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
          p: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: '#333',
          }}
        >
          סינון
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
              כותרת
            </Typography>
            <input
              type="text"
              placeholder="חפש לפי כותרת..."
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                direction: 'rtl',
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 150 }}>
            <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
              מחיר
            </Typography>
            <select
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                direction: 'rtl',
              }}
            >
              <option value="">הכל</option>
              <option value="low">מהנמוך לגבוה</option>
              <option value="high">מהגבוה לנמוך</option>
            </select>
          </Box>

          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
              מיקום
            </Typography>
            <input
              type="text"
              placeholder="הכנס מיקום..."
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                direction: 'rtl',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', borderRadius: '8px' }}
            >
              חיפוש
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ textTransform: 'none', borderRadius: '8px' }}
            >
              איפוס
            </Button>
          </Box>
        </Box>
      </Box>

      {/* רשימת פריטים - Smart Pinterest-Style Grid */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 2.5,
            direction: 'rtl',
          }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                height: '320px', // Fixed card height
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                },
              }}
            >
              <CardActionArea 
                onClick={() => handleItemClick(item.id)}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: '240px', // Fixed image height
                    objectFit: 'cover',
                  }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent
                  sx={{
                    p: 1.5,
                    height: '100px', // Fixed content height
                    backgroundColor: '#fff',
                    direction: 'rtl',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: '#000', // Black text as requested
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                  
                      color: '#000', // Black text as requested
                      mt: 0.5,
                    }}
                  >
                    ₪{item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Subcategory;