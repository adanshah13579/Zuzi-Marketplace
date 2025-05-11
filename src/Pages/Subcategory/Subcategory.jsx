import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
  Chip,
} from '@mui/material';
import { sampleListings } from '../../data/data';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Subcategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const items = sampleListings[categoryId] || [];

  const [filters, setFilters] = useState([]);

  const staticFilters = ['השכרה', 'ריהוט', 'חיות מחמד', 'רכב'];

  const addFilter = (filter) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  const removeFilter = (filterToRemove) => {
    setFilters(filters.filter(f => f !== filterToRemove));
  };

  const resetFilters = () => {
    setFilters([]);
  };

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

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: "row-reverse" },
          p: { xs: 2, sm: 3, md: 4 },
          gap: 3,
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '22%' },
            backgroundColor: '#ffffff',
            p: 2,
            borderRadius: 2,
            height: '100vh',
            direction: 'rtl',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333', textAlign: 'right' }}>
            סינון
          </Typography>

          {/* Title Search */}
          <label style={{ display: 'block', marginBottom: '4px' }}>כותרת</label>
          <input
            type="text"
            placeholder="חפש לפי כותרת..."
            style={{ width: '70%', marginBottom: '16px', padding: '8px', direction: 'rtl' }}
          />

          {/* Price Range */}
          <label style={{ display: 'block', marginBottom: '4px' }}>מחיר</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="number"
              placeholder="מינ'"
              style={{ width: "35%", padding: '8px', direction: 'rtl' }}
            />
            <input
              type="number"
              placeholder="מקס'"
              style={{ width: "35%", padding: '8px', direction: 'rtl' }}
            />
          </div>

          {/* Number of Rooms */}
          <label style={{ display: 'block', marginBottom: '4px' }}>מס' חדרים</label>
          <input
            type="text"
            placeholder="הכנס מספר חדרים"
            style={{ width: '70%', marginBottom: '16px', padding: '8px', direction: 'rtl' }}
          />

          {/* Location */}
          <label style={{ display: 'block', marginBottom: '4px' }}>מיקום</label>
          <input
            type="text"
            placeholder="הכנס מיקום..."
            style={{ width: '70%', marginBottom: '16px', padding: '8px', direction: 'rtl' }}
          />

          {/* Static Filters */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
            קטגוריות
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 2, flexWrap: "wrap" }}>
            {staticFilters.map((label) => (
              <Button
                key={label}
                variant="outlined"
                onClick={() => addFilter(label)}
                sx={{
                  textAlign: 'right',
                  alignSelf: 'flex-start',
                  paddingX: 2,
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button variant="contained" color="primary" sx={{ width: "40%" }}>
              חיפוש
            </Button>
            <Button variant="outlined" color="secondary" sx={{ width: "40%" }} onClick={resetFilters}>
              איפוס
            </Button>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#333' }}>
              פילטרים שנבחרו
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {filters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  onDelete={() => removeFilter(filter)}
                  variant="outlined"
                  color="primary"
                  sx={{ direction: 'rtl' }}
                />
              ))}
            </Box>
          </Box>
        </Box>

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
