import { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Divider, 
  Link,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import colors from '../../Style/colors';
import CustomInput from './CustomInput';

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login with:', formData);
    
    // For now, we'll simulate a successful login
    // In a real app, you would check credentials here
    if (formData.email && formData.password) {
      navigate('/');
    } else {
      setError('אנא הכנס אימייל וסיסמה');
    }
  };
  
  const handleGoogleLogin = () => {
    // Add Google login integration
    console.log('Login with Google');
  };
  
  const handleFacebookLogin = () => {
    // Add Facebook login integration
    console.log('Login with Facebook');
  };
  
  return (
    <Box 
      component="form" 
      onSubmit={handleLogin} 
      noValidate 
      sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 0.75 : isLaptop ? 1 : 1.25,
        maxHeight: '100%',
        overflow: 'auto',
        direction: 'rtl',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      <Typography 
        variant={isMobile ? "h5" : isTablet ? "h4" : "h4"}
        component="h1" 
        sx={{ 
          fontWeight: 600, 
          textAlign: 'center',
          color: colors.secondary || '#0f1620',
          fontSize: isMobile ? '1.25rem' : isLaptop ? '1.5rem' : '1.75rem',
        }}
      >
        ברוך שובך
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          textAlign: 'center', 
          color: colors.tertiary || '#5d6d7c',
          fontSize: isMobile ? '0.8rem' : isLaptop ? '0.9rem' : '1rem',
          mb: isMobile ? 0.5 : 1,
        }}
      >
        התחבר כדי להמשיך לחשבון שלך
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {error}
        </Alert>
      )}
      
      <CustomInput
        name="email"
        label="כתובת אימייל"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <CustomInput
        name="password"
        label="סיסמה"
        value={formData.password}
        onChange={handleChange}
        required
        showPasswordToggle
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 0.5 }}>
        <Link component={RouterLink} to="/auth/forgot-password" variant="body2" sx={{ color: colors.primary, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
          שכחת סיסמה?
        </Link>
      </Box>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          py: isMobile ? 0.75 : isLaptop ? 0.875 : 1,
          backgroundColor: colors.primary || '#f4c724',
          color: colors.secondary || '#0f1620',
          fontWeight: 600,
          fontSize: isMobile ? '0.8rem' : isLaptop ? '0.85rem' : '0.9rem',
          '&:hover': {
            backgroundColor: colors.primaryDark || '#deb01f',
          }
        }}
      >
        התחברות
      </Button>
      
      <Divider sx={{ my: 0.75 }}>או</Divider>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon sx={{ ml: 1 }} />}
          onClick={handleGoogleLogin}
          sx={{
            py: isMobile ? 0.75 : isLaptop ? 0.875 : 1,
            borderColor: '#ddd',
            color: colors.tertiary || '#5d6d7c',
            fontSize: isMobile ? '0.8rem' : isLaptop ? '0.85rem' : '0.9rem',
            '&:hover': {
              borderColor: '#bbb',
              backgroundColor: 'rgba(0,0,0,0.04)'
            },
            '& .MuiButton-startIcon': {
              marginRight: 0,
              marginLeft: '4px'
            }
          }}
        >
          גוגל
        </Button>
        
        <Button
          variant="outlined"
          fullWidth
          startIcon={<FacebookIcon sx={{ ml: 1 }} />}
          onClick={handleFacebookLogin}
          sx={{
            py: isMobile ? 0.75 : isLaptop ? 0.875 : 1,
            borderColor: '#ddd',
            color: colors.tertiary || '#5d6d7c',
            fontSize: isMobile ? '0.8rem' : isLaptop ? '0.85rem' : '0.9rem',
            '&:hover': {
              borderColor: '#bbb',
              backgroundColor: 'rgba(0,0,0,0.04)'
            },
            '& .MuiButton-startIcon': {
              marginRight: 0,
              marginLeft: '4px'
            }
          }}
        >
          פייסבוק
        </Button>
      </Box>
      
      <Typography 
        variant="body2" 
        align="center" 
        sx={{ 
          color: colors.tertiary || '#5d6d7c',
          fontSize: isMobile ? '0.75rem' : isLaptop ? '0.8rem' : '0.875rem',
          mt: 0.5,
        }}
      >
        אין לך חשבון?{' '}
        <Link component={RouterLink} to="/auth/signup" sx={{ color: colors.primary, fontWeight: 600 }}>
          הרשמה
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;