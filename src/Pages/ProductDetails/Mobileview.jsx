import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
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
  
  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('he-IL').format(price);
  };
  
  // Find current product index
  useEffect(() => {
    if (products && products.length > 0) {
      const index = products.findIndex(item => item.id === parseInt(currentProductId));
      setCurrentIndex(index);
      
      // Set cards to display - current and next 2 products
      const startIdx = index;
      let cards = [];
      for (let i = 0; i < 3; i++) {
        const idx = (startIdx + i) % products.length;
        cards.push(products[idx]);
      }
      setDisplayProducts(cards);
    }
  }, [products, currentProductId]);

  const swiped = (direction, productId) => {
    setLastDirection(direction);
    
    if (direction === 'right') {
      // Liked/favorited
      setFeedbackType('like');
      setShowFeedback(true);
    } else if (direction === 'left') {
      // Skipped
      setFeedbackType('skip');
      setShowFeedback(true);
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      // Find next product
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
    <Box sx={{ position: 'relative', height: "90vh", overflow: 'hidden', width: '100%',py:10 }}>
      {/* Swipe feedback overlay */}
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
              width: 100,
              height: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {feedbackType === 'like' ? (
              <FavoriteIcon sx={{ fontSize: 60, color: '#f4c724' }} />
            ) : (
              <CloseIcon sx={{ fontSize: 60, color: 'red' }} />
            )}
          </Box>
        </Box>
      </Fade>

      {/* Cards container */}
      <Box sx={{ width: '100%', maxWidth: '360px',  margin: '1px auto' }}>
        {displayProducts.map((product, index) => (
          <TinderCard
            className="swipe"
            key={product.id}
            onSwipe={(dir) => swiped(dir, product.id)}
            onCardLeftScreen={() => outOfFrame(product.id)}
            preventSwipe={['up', 'down']}
          >
            <Paper
              elevation={4}
              sx={{
                position: 'absolute',
                width: '100%',
                height: '55vh',
                borderRadius: 3,
                overflow: 'hidden',
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 50%), url(${product.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Property Details - Simplified and overlayed */}
              <Box 
                sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  p: 3, 
                  color: 'white',
                  direction: 'rtl',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  ₪{formatPrice(product.price)}
                </Typography>
                
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
                
                <Typography variant="body1" sx={{ opacity: 0.9, maxHeight: '80px', overflow: 'hidden' }}>
                  {product.description && product.description.length > 120 
                    ? `${product.description.substring(0, 120)}...` 
                    : product.description}
                </Typography>
              </Box>
            </Paper>
          </TinderCard>
        ))}
      </Box>
      
      {/* Tinder-style action buttons */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-evenly',
          px: 4,
        }}
      >
        <Button
          onClick={() => swipe('left')}
          variant="contained"
          startIcon={<CloseIcon sx={{color:"red"}}/>}
          sx={{
            backgroundColor: 'white',
            color: '#000',
            borderRadius: 3,
            padding: '10px 24px',
            fontWeight: 'bold',
            boxShadow: 3,
            border: '1px solid #000',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#ffebee',
              border: '1px solid red',
            },
          }}
        >
          החלק שמאלה
        </Button>
        
        <Button
          onClick={() => swipe('right')}
          variant="contained"
          startIcon={<FavoriteIcon sx={{color:"#f4c724"}} />}
          sx={{
            backgroundColor: 'white',
            color: '#000',
            borderRadius: 3,
            padding: '10px 24px',
            fontWeight: 'bold',
            boxShadow: 3,
            border: '1px solid  #000',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#FFFFC5',
              border: '1px solid ',
            },
          }}
        >
         החלק ימינה
        </Button>
      </Box>
    </Box>
  );
};

export default MobileProductView;