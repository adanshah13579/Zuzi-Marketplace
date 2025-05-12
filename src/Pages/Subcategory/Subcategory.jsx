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
  Collapse,
  IconButton,
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  ExpandLess as ExpandLessIcon 
} from '@mui/icons-material';
import { sampleListings } from '../../data/data';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Subcategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const items = sampleListings[categoryId] || [];

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    location: '',
    propertyType: '',
    roomCount: '',
  });

  const [openSections, setOpenSections] = useState({
    mainCategory: true,
    price: true,
    realEstate: true,
    additional: true
  });

  const [appliedFilters, setAppliedFilters] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const applyFilters = () => {
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value !== '')
      .map(([key, value]) => `${key}: ${value}`);
    
    setAppliedFilters(activeFilters);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      location: '',
      propertyType: '',
      roomCount: '',
    });
    setAppliedFilters([]);
  };

  const removeFilter = (filterToRemove) => {
    const updatedAppliedFilters = appliedFilters.filter(f => f !== filterToRemove);
    setAppliedFilters(updatedAppliedFilters);
    
    const filterKey = filterToRemove.split(':')[0].trim();
    setFilters(prev => ({
      ...prev,
      [filterKey]: ''
    }));
  };

  const handleItemClick = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  const FilterSection = ({ title, section, children }) => (
    <Box sx={{ mb: 2 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          cursor: 'pointer',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          pb: 1
        }}
        onClick={() => toggleSection(section)}
      >
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 600, 
            color: 'black',
            textAlign: 'right'
          }}
        >
          {title}
        </Typography>
        {openSections[section] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Box>
      <Collapse in={openSections[section]}>
        <Box sx={{ mt: 1 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        direction: 'rtl',
        fontFamily: '"Arial", sans-serif',
      }}
    >
      <Navbar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          p: { xs: 2, sm: 3, md: 4 },
          gap: { xs: 2, sm: 3, md: 4 },
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        {/* Filter Section */}
        <Box
          sx={{
            width: { xs: '100%', sm: '30%', md: '25%',lg:"23%" },
            backgroundColor: '#FFD700',
            p: 2,
            borderRadius: 2,
            height: 'auto',
            direction: 'rtl',
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              my: 2, 
              textAlign: 'center', 
              color: 'black' 
            }}
          >
            סינון ומיון מוצרים
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <FilterSection title="קטגוריה ראשית" section="mainCategory">
              <input
                type="text"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                placeholder="בחר קטגוריה"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'white',
                  direction: 'rtl',
                }}
              />
            </FilterSection>

            <FilterSection title="מחיר" section="price">
              <Box sx={{ display: 'flex', gap: 1 }}>
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="מחיר מינ'"
                  style={{
                    width: '50%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'white',
                    direction: 'rtl',
                  }}
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="מחיר מקס'"
                  style={{
                    width: '50%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'white',
                    direction: 'rtl',
                  }}
                />
              </Box>
            </FilterSection>

            <FilterSection title="נדל״ן" section="realEstate">
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <input
                  type="text"
                  name="propertyType"
                  value={filters.propertyType}
                  onChange={handleFilterChange}
                  placeholder="סוג נכס"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'white',
                    direction: 'rtl',
                  }}
                />
                <input
                  type="number"
                  name="roomCount"
                  value={filters.roomCount}
                  onChange={handleFilterChange}
                  placeholder="מספר חדרים"
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'white',
                    direction: 'rtl',
                  }}
                />
              </Box>
            </FilterSection>

            <FilterSection title="פרטים נוספים" section="additional">
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="מיקום"
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'white',
                  direction: 'rtl',
                }}
              />
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="חיפוש כללי"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'white',
                  direction: 'rtl',
                }}
              />
            </FilterSection>

            <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button 
                variant="contained" 
                onClick={applyFilters}
                sx={{ 
                  width: "100%", 
                  mb: 1, 
                  backgroundColor: 'black', 
                  color: 'white',
                  height: '48px',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' }
                }}
              >
                החל סינון
              </Button>
              <Button 
                variant="outlined" 
                onClick={resetFilters}
                sx={{ 
                  width: "100%", 
                  borderColor: 'black', 
                  color: 'black',
                  height: '48px',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' }
                }}
              >
                נקה הכל
              </Button>
            </Box>

            {appliedFilters.length > 0 && (
              <Box mt={2}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1, 
                    color: 'black',
                    textAlign: 'right'
                  }}
                >
                  מסננים שנבחרו
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {appliedFilters.map((filter) => (
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
            )}
          </Box>
        </Box>

        {/* Items Grid */}
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(auto-fill, minmax(220px, 1fr))' 
            },
            gap: { xs: 2, sm: 2.5 },
            direction: 'rtl',
          }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', sm: 'column' },
                height: { 
                  xs: '200px', 
                  sm: '320px' 
                },
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
                  display: 'flex',
                  flexDirection: { xs: 'row', sm: 'column' },
                  width: '100%',
                  height: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: '40%', sm: '100%' },
                    height: { xs: '200px', sm: '240px' },
                    objectFit: 'cover',
                  }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent
                  sx={{
                    flex: 1,
                    p: 1.5,
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