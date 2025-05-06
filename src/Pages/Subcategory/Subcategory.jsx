import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
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

      {/* רשימת פריטים */}
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
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card
                sx={{
                  width: '100%',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                  },
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
    flexDirection: 'column', // stack title and description vertically
    alignItems: 'flex-start',
    direction: 'rtl', // if needed
    gap: 0.5,
    '@media (min-width:600px)': {
      flexDirection: 'row', // side-by-side on larger screens
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      fontSize: '0.9rem',
      color: '#222',
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}
  >
    {item.name}
  </Typography>
  <Typography
    variant="body2"
    sx={{
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#222',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }}
  >
    ₪{item.description}
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
