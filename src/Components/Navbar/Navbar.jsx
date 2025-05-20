import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  Fade,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import zuziLogo from "../../assets/Zuzi.jpg";
import colors from "../../Style/colors";
import { categories } from "../../data/data";
import MobileNavbar from "./MobileNavbar";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { FaRegHeart } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";

const Navbar = ({ activeCategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const [categoryMenu, setCategoryMenu] = useState({
    anchorEl: null,
    category: null,
  });

  // Get the current category ID from the URL
  const getCurrentCategoryId = () => {
    if (activeCategory) return activeCategory;
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'category' && pathParts[2]) {
      return parseInt(pathParts[2]);
    }
    return null;
  };

  const currentCategoryId = getCurrentCategoryId();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryMenuOpen = (event, category) => {
    if (categoryMenu.anchorEl && categoryMenu.category?.id === category.id) {
      handleMenuClose();
    } else {
      setCategoryMenu({
        anchorEl: event.currentTarget,
        category,
      });
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCategoryMenu({
      anchorEl: null,
      category: null,
    });
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleSignup = () => {
    navigate("/auth/signup");
  };

  const handlePostAd = () => {
    navigate("/post-ad");
  };

  if (isMobile) {
    return (
      <MobileNavbar 
        categories={categories}
        handleCategoryClick={handleCategoryClick}
        activeCategory={currentCategoryId}
        handlePostAd={handlePostAd}
      />
    );
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        direction: 'rtl',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 0,
        }
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          padding: '0 16px',
          position: 'relative',
          minHeight: '64px',
          zIndex: 1,
        }}
      >
        {/* Right Side - Logo */}
        <Box
          component="img"
          src={zuziLogo}
          alt="Zuzi Logo"
          sx={{
            width: "50px",
            height: "auto",
            borderRadius: "10%",
            cursor: "pointer",
            zIndex: 2,
          }}
          onClick={() => navigate("/")}
        />

        <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                onMouseEnter={(e) => handleCategoryMenuOpen(e, category)}
                sx={{
                  color: currentCategoryId === category.id ? colors.primary : colors.secondary,
                  fontSize: "0.9rem",
                  fontWeight: currentCategoryId === category.id ? 700 : 400,
                  "&:hover": {
                    color: colors.primary,
                  },
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Left Side - User actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => navigate("/chat")}
            sx={{
              color: "#36454F",
              fontSize: 26.5,
              "&:hover": {
                color: "#f4c724",
                backgroundColor: "transparent", 
              }, 
            }}
          >
            <TbMessageCircle sx={{ color: "#36454F" }} />
          </IconButton>
          <IconButton
            onClick={() => navigate("/favorites")}
            sx={{
              color: "#36454F",
              fontSize: 24,
              "&:hover": { 
                color: "#f4c724",
                backgroundColor: "transparent", 
              },
            }}
          >
            <FaRegHeart />
          </IconButton>
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              color: "#36454F",
              "&:hover": { 
                color: "#f4c724",
                backgroundColor: "transparent", 
              },
            }}
          >
            <PermIdentityOutlinedIcon
              sx={{
                fontSize: 29,
                color: "#36454F",
                "&:hover": { 
                  color: "#f4c724",
                  backgroundColor: "transparent", 
                },
              }}
            />
          </IconButton>

          <Button
            startIcon={<AddIcon />}
            onClick={() => {
              handlePostAd();
              navigate("/select-category");
            }}
            sx={{
              background: "#f4c724",
              color: "#000",
              border: "1px solid #f4c724",
              borderRadius: "0.4rem",
              gap: 0.7,
              mr: 1,
              padding: "6.5px 9px",
              height: "22px",
              fontSize: "0.5rem",
              fontWeight: 600,
              boxShadow: "0 0.7em 1.5em -0.5em rgba(57, 62, 70, 0.05)",
              textTransform: "none",
              "&:hover": {
                background: "#fff",
                boxShadow: "0 0.5em 1.5em -0.5em #393e4698",
                color: "#000",
              },
              "&:active": {
                boxShadow: "0 0.3em 1em -0.5em #393e4698",
              },
            }}
          >
            פרסם מודעה
          </Button>
        </Box>
      </Toolbar>

      {/* Category Dropdown Menu */}
      <Menu
        anchorEl={categoryMenu.anchorEl}
        open={Boolean(categoryMenu.anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          onMouseLeave: handleMenuClose,
        }}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: {
            width: 250,
            maxHeight: 400,
            overflow: "hidden",
            direction: "rtl",
            "&::-webkit-scrollbar": { display: "none" },
          },
        }}
        className="category-menu"
      >
        {categoryMenu.category && (
          <Box sx={{ maxHeight: 400, overflowY: "auto", direction: "rtl" }}>
            <MenuItem
              onClick={() => {
                // Navigate to the first subcategory of the main category
                if (categoryMenu.category.subcategories && categoryMenu.category.subcategories.length > 0) {
                  navigate(`/category/${categoryMenu.category.id}/${categoryMenu.category.subcategories[0].id}`);
                } else {
                  navigate(`/category/${categoryMenu.category.id}`);
                }
                handleMenuClose();
              }}
              sx={{
                p: 2,
                textAlign: "right",
                backgroundColor: currentCategoryId === categoryMenu.category.id ? colors.primary + "20" : "transparent",
                "&:hover": {
                  backgroundColor: colors.primary + "20",
                  transform: "translateX(5px)",
                  transition: "all 0.2s ease",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: currentCategoryId === categoryMenu.category.id ? colors.primary : "inherit",
                  borderBottom: `1px solid ${colors.primary}20`,
                  width: "100%",
                  pb: 1,
                }}
              >
                {categoryMenu.category.name}
              </Typography>
            </MenuItem>
            <Divider />
            {categoryMenu.category.subcategories.map((subcategory) => (
              <MenuItem
                key={subcategory.id}
                onClick={() => {
                  navigate(
                    `/category/${categoryMenu.category.id}/${subcategory.id}`
                  );
                  handleMenuClose();
                }}
                sx={{
                  py: 1.5,
                  px: 2,
                  textAlign: "right",
                  "&:hover": {
                    backgroundColor: colors.primary + "20",
                    transform: "translateX(5px)",
                    transition: "all 0.2s ease",
                  },
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

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        dir="rtl"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          פרופיל
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/favorites");
            handleMenuClose();
          }}
        >
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
    </AppBar>
  );
};

export default Navbar;