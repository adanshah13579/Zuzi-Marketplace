import { useState } from 'react';
import { Box, Typography, Container, Paper, useMediaQuery, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import zuziLogo from '../assets/Zuzi.jpg'; // Make sure the path is correct
import colors from '../Style/colors'; // Make sure the path is correct

const AuthLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  return (
    <Container maxWidth={false} disableGutters sx={{ 
      height: '100vh',
      display: 'flex',
      backgroundColor: colors.background || '#fff',
      p: 0,
      m: 0,
      overflow: 'hidden',
    }}>
      <Grid container spacing={0} sx={{ 
        height: '100vh',
        width: '100%',
        m: 0,
      }}>
        {/* Left side with logo and presentation - Hidden on mobile */}
        {!isMobile && (
          <Grid 
            item 
            xs={12}
            sm={6}
            sx={{ 
              backgroundColor: "#fff" || '#f4c724',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isTablet ? 3 : 4,
              height: '100vh',
              width: '50%',
              overflow: 'auto',
            }}
          >
            <Box 
              component="img"
              src={zuziLogo}
              alt="Zuzi Logo"
              sx={{ 
                width: isTablet ? '140px' : '160px',
                height: 'auto',
                borderRadius: '10%',
                marginBottom: 3,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }}
            />
            <Typography 
              variant={isTablet ? "h4" : "h3"}
              component="h1" 
              sx={{ 
                color: colors.secondary || '#0f1620',
                fontWeight: 700,
                marginBottom: 2,
                textAlign: 'center',
                fontSize: isTablet ? '2rem' : '2.5rem',
              }}
            >
              התחבר דרך פריטים משותפים
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: colors.secondary || '#0f1620',
                textAlign: 'center',
                maxWidth: '80%',
                fontSize: isTablet ? '1rem' : '1.1rem',
                lineHeight: 1.6,
                mt: 2,
              }}
            >
              הצטרף לקהילה שלנו לשתף ולגלות פריטים משומשים.
              פלטפורמה שמחברת בין אנשים דרך חילופי משמעותיים.
            </Typography>
          </Grid>
        )}
        
        {/* Right side with form */}
        <Grid 
          item 
          xs={12}
          sm={6}
          sx={{ 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? 2 : isTablet ? 3 : 4,
            height: isMobile ? '100vh' : '100vh',
            width: isMobile ? '100%' : '50%',
            overflow: 'auto',
          }}
        >
          {isMobile && (
            <Box 
              component="img"
              src={zuziLogo}
              alt="Zuzi Logo"
              sx={{ 
                width: '100px',
                height: 'auto',
                borderRadius: '10%',
                marginBottom: 2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }}
            />
          )}
          <Paper 
            elevation={isMobile ? 0 : 3}
            sx={{ 
              width: '100%',
              maxWidth: isMobile ? '100%' : isTablet ? '400px' : '450px',
              padding: isMobile ? 2 : isTablet ? 3 : 4,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthLayout;