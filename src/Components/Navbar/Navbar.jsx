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
  ListItemButton
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import zuziLogo from '../../assets/Zuzi.jpg';
import colors from '../../Style/colors';
import { categories } from '../../data/data';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
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
    setCategoryMenu({
      anchorEl: event.currentTarget,
      category
    });
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
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {categories.map((category) => (
          <Box key={category.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCategoryClick(category)}>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
            {expandedCategory === category && (
              <List component="div" disablePadding>
                {category.subcategories.map((subcategory) => (
                  <ListItemButton
                    key={subcategory.id}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      navigate(`/category/${category.id}/${subcategory.id}`);
                      setMobileDrawerOpen(false);
                    }}
                  >
                    <ListItemText primary={subcategory.name} />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Box>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            navigate('/profile');
            setMobileDrawerOpen(false);
          }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="פרופיל" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            navigate('/favorites');
            setMobileDrawerOpen(false);
          }}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="פריטים מועדפים" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            handleLogin();
            setMobileDrawerOpen(false);
          }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="התחברות" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => {
            handleSignup();
            setMobileDrawerOpen(false);
          }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
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
        padding: isMobile ? '0 8px' : '0 16px'
      }}>
        {/* Logo */}
        <Box 
          component="img"
          src={zuziLogo}
          alt="Zuzi Logo"
          sx={{ 
            width: isMobile ? '40px' : '50px',
            height: 'auto',
            borderRadius: '10%',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        />

        {/* Mobile Icons */}
        {isMobile && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
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
        )}

        {/* Categories - Hidden on Mobile */}
        {!isMobile && (
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
        )}

        {/* Profile, Notifications, and Chat - Hidden on Mobile */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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

            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ bgcolor: colors.primary, width: 32, height: 32 }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ color: colors.secondary }} />
          </IconButton>
        )}

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
          <MenuItem>התראה חדשה 1</MenuItem>
          <MenuItem>התראה חדשה 2</MenuItem>
          <MenuItem>התראה חדשה 3</MenuItem>
        </Menu>

        {/* Category Submenu */}
        <Menu
          anchorEl={categoryMenu.anchorEl}
          open={Boolean(categoryMenu.anchorEl)}
          onClose={handleMenuClose}
          onMouseLeave={handleMenuClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 