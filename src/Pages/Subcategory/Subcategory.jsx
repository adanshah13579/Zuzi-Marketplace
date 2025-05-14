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
  Accordion,
  AccordionSummary,
  AccordionDetails,
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



  const [appliedFilters, setAppliedFilters] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
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

  

  const handleItemClick = (itemId) => {
    navigate(`/product/${itemId}`);
  };
  const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #36454F',
  backgroundColor: 'white',
  direction: 'rtl',
};

 


const toggleFilterTile = (field, value) => {
  setFilters((prev) => ({
    ...prev,
    [field]: prev[field] === value ? '' : value,
  }));
};
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
    width: { xs: '100%', sm: '30%', md: '20%', lg: 280 },
    backgroundColor: '#fff',
    p: 2,
    border: "1px solid #36454F",
    borderRadius: 2,
    direction: 'rtl',
    mt:{xs:5,sm:0},
 
  }}
>

  <Typography variant="h6" sx={{ fontWeight: 700, my: 2, textAlign: 'center', color: 'black' }}>
    נדל״ן
  </Typography>

  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
    <input
      type="number"
      name="minPrice"
      placeholder="מחיר מינימלי"
      value={filters.minPrice}
      onChange={handleFilterChange}
      style={{ ...inputStyle, width: '50%' }}
    />
    <input
      type="number"
      name="maxPrice"
      placeholder="מחיר מקסימלי"
      value={filters.maxPrice}
      onChange={handleFilterChange}
      style={{ ...inputStyle, width: '50%' }}
    />
  </Box>

  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>עיר / רחוב / מילות מפתח</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleFilterChange}
        placeholder="חפש..."
        style={inputStyle}
      />
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>סוג עסקה</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {['מכירה', 'השכרה'].map((type) => (
          <Chip
            key={type}
            label={type}
            clickable
            onClick={() => toggleFilterTile('transactionType', type)}
            color={filters.transactionType === type ? 'primary' : 'default'}
            variant={filters.transactionType === type ? 'filled' : 'outlined'}
          />
        ))}
      </Box>
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>סוג נכס</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {['דירה', 'בית פרטי', 'מגרש', 'מסחרי'].map((type) => (
          <Chip
            key={type}
            label={type}
            clickable
            onClick={() => toggleFilterTile('propertyType', type)}
            color={filters.propertyType === type ? 'primary' : 'default'}
            variant={filters.propertyType === type ? 'filled' : 'outlined'}
          />
        ))}
      </Box>
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>מספר חדרים</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <input
        type="number"
        name="roomCount"
        value={filters.roomCount}
        onChange={handleFilterChange}
        placeholder="לדוג׳ 3"
        style={inputStyle}
      />
    </AccordionDetails>
  </Accordion>

  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      gap: 1,
      mt: 3,
      flexDirection: 'row-reverse',
    }}
  >
    <Button
      variant="contained"
      onClick={applyFilters}
      sx={{ backgroundColor: 'black', color: 'white', flex: 1,borderRadius:2 }}
    >
      התחלת חיפוש
    </Button>
    <Button
      variant="outlined"
      onClick={resetFilters}
      sx={{ borderColor: 'black', color: 'black', flex: 1,borderRadius:2
       }}
    >
      נקה הכל
    </Button>
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