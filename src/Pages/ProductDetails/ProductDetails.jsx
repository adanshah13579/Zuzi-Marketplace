import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Paper, IconButton, Grid, Divider, Tooltip, 
  useMediaQuery, useTheme, Button, Chip, Stack, Container,
  InputAdornment, TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { sampleListings } from '../../data/data';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import {
  Favorite, FavoriteBorder, ArrowBackIos, ArrowForwardIos,
  Bed, Layers, SquareFoot, LocalParking, Info,
  Search, Tune, Home, Apartment, Villa, Store, FilterAlt
} from '@mui/icons-material';
import ProductCard from '../../Components/ProductDetails/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    propertyType: '',
    rooms: '',
    location: ''
  });

  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('he-IL').format(price);
  };
  
  // Get all products
  const allProducts = Object.values(sampleListings).flat();
  
  // Find current product
  const product = allProducts.find(item => item.id === parseInt(id));
  
  // Get current product index
  const currentIndex = allProducts.findIndex(item => item.id === parseInt(id));
  
  // Get next product
  const nextProduct = allProducts[(currentIndex + 1) % allProducts.length];
  
  // For demo purposes, we'll create multiple images from the same image
  const images = [
    product?.image,
    product?.image,
    product?.image,
    product?.image
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    setTimeout(() => {
      navigate(`/product/${nextProduct.id}`);
      setCurrentImageIndex(0);
      setIsFavorite(false);
    }, 500);
  };

  const handleSkip = () => {
    navigate(`/product/${nextProduct.id}`);
    setCurrentImageIndex(0);
    setIsFavorite(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h5">Product not found</Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  // Get similar products (excluding current product)
  const similarProducts = Object.values(sampleListings)
    .flat()
    .filter(item => item.id !== parseInt(id))
    .slice(0, 5);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Filter Section - Cloud-like Design */}
      <Paper elevation={0} sx={{ 
        backgroundColor: '#f5f7fa',
        borderRadius: 3,
        p: 3,
        mb: 4,
        mx: 'auto',
        width: '95%',
        maxWidth: '1200px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="חיפוש לפי מיקום..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                sx: { 
                  borderRadius: 3,
                  backgroundColor: 'white',
                  '& fieldset': { border: 'none' }
                }
              }}
            />
          </Grid>
          
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>סוג נכס</InputLabel>
              <Select
                value={filters.propertyType}
                onChange={handleFilterChange}
                name="propertyType"
                label="סוג נכס"
                sx={{ 
                  borderRadius: 3,
                  backgroundColor: 'white',
                  '& fieldset': { border: 'none' }
                }}
              >
                <MenuItem value=""><em>הכל</em></MenuItem>
                <MenuItem value="apartment">דירה</MenuItem>
                <MenuItem value="house">בית פרטי</MenuItem>
                <MenuItem value="villa">וילה</MenuItem>
                <MenuItem value="commercial">מסחרי</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>חדרים</InputLabel>
              <Select
                value={filters.rooms}
                onChange={handleFilterChange}
                name="rooms"
                label="חדרים"
                sx={{ 
                  borderRadius: 3,
                  backgroundColor: 'white',
                  '& fieldset': { border: 'none' }
                }}
              >
                <MenuItem value=""><em>הכל</em></MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4+">4+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={1} sx={{ height: '100%' }}>
              <Button 
                variant="contained" 
                startIcon={<Tune />}
                sx={{ 
                  borderRadius: 3,
                  px: 3,
                  flex: 1,
                  whiteSpace: 'nowrap'
                }}
              >
                פילטרים נוספים
              </Button>
              <Button 
                variant="outlined" 
                sx={{ 
                  borderRadius: 3,
                  px: 3,
                  borderColor: '#ddd',
                  backgroundColor: 'white'
                }}
              >
                איפוס
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ flex: 1, py: 3 }}>
        <Grid container spacing={4} direction="row-reverse">
          {/* Image Slider */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{
              position: 'relative',
              height: '500px',
              width: '100%',
              overflow: 'hidden',
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}>
              <Box
                component="img"
                src={images[currentImageIndex]}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease'
                }}
              />
              
              {/* Navigation Arrows */}
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  '&:hover': { backgroundColor: 'white' },
                  boxShadow: 1,
                  width: 48,
                  height: 48
                }}
              >
                <ArrowBackIos fontSize="small" />
              </IconButton>

              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  '&:hover': { backgroundColor: 'white' },
                  boxShadow: 1,
                  width: 48,
                  height: 48
                }}
              >
                <ArrowForwardIos fontSize="small" />
              </IconButton>

              {/* Image Dots */}
              <Box sx={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
              }}>
                {images.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: currentImageIndex === index ? 'primary.main' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: currentImageIndex === index ? 'primary.dark' : 'rgba(255,255,255,0.8)'
                      }
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              p: { xs: 2, md: 4 },
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box dir="rtl">
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    {product.name}
                  </Typography>
                  <Chip 
                    label={product.type === 'new' ? 'חדש' : 'יד שנייה'} 
                    color={product.type === 'new' ? 'success' : 'default'}
                    size="small"
                    sx={{ 
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />
                </Stack>

                <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 700 }}>
                  ₪{formatPrice(product.price)}
                </Typography>

                <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
                  {product.description}
                </Typography>

                {/* Property Details */}
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  mb: 4,
                  borderRadius: 3,
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #eee'
                }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Bed color="primary" sx={{ fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            חדרים
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {product.rooms || '3'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Layers color="primary" sx={{ fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            קומה
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {product.floor || '2'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SquareFoot color="primary" sx={{ fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            גודל
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {product.size || '120'} מ"ר
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalParking color="primary" sx={{ fontSize: 20 }} />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            חניה
                          </Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {product.parking ? 'כן' : 'לא'}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  <Box component="span" fontWeight={600}>מיקום:</Box> {product.location}
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  justifyContent: 'space-between',
                  mt: 'auto',
                  pt: 3,
                  flexDirection: isMobile ? 'column' : 'row'
                }}>
                  <Stack direction="row" spacing={2}>
                    <Tooltip title={isFavorite ? "הסר מהמועדפים" : "הוסף למועדפים"}>
                      <IconButton
                        onClick={handleFavorite}
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          width: 56,
                          height: 56,
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          },
                        }}
                      >
                        {isFavorite ? (
                          <Favorite color="error" sx={{ fontSize: 28 }} />
                        ) : (
                          <FavoriteBorder sx={{ fontSize: 28 }} />
                        )}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="דלג למוצר הבא">
                      <IconButton
                        onClick={handleSkip}
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          width: 56,
                          height: 56,
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          },
                        }}
                      >
                        <FilterAlt sx={{ fontSize: 28 }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  
                  <Button 
                    variant="contained" 
                    size="large" 
                    fullWidth={isMobile}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      height: 56,
                      fontSize: '1rem',
                      fontWeight: 600
                    }}
                  >
                    צור קשר עם המוכר
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Similar Products Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
            נכסים דומים באזור
          </Typography>
          <Grid container spacing={3}>
            {similarProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default ProductDetails;