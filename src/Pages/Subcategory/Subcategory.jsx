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
  MenuItem,
  Select,
  TextField,
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
        direction: 'ltr',
        fontFamily: '"Arial", sans-serif',
      }}
    >
      <Navbar />

      {/* Main layout: Cards Left, Filters Right */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          p: { xs: 2, sm: 3, md: 4 },
          gap: 3,
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          backgroundColor: '#f8f9fa',
        }}
      >
        {/* Filters Right */}
        <Box
          sx={{
            width: { xs: '100%', md: '300px' },
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            p: 3,
            borderRadius: 2,
            height: 'fit-content',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
            סינון
          </Typography>

          {/* Title Search */}
          <TextField
            label="כותרת"
            fullWidth
            size="small"
            placeholder="חפש לפי כותרת..."
            sx={{ mb: 2 }}
            inputProps={{ style: { direction: 'rtl' } }}
          />

          {/* Price Range */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="מינ'"
              type="number"
              size="small"
              fullWidth
              inputProps={{ style: { direction: 'rtl' } }}
            />
            <TextField
              label="מקס'"
              type="number"
              size="small"
              fullWidth
              inputProps={{ style: { direction: 'rtl' } }}
            />
          </Box>

          {/* Price Sort */}
          <Select
            fullWidth
            size="small"
            defaultValue=""
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">מיין לפי מחיר</MenuItem>
            <MenuItem value="low">מהנמוך לגבוה</MenuItem>
            <MenuItem value="high">מהגבוה לנמוך</MenuItem>
          </Select>

          {/* Rooms Filter */}
          <Select
            fullWidth
            size="small"
            defaultValue=""
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">מס' חדרים</MenuItem>
            <MenuItem value="1">1 חדר</MenuItem>
            <MenuItem value="2">2 חדרים</MenuItem>
            <MenuItem value="3">3 חדרים</MenuItem>
            <MenuItem value="4+">4+ חדרים</MenuItem>
          </Select>

          {/* Location Filter */}
          <TextField
            label="מיקום"
            fullWidth
            size="small"
            placeholder="הכנס מיקום..."
            inputProps={{ style: { direction: 'rtl' } }}
            sx={{ mb: 2 }}
          />

          {/* Filter Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" color="primary" sx={{ flex: 1 }}>
              חיפוש
            </Button>
            <Button variant="outlined" color="secondary" sx={{ flex: 1 }}>
              איפוס
            </Button>
          </Box>
        </Box>

        {/* Cards Left */}
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 2.5,
            direction: 'rtl',
          }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                height: '320px',
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
                    height: '240px',
                    objectFit: 'cover',
                  }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent
                  sx={{
                    p: 1.5,
                    height: '100px',
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
                      color: '#000',
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
                      color: '#000',
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
