import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from '@mui/material';

const ItemsGrid = ({ items, onItemClick }) => {
  return (
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
            onClick={() => onItemClick(item.id)}
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
  );
};

export default ItemsGrid; 