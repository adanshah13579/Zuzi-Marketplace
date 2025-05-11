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
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import zuziLogo from '../../assets/Zuzi.jpg';
import colors from '../../Style/colors';
import { categories } from '../../data/data';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

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

  // Separate handlers for hover and click events
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
  
  // Handle category click to navigate
  const handleCategoryClick = (categoryId) => {
    // Navigate to the category's all-listings page
    navigate(`/category/${categoryId}`);
    // Close the menu
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const handlePostAd = () => {
    navigate('/post-ad'); // Navigate to the post ad page
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
        direction: 'rtl', // RTL support
      }}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Divider sx={{ my: 1 }} />

        {categories.map((category) => (
          <Box key={category.id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  // Navigate to category page
                  navigate(`/category/${category.id}`);
                  
                  // Toggle expanded state for subcategories
                  setExpandedCategory((prev) =>
                    prev === category.id ? null : category.id
                  );
                }}
                sx={{ flexDirection: 'row-reverse' }}
              >
                <ListItemText
                  primary={category.name}
                  sx={{
                    color:
                      activeCategory === category.id
                        ? colors.primary
                        : colors.secondary,
                    fontWeight: activeCategory === category.id ? 700 : 400,
                    textAlign: 'right',
                  }}
                />
              </ListItemButton>
            </ListItem>
  
            {expandedCategory === category.id &&
              category.subcategories?.length > 0 && (
                <List component="div" disablePadding sx={{ pr: 2 }}>
                  {category.subcategories.map((sub) => (
                    <ListItemButton
                      key={sub.id}
                      sx={{ flexDirection: 'row-reverse', pr: 2 }}
                      onClick={() => {
                        navigate(`/category/${category.id}/${sub.id}`);
                        setMobileDrawerOpen(false);
                      }}
                    >
                      <ListItemText primary={sub.name} sx={{ textAlign: 'right' }} />
                    </ListItemButton>
                  ))}
                </List>
              )}
          </Box>
        ))}
  
        <Divider sx={{ my: 1 }} />
  
        {/* Profile */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate('/profile');
              setMobileDrawerOpen(false);
            }}
            sx={{ flexDirection: 'row-reverse', }}
          >
            <ListItemIcon
              sx={{
                justifyContent: 'flex-end', 
                minWidth: 0, 
                ml: 2, 
                order: 2, // Ensure icon is after text
              }}
            >
              <PersonIcon />
            </ListItemIcon>
            <ListItemText 
              primary="פרופיל" 
              sx={{ textAlign: 'right', order: 1 }} // Ensure text is before icon
            />
          </ListItemButton>
        </ListItem>
  
        {/* Favorites */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate('/favorites');
              setMobileDrawerOpen(false);
            }}
            sx={{ flexDirection: 'row-reverse' }}
          >
            <ListItemIcon
              sx={{
                justifyContent: 'flex-end', 
                minWidth: 0, 
                ml: 2, 
                order: 2, // Ensure icon is after text
              }}
            >
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText 
              primary="פריטים מועדפים" 
              sx={{ textAlign: 'right', order: 1 }} // Ensure text is before icon
            />
          </ListItemButton>
        </ListItem>
  
        <Divider sx={{ my: 1 }} />
  
        {/* Login */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleLogin();
              setMobileDrawerOpen(false);
            }}
            sx={{ flexDirection: 'row-reverse' }}
          >
            <ListItemIcon
              sx={{
                justifyContent: 'flex-end', 
                minWidth: 0, 
                ml: 2, 
                order: 2, // Ensure icon is after text
              }}
            >
              <PersonIcon />
            </ListItemIcon>
            <ListItemText 
              primary="התחברות" 
              sx={{ textAlign: 'right', order: 1 }} // Ensure text is before icon
            />
          </ListItemButton>
        </ListItem>
  
        {/* Signup */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              handleSignup();
              setMobileDrawerOpen(false);
            }}
            sx={{ flexDirection: 'row-reverse' }}
          >
            <ListItemIcon
              sx={{
                justifyContent: 'flex-end', 
                minWidth: 0, 
                ml: 2,  
                order: 2, // Ensure icon is after text
              }}
            >
              <PersonIcon />
            </ListItemIcon>
            <ListItemText 
              primary="הרשמה" 
              sx={{ textAlign: 'right', order: 1 }} // Ensure text is before icon
            />
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
  <Toolbar
    sx={{ 
      justifyContent: 'space-between',
      padding: isMobile ? '0 8px' : '0 16px',
      position: 'relative',
      minHeight: isMobile ? '64px' : '64px'
    }}
  >
    {/* Mobile view layout */}
    {isMobile && (
      <>
        {/* Right end - Menu icon */}
        <IconButton onClick={toggleDrawer(true)} sx={{ order: 1 }}>
          <MenuIcon sx={{ color: colors.primary }} />
        </IconButton>
        
        {/* Center area - Logo with Post Ad button to its right */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flex: 1,
          order: 2,gap:8
        }}>
          {/* Post Ad button on right of logo */}
          <Button
            variant=""
            size="small"
            onClick={() => {
              handlePostAd();
              navigate("/post-ad");
            }}
            sx={{
              backgroundColor: "#fff",
              color: colors.primary,
              borderRadius: '4px',
              minWidth: 'auto',
              border:"1px solid #f4c724",
              padding: '4px 4px',
              mr: 3, // Increased margin-right for more spacing between button and logo
              '&:hover': {
                backgroundColor: colors.primary + 'dd'
              },
              fontWeight: 600
            }}
          
          >
            <AddIcon fontSize="small" />
          </Button>
          
          {/* Logo in center */}
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
          
          {/* Favorites icon on left of logo */}
          <IconButton onClick={() => navigate('/favorites')} size="small" sx={{ ml: 3 }}> {/* Increased margin-left for more spacing */}
            <FavoriteBorderIcon sx={{ color: colors.primary, fontSize: '28px' }} />
          </IconButton>
        </Box>
        
        {/* Left end - Chat icon */}
        <IconButton onClick={() => navigate('/chat')} size="small" sx={{ order: 3 }}>
          <Badge badgeContent={2} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '10px' } }}>
            <ChatBubbleOutlineIcon sx={{ color: colors.primary, fontSize: '22px' }} />
          </Badge>
        </IconButton>
      </>
    )}
    
    {/* Desktop view layout - unchanged */}
    {!isMobile && (
      <>
        {/* Right Side - Logo */}
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
    
        <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
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
        </Box>
        
        {/* Left Side - User actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
          <IconButton onClick={() => navigate('/chat')}>
            <Badge badgeContent={2} color="error">
              <ChatBubbleOutlineIcon sx={{ color:"#6C757D" }} />
            </Badge>
          </IconButton>
          <IconButton onClick={() => navigate('/favorites')}>
            <FavoriteBorderIcon sx={{  color:"#6C757D" }} />
          </IconButton>
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar sx={{ bgcolor: "#fff", color:"#6C757D",width: 30, height: 30,border:"1px solid  #6C757D " }}>
              <PersonIcon />
            </Avatar>
          </IconButton>

  <Button
  startIcon={<AddIcon />}
  onClick={() => {
    handlePostAd();
    navigate("/select-category");
  }}
  sx={{
    background: 'linear-gradient(0deg, #393E46 0%, #6C757D 100%)', // dark grey to muted grey
    color: '#fff',
    borderRadius: '1rem',
    gap: 0.8,
    padding: '6px 9px',
    height: '36px',
    fontSize: '0.7rem',
    fontWeight: 500,
    boxShadow: '0 0.7em 1.5em -0.5em #393e4698',
    textTransform: 'none',
    '&:hover': {
      background: 'linear-gradient(0deg, #2e343b 0%, #5a6268 100%)',
      boxShadow: '0 0.5em 1.5em -0.5em #393e4698',
    },
    '&:active': {
      boxShadow: '0 0.3em 1em -0.5em #393e4698',
    }
  }}
>
  פרסם מודעה
</Button>



        </Box>
      </>
    )}
    
    {/* Mobile Categories Row */}
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
              onClick={() => {
                // On mobile, clicking the category should also navigate
                handleCategoryClick(category.id);
                // Show dropdown for subcategories
                handleCategoryMenuOpen({ currentTarget: document.getElementById(`mobile-cat-${category.id}`) || null }, category);
              }}
              id={`mobile-cat-${category.id}`}
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
  </Toolbar>

  {/* Category Dropdown Menu */}
  <Menu
    anchorEl={categoryMenu.anchorEl}
    open={Boolean(categoryMenu.anchorEl)}
    onClose={handleMenuClose}
    MenuListProps={{
      onMouseLeave: handleMenuClose  // Close menu when mouse leaves
    }}
    TransitionComponent={Fade}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    PaperProps={{
      sx: {
        width: 250,
        maxHeight: 400,
        overflow: 'hidden',
        direction: 'rtl',
        '&::-webkit-scrollbar': { display: 'none' }
      }
    }}
    className="category-menu"
  >
    {categoryMenu.category && (
      <Box sx={{ maxHeight: 400, overflowY: 'auto', direction: 'rtl' }}>
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
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
      <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
      פרופיל
    </MenuItem>
    <MenuItem onClick={() => { navigate('/favorites'); handleMenuClose(); }}>
      <ListItemIcon><FavoriteIcon fontSize="small" /></ListItemIcon>
      פריטים מועדפים
    </MenuItem>
    <Divider />
    <MenuItem onClick={handleLogin}>
      <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
      התחברות
    </MenuItem>
    <MenuItem onClick={handleSignup}>
      <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
      הרשמה
    </MenuItem>
  </Menu>
</AppBar>
  );
};

export default Navbar;