import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Fade
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';

const MobileProductView = ({ products, currentProductId }) => {
  const navigate = useNavigate();
  const [lastDirection, setLastDirection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('he-IL').format(price);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      const index = products.findIndex(item => item.id === parseInt(currentProductId));
      setCurrentIndex(index);
      setDisplayProducts([products[index]]);
    }
  }, [products, currentProductId]);

  const swiped = (direction, productId) => {
    setLastDirection(direction);

    if (direction === 'right') {
      setFeedbackType('like');
      setShowFeedback(true);
    } else if (direction === 'left') {
      setFeedbackType('skip');
      setShowFeedback(true);
    }

    setTimeout(() => {
      setShowFeedback(false);
      const currentIdx = products.findIndex(item => item.id === productId);
      const nextProduct = products[(currentIdx + 1) % products.length];
      navigate(`/product/${nextProduct.id}`);
    }, 1000);
  };

  const outOfFrame = (productId) => {
    console.log(`${productId} left the screen`);
  };

  const swipe = (dir) => {
    if (currentIndex !== null && displayProducts.length > 0) {
      const currentCards = document.querySelectorAll('.swipe');
      const card = currentCards[0];
      if (card) {
        const moveOutWidth = document.body.clientWidth * 1.5;
        const x = dir === 'right' ? moveOutWidth : -moveOutWidth;
        card.style.transform = `translate(${x}px)`;
        card.style.transition = 'transform 0.5s';
        swiped(dir, displayProducts[0].id);
      }
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:' rgba(216, 218, 56, 0.2)',
        overflow: 'hidden',
        px: 2,
      }}
    >
      {/* Feedback overlay */}
      <Fade in={showFeedback}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: feedbackType === 'like' ? 'rgba(216, 218, 56, 0.2)' : 'rgba(255, 0, 0, 0.2)',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '50%',
              width: 120,
              height: 120,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 6px 12px rgba(0,0,0,0.2)',
            }}
          >
            {feedbackType === 'like' ? (
              <FavoriteIcon sx={{ fontSize: 75, color: '#f4c724' }} />
            ) : (
              <CloseIcon sx={{ fontSize: 75, color: 'red' }} />
            )}
          </Box>
        </Box>
      </Fade>

      {/* Card container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '95%', sm: '400px' },
          height: { xs: '92vh', sm: '92vh' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt:40
        }}
      >
        <Box sx={{ width: '100%', height: "100vh", position: 'relative' }}>
          {displayProducts.map((product) => (
            <Box key={product.id} sx={{ width: '100%', height: '100%', position: 'absolute' }}>
              <TinderCard
                className="swipe"
                onSwipe={(dir) => swiped(dir, product.id)}
                onCardLeftScreen={() => outOfFrame(product.id)}
                preventSwipe={['up', 'down']}
              >
                <Paper
                  elevation={12}
                  sx={{
                    width: '100%',
                    height: '70vh',
                    borderRadius: 4,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  }}
                >
                  {/* Image section */}
                  <Box
                    sx={{
                      flex: 1,
                      backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 60%), url(${product.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        color: 'white',
                        direction: 'rtl',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.9)',
                      }}
                    >
                      <Typography variant="h3" fontWeight="bold" gutterBottom>
                        ₪{formatPrice(product.price)}
                      </Typography>
                      <Typography variant="h5" fontWeight="medium" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          opacity: 0.95,
                          maxHeight: '80px',
                          overflow: 'hidden',
                          fontSize: '1rem',
                          mb: 2,
                        }}
                      >
                        {product.description && product.description.length > 120
                          ? `${product.description.substring(0, 120)}...`
                          : product.description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Button section */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      py: 2,
                      borderTop: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <IconButton
                      onClick={() => swipe('left')}
                      sx={{
                        backgroundColor: 'white',
                        width: 65,
                        height: 65,
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                        border: '1px solid #ff1744',
                        '&:hover': {
                          backgroundColor: '#ffebee',
                          transform: 'scale(1.05)',
                          transition: 'transform 0.2s ease',
                        },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 35, color: '#ff1744' }} />
                    </IconButton>

                    <IconButton
                      onClick={() => swipe('right')}
                      sx={{
                        backgroundColor: 'white',
                        width: 65,
                        height: 65,
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                        border: '1px solid #f4c724',
                        '&:hover': {
                          backgroundColor: '#FFFFC5',
                          transform: 'scale(1.05)',
                          transition: 'transform 0.2s ease',
                        },
                      }}
                    >
                      <FavoriteIcon sx={{ fontSize: 35, color: '#f4c724' }} />
                    </IconButton>
                  </Box>
                </Paper>
              </TinderCard>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MobileProductView;
