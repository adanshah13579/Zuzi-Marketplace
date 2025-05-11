import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CameraAlt as CameraAltIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import Navbar from '../../Components/Navbar/Navbar';
import colors from '../../Style/colors';

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for form fields
  const [formData, setFormData] = useState({
    name: 'יוחנן כהן',
    email: 'yohanan@example.com',
    phone: '050-1234567',
    address: 'רחוב הרצל 123, תל אביב',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State for password visibility
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // State for profile image
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', formData);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: colors.background,
      direction: 'rtl'
    }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 16, flexGrow: 1 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            color: colors.secondary,
            fontWeight: 700,
            mb: 6,
            textAlign: 'center'
          }}
        >
          עדכן פרופיל
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {/* Profile Image Section */}
          <Grid item xs={12} md={5}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                textAlign: 'center',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={profileImage}
                  sx={{ 
                    width: 180, 
                    height: 180,
                    mb: 3,
                    border: `4px solid ${colors.primary}`
                  }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="icon-button-file"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 15,
                      right: 15,
                      backgroundColor: 'white',
                      width: 40,
                      height: 40,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)'
                      }
                    }}
                  >
                    <CameraAltIcon fontSize="large" />
                  </IconButton>
                </label>
              </Box>
              <Typography variant="h5" sx={{ color: colors.secondary, mb: 1 }}>
                {formData.name}
              </Typography>
              <Typography variant="body1" sx={{ color: colors.tertiary, fontSize: '1.1rem' }}>
                {formData.email}
              </Typography>
            </Paper>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 6, 
                borderRadius: 3,
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <form onSubmit={handleSubmit}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: 600,
                    textAlign: 'right',
                    color: colors.secondary
                  }}
                >
                  פרטים אישיים
                </Typography>
                
                {/* Personal Information Fields */}
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ position: 'relative' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px',
                        color: colors.secondary,
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        שם מלא
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          borderRadius: '12px',
                          border: `1px solid ${colors.tertiary}40`,
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          backgroundColor: colors.background,
                          '&:focus': {
                            borderColor: colors.primary,
                            boxShadow: `0 0 0 2px ${colors.primary}20`
                          }
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ position: 'relative' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px',
                        color: colors.secondary,
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        דוא״ל
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          borderRadius: '12px',
                          border: `1px solid ${colors.tertiary}40`,
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          backgroundColor: colors.background
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ position: 'relative' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px',
                        color: colors.secondary,
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        טלפון
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          borderRadius: '12px',
                          border: `1px solid ${colors.tertiary}40`,
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          backgroundColor: colors.background
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ position: 'relative' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px',
                        color: colors.secondary,
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        כתובת
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          borderRadius: '12px',
                          border: `1px solid ${colors.tertiary}40`,
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          backgroundColor: colors.background
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 6, borderColor: `${colors.tertiary}20` }} />

                {/* Password Change Section */}
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: 600,
                    textAlign: 'right',
                    color: colors.secondary
                  }}
                >
                  שינוי סיסמה
                </Typography>
                
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Box sx={{ position: 'relative' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px',
                        color: colors.secondary,
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        סיסמה נוכחית
                      </label>
                      <Box sx={{ position: 'relative' }}>
                        <input
                          type={showPassword.current ? 'text' : 'password'}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '16px 20px',
                            paddingRight: '56px',
                            borderRadius: '12px',
                            border: `1px solid ${colors.tertiary}40`,
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            backgroundColor: colors.background
                          }}
                        />
                        <IconButton
                          onClick={() => handlePasswordVisibility('current')}
                          sx={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: colors.tertiary,
                            width: 40,
                            height: 40,
                            '&:hover': {
                              color: colors.primary
                            }
                          }}
                        >
                          {showPassword.current ? <VisibilityOffIcon fontSize="medium" /> : <VisibilityIcon fontSize="medium" />}
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ position: 'relative' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px',
                        color: colors.secondary,
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        סיסמה חדשה
                      </label>
                      <Box sx={{ position: 'relative' }}>
                        <input
                          type={showPassword.new ? 'text' : 'password'}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '16px 20px',
                            paddingRight: '56px',
                            borderRadius: '12px',
                            border: `1px solid ${colors.tertiary}40`,
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            backgroundColor: colors.background
                          }}
                        />
                        <IconButton
                          onClick={() => handlePasswordVisibility('new')}
                          sx={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: colors.tertiary,
                            width: 40,
                            height: 40,
                            '&:hover': {
                              color: colors.primary
                            }
                          }}
                        >
                          {showPassword.new ? <VisibilityOffIcon fontSize="medium" /> : <VisibilityIcon fontSize="medium" />}
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ position: 'relative' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px',
                        color: colors.secondary,
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        אימות סיסמה חדשה
                      </label>
                      <Box sx={{ position: 'relative' }}>
                        <input
                          type={showPassword.confirm ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '16px 20px',
                            paddingRight: '56px',
                            borderRadius: '12px',
                            border: `1px solid ${colors.tertiary}40`,
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            backgroundColor: colors.background
                          }}
                        />
                        <IconButton
                          onClick={() => handlePasswordVisibility('confirm')}
                          sx={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: colors.tertiary,
                            width: 40,
                            height: 40,
                            '&:hover': {
                              color: colors.primary
                            }
                          }}
                        >
                          {showPassword.confirm ? <VisibilityOffIcon fontSize="medium" /> : <VisibilityIcon fontSize="medium" />}
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-start',  }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    dir='ltr'
                    sx={{
                      bgcolor: colors.primary,
                      color: 'white',
                      px: 6,
                      py: 2,
                      gap:2,
                      fontSize: '18px',
                      '&:hover': {
                        bgcolor: colors.primary,
                        opacity: 0.9
                      }
                    }}
                  >
                    שמור שינויים
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile; 