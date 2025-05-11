import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, IconButton, Grid, Divider, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { sampleListings } from '../../data/data';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BedIcon from '@mui/icons-material/Bed';
import FloorIcon from '@mui/icons-material/Layers';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import InfoIcon from '@mui/icons-material/Info';
import ProductCard from '../../Components/ProductDetails/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
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
    // After a short delay, move to next product
    setTimeout(() => {
      navigate(`/product/${nextProduct.id}`);
      setCurrentImageIndex(0);
      setIsFavorite(false);
    }, 500); // 500ms delay to show the favorite state change
  };

  const handleSkip = () => {
    // Navigate to next product
    navigate(`/product/${nextProduct.id}`);
    // Reset states for new product
    setCurrentImageIndex(0);
    setIsFavorite(false);
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
    .slice(0, 5); // Show 5 similar products

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <Box sx={{ flex: 1, p: 3, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Grid container spacing={4}  direction="row-reverse">
          {/* Image Slider */}
         <Grid item xs={12} md={6}>
  <Paper
  elevation={3}
  sx={{
    position: 'relative',
    height: '400px',  // Fixed height for the slider
    width: '100%',    // Full width of its container
    overflow: 'hidden',
    borderRadius: 2,
  }}
>
  <Box
    component="img"
    src={images[currentImageIndex]}
    alt={product.name}
    sx={{
      width: '100%',
      height: '100%',
      objectFit: 'cover', 
    }}
  />
  
  {/* Navigation Arrows */}
  <IconButton
    onClick={handlePrevImage}
    sx={{
      position: 'absolute',
      left: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      },
    }}
  >
    <ArrowBackIosNewIcon />
  </IconButton>

  <IconButton
    onClick={handleNextImage}
    sx={{
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      },
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>

  {/* Image Dots */}
  <Box
    sx={{
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 1,
    }}
  >
    {images.map((_, index) => (
      <Box
        key={index}
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: currentImageIndex === index ? 'primary.main' : 'white',
          cursor: 'pointer',
        }}
        onClick={() => setCurrentImageIndex(index)}
      />
    ))}
  </Box>
</Paper>

</Grid>


          {/* Product Details */}
          <Grid item xs={12} md={7}>
            <Box 
              sx={{ 
                p: 3,
                borderRight: '1px solid',
                borderColor: 'divider',
                height: '100%'
              }}
            >
              <Box sx={{ p: 2 }} dir="rtl">
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>

                <Typography variant="h5" color="primary" sx={{ mb: 3 }}>
                  ₪{formatPrice(product.price)}
                </Typography>

                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>

                {/* Property Details */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 1, 
                  mb: 4,
                  flexWrap: 'wrap',
                  '& > *': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }
                }}>
                  <Box>
                    <InfoIcon color="action" sx={{ fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      פרטי הנכס
                    </Typography>
                  </Box>
                  <Box>
                    <BedIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {product.rooms || '3'} חדרים
                    </Typography>
                  </Box>
                  <Box>
                    <FloorIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      קומה {product.floor || '2'}
                    </Typography>
                  </Box>
                  <Box>
                    <SquareFootIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {product.size || '120'} מ"ר
                    </Typography>
                  </Box>
                  <Box>
                    <LocalParkingIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {product.parking ? 'חניה' : 'ללא חניה'}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  מיקום: {product.location}
                </Typography>

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'center',
                    mt: 4,
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                   
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 3,
                      justifyContent: 'center',
                      width: isMobile ? '100%' : 'auto',
                    }}
                  >
                    <Tooltip title={isFavorite ? "הסר מהמועדפים" : "הוסף למועדפים"}>
                      <IconButton
                        onClick={handleFavorite}
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          width: isMobile ? '64px' : 56,
                          height: isMobile ? '64px' : 56,
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          },
                        }}
                      >
                        {isFavorite ? (
                          <FavoriteIcon sx={{ color: 'primary.main', fontSize: isMobile ? 40 : 36 }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ fontSize: isMobile ? 40 : 36 }} />
                        )}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="דלג למוצר הבא">
                      <IconButton
                        onClick={handleSkip}
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          width: isMobile ? '64px' : 56,
                          height: isMobile ? '64px' : 56,
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                          },
                        }}
                      >
                        <ArrowCircleLeftIcon sx={{ fontSize: isMobile ? 40 : 36 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default ProductDetails; 