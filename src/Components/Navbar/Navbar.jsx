import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  Button, 
  Avatar, 
  Badge, 
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  Paper,
  Fade,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import zuziLogo from '../../assets/Zuzi.jpg';
import colors from '../../Style/colors';
import { categories } from '../../data/data';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState(null);

  const [categoryMenu, setCategoryMenu] = useState({
    anchorEl: null,
    category: null
  });
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  

  useEffect(() => {
    const handleScroll = () => {
      const categorySections = categories.map(category => {
        const element = document.getElementById(`category-${category.id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: category.id,
            top: rect.top,
            bottom: rect.bottom
          };
        }
        return null;
      }).filter(Boolean);

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      const active = categorySections.find(section => 
        section.top <= viewportCenter && section.bottom >= viewportCenter
      );

      if (active) {
        setActiveCategory(active.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleCategoryMenuOpen = (event, category) => {
    // Close any previously open menu first
    if (categoryMenu.anchorEl && categoryMenu.category?.id === category.id) {
      // If clicking the same category that's already open, close it
      handleMenuClose();
    } else {
      // Otherwise open the new category menu
      setCategoryMenu({
        anchorEl: event.currentTarget,
        category
      });
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchor(null);
    setCategoryMenu({
      anchorEl: null,
      category: null
    });
  };

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleSignup = () => {
    navigate('/auth/signup');
  };

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
      role="presentation"
      onClick={(e) => e.stopPropagation()} // Prevent backdrop click
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {categories.map((category) => (
          <Box key={category.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setExpandedCategory(prev => prev === category.id ? null : category.id)}>
                <ListItemText
                  primary={category.name}
                  sx={{
                    color: activeCategory === category.id ? colors.primary : colors.secondary,
                    fontWeight: activeCategory === category.id ? 700 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
  
            {expandedCategory === category.id && category.subcategories?.length > 0 && (
              <List component="div" disablePadding sx={{ pl: 2 }}>
                {category.subcategories.map((sub) => (
                  
                  <ListItemButton
                    key={sub.id}
                    sx={{ pl: 2 }}
                    onClick={() => {
                      navigate(`/category/${category.id}/${sub.id}`);
                      

                      setMobileDrawerOpen(false); // Close drawer after click
                    }}
                  >
                    <ListItemText primary={sub.name} />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Box>
        ))}
  
        <Divider sx={{ my: 1 }} />
  
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            navigate('/profile');
            setMobileDrawerOpen(false);
          }}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="פרופיל" />
          </ListItemButton>
        </ListItem>
  
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            navigate('/favorites');
            setMobileDrawerOpen(false);
          }}>
            <ListItemIcon><FavoriteIcon /></ListItemIcon>
            <ListItemText primary="פריטים מועדפים" />
          </ListItemButton>
        </ListItem>
  
        <Divider sx={{ my: 1 }} />
  
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            handleLogin();
            setMobileDrawerOpen(false);
          }}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="התחברות" />
          </ListItemButton>
        </ListItem>
  
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            handleSignup();
            setMobileDrawerOpen(false);
          }}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="הרשמה" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        direction: 'rtl'
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: isMobile ? '0 8px' : '0 16px',
        position: 'relative',
        minHeight: isMobile ? '64px' : '64px'
      }}>
        {/* Mobile Layout */}
        {isMobile && (
          <>
            {/* Profile Icons - Start (Left) */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              zIndex: 2
            }}>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: colors.secondary }} />
              </IconButton>
              <IconButton onClick={handleNotificationsOpen}>
              
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon sx={{ color: colors.secondary }} />
                </Badge>
              </IconButton>
              <IconButton onClick={() => navigate('/chat')}>
                <Badge badgeContent={2} color="error">
                  <ChatIcon sx={{ color: colors.secondary }} />
                </Badge>
              </IconButton>
             
            </Box>

            {/* Logo - End (Right) */}
            <Box 
              component="img"
              src={zuziLogo}
              alt="Zuzi Logo"
              sx={{ 
                width: '40px',
                height: 'auto',
                borderRadius: '10%',
                cursor: 'pointer',
                zIndex: 2
              }}
              onClick={() => navigate('/')}
            />
          </>
        )}

        {/* Desktop Layout */}
        {!isMobile && (
          <>
            {/* Profile Icons - Start (Left) */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handleProfileMenuOpen}>
                <Avatar sx={{ bgcolor: colors.primary, width: 32, height: 32 }}>
                  <PersonIcon />
                </Avatar>
              </IconButton>
              <IconButton onClick={handleNotificationsOpen}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon sx={{ color: colors.secondary }} />
                </Badge>
              </IconButton>

              <IconButton onClick={() => navigate('/chat')}>
                <Badge badgeContent={2} color="error">
                  <ChatIcon sx={{ color: colors.secondary }} />
                </Badge>
              </IconButton>

             
            </Box>

            {/* Categories - Desktop */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onMouseEnter={(e) => handleCategoryMenuOpen(e, category)}
                  sx={{
                    color: activeCategory === category.id ? colors.primary : colors.secondary,
                    fontSize: '0.9rem',
                    fontWeight: activeCategory === category.id ? 700 : 400,
                    '&:hover': {
                      color: colors.primary
                    }
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>

            {/* Logo - End (Right) */}
            <Box 
              component="img"
              src={zuziLogo}
              alt="Zuzi Logo"
              sx={{ 
                width: '50px',
                height: 'auto',
                borderRadius: '10%',
                cursor: 'pointer',
                zIndex: 2
              }}
              onClick={() => navigate('/')}
            />
          </>
        )}

        {/* Categories Row for Mobile */}
        {isMobile && (
          <Box sx={{ 
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            padding: '8px 0',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 1,
              padding: '0 8px'
            }}>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={(e) => handleCategoryMenuOpen(e, category)}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    color: activeCategory === category.id ? colors.primary : colors.secondary,
                    fontSize: '0.9rem',
                    fontWeight: activeCategory === category.id ? 700 : 400,
                    whiteSpace: 'nowrap',
                    minWidth: 'auto',
                    padding: '4px 8px',
                    borderRadius: '10px',
                    border: `1px solid ${colors.secondary}20`,
                    '&:hover': {
                      backgroundColor: colors.primary + '10',
                      borderColor: colors.primary
                    }
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>
          </Box>
        )}

        {/* Category Menu for both Mobile and Desktop */}
        <Menu
          anchorEl={categoryMenu.anchorEl}
          open={Boolean(categoryMenu.anchorEl)}
          onClose={handleMenuClose}
          onMouseLeave={isMobile ? undefined : handleMenuClose} // Only use mouseleave for desktop
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              width: 250,
              maxHeight: 400,
              overflow: 'hidden',
              direction: 'rtl',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }
          }}
          className="category-menu"
        >
          {categoryMenu.category && (
            <Box sx={{ 
              maxHeight: 400,
              overflowY: 'auto',
              direction: 'rtl',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  p: 2, 
                  fontWeight: 'bold',
                  color: colors.primary,
                  borderBottom: `1px solid ${colors.primary}20`,
                  textAlign: 'right'
                }}
              >
                {categoryMenu.category.name}
              </Typography>
              <Divider />
              {categoryMenu.category.subcategories.map((subcategory) => (
                <MenuItem 
                  key={subcategory.id}
                  onClick={() => {
                    navigate(`/category/${categoryMenu.category.id}/${subcategory.id}`);
                    handleMenuClose();
                  }}
                  sx={{
                    py: 1.5,
                    px: 2,
                    textAlign: 'right',
                    '&:hover': {
                      backgroundColor: colors.primary + '20',
                      transform: 'translateX(5px)',
                      transition: 'all 0.2s ease'
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {subcategory.name}
                  </Typography>
                </MenuItem>
              ))}
            </Box>
          )}
        </Menu>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={mobileDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerContent}
        </Drawer>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          dir='rtl'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => {
            navigate('/profile');
            handleMenuClose();
          }}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            פרופיל
          </MenuItem>
          <MenuItem onClick={() => {
            navigate('/favorites');
            handleMenuClose();
          }}>
            <ListItemIcon>
              <FavoriteIcon fontSize="small" />
            </ListItemIcon>
            פריטים מועדפים
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogin}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            התחברות
          </MenuItem>
          <MenuItem onClick={handleSignup}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            הרשמה
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem>התראה חדשה</MenuItem>
          <MenuItem>התראה חדשה</MenuItem>
          <MenuItem>התראה חדשה</MenuItem>
        </Menu>


      </Toolbar>
    </AppBar>
  );
};

export default Navbar;