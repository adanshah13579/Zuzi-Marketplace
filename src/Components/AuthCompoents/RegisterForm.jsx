import { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Divider, 
  Link,
  Alert,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link as RouterLink } from 'react-router-dom';
import colors from '../../Style/colors';
import CustomInput from './CustomInput';

const SignUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }
    if (!acceptTerms) {
      setError('עליך לאשר את תנאי השימוש');
      return;
    }
    console.log('Sign up with:', formData);
  };
  
  const handleGoogleSignUp = () => {
    console.log('Sign up with Google');
  };
  
  const handleFacebookSignUp = () => {
    console.log('Sign up with Facebook');
  };
  
  return (
    <Box 
      component="form" 
      onSubmit={handleSignUp} 
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
        צור חשבון
      </Typography>
      
      <Typography 
        variant="body1" 
        sx={{ 
          textAlign: 'center', 
          color: colors.tertiary || '#5d6d7c',
          fontSize: isMobile ? '0.8rem' : isLaptop ? '0.9rem' : '1rem',
          mb: isMobile ? 0.5 : isLaptop ? 0.75 : 1,
        }}
      >
        הצטרף לקהילה שלנו לקנייה ומכירה
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 0.75 }}>
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
      
      <CustomInput
        name="confirmPassword"
        label="אימות סיסמה"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        showPasswordToggle
      />
      
      <FormControlLabel
        control={
          <Checkbox 
            checked={acceptTerms} 
            onChange={(e) => setAcceptTerms(e.target.checked)}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              color: colors.primary,
              '&.Mui-checked': {
                color: colors.primary,
              }
            }}
          />
        }
        label={
          <Typography variant="body2" sx={{ fontSize: isMobile ? '0.75rem' : isLaptop ? '0.8rem' : '0.875rem' }}>
            אני מסכים ל
            <Link component={RouterLink} to="/auth/terms" sx={{ color: colors.primary }}>
              {' '}תנאי השימוש{' '}
            </Link>
            ו
            <Link component={RouterLink} to="/auth/privacy" sx={{ color: colors.primary }}>
              {' '}מדיניות הפרטיות
            </Link>
          </Typography>
        }
        sx={{ mb: 0.25 }}
      />
      
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
        הרשמה
      </Button>
      
      <Divider sx={{ my: 0.75 }}>או</Divider>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon sx={{ ml: 1 }} />}
          onClick={handleGoogleSignUp}
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
          onClick={handleFacebookSignUp}
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
        כבר יש לך חשבון?{' '}
        <Link component={RouterLink} to="/auth/login" sx={{ color: colors.primary, fontWeight: 600 }}>
          התחברות
        </Link>
      </Typography>
    </Box>
  );
};

export default SignUp;