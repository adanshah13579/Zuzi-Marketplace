import { useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Collapse,
  Typography,
  Button,
  ListItemIcon,
  keyframes,
  Menu,
  MenuItem
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import zuziLogo from "../../assets/Zuzi.jpg";
import colors from "../../Style/colors";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { FaRegHeart } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { SlMenu } from "react-icons/sl";

const pulseGlow = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.3;
  }
`;

const MobileNavbar = ({ categories, handleCategoryClick, activeCategory, handlePostAd }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        direction: "rtl", // RTL support
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
                  // Navigate to the first subcategory of the main category
                  if (category.subcategories && category.subcategories.length > 0) {
                    navigate(`/category/${category.id}/${category.subcategories[0].id}`);
                  } else {
                    navigate(`/category/${category.id}`);
                  }
                  setMobileDrawerOpen(false);
                }}
                sx={{ 
                  flexDirection: "row-reverse",
                  backgroundColor: currentCategoryId === category.id ? colors.primary + "20" : "transparent",
                  "&:hover": {
                    backgroundColor: colors.primary + "20",
                    transform: "translateX(5px)",
                    transition: "all 0.2s ease",
                  },
                }}
              >
                <ListItemText
                  primary={category.name}
                  sx={{
                    color: currentCategoryId === category.id ? colors.primary : colors.secondary,
                    fontWeight: currentCategoryId === category.id ? 700 : 400,
                    textAlign: "right",
                  }}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCategory((prev) =>
                      prev === category.id ? null : category.id
                    );
                  }}
                  sx={{
                    p: 0.5,
                    transform: expandedCategory === category.id ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>

            {expandedCategory === category.id &&
              category.subcategories?.length > 0 && (
                <List component="div" disablePadding sx={{ pr: 2 }}>
                  {category.subcategories.map((sub) => (
                    <ListItemButton
                      key={sub.id}
                      sx={{ 
                        flexDirection: "row-reverse", 
                        pr: 2,
                        backgroundColor: currentCategoryId === category.id ? colors.primary + "10" : "transparent",
                        "&:hover": {
                          backgroundColor: colors.primary + "20",
                          transform: "translateX(5px)",
                          transition: "all 0.2s ease",
                        },
                      }}
                      onClick={() => {
                        navigate(`/category/${category.id}/${sub.id}`);
                        setMobileDrawerOpen(false);
                      }}
                    >
                      <ListItemText
                        primary={sub.name}
                        sx={{ 
                          textAlign: "right",
                          color: currentCategoryId === category.id ? colors.primary : colors.secondary,
                        }}
                      />
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
              navigate("/profile");
              setMobileDrawerOpen(false);
            }}
            sx={{ flexDirection: "row-reverse" }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "flex-end",
                minWidth: 0,
                ml: 2,
                order: 2, // Ensure icon is after text
              }}
            >
              <PermIdentityOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="פרופיל"
              sx={{ textAlign: "right", order: 1 }} // Ensure text is before icon
            />
          </ListItemButton>
        </ListItem>

        {/* Login */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/auth/login");
              setMobileDrawerOpen(false);
            }}
            sx={{ flexDirection: "row-reverse" }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "flex-end",
                minWidth: 0,
                ml: 2,
                order: 2, // Ensure icon is after text
              }}
            >
              <PermIdentityOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="התחברות"
              sx={{ textAlign: "right", order: 1 }} // Ensure text is before icon
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const handleCategoryMenuOpen = (category, event) => {
    event.preventDefault();
    setSelectedCategory(category);
    setCategoryMenuAnchor(event.currentTarget);
  };

  const handleCategoryMenuClose = () => {
    setCategoryMenuAnchor(null);
    setSelectedCategory(null);
  };

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    navigate(`/category/${categoryId}/${subcategoryId}`);
    handleCategoryMenuClose();
  };

  return (
    <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pr: 1,
        pl:0.5,
        height: 56,
        backgroundColor: "white",
        borderBottom: "1px solid #eee",
        width: "100vw",
        direction: "rtl",
        position: "relative",
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 0,
          background: `
            radial-gradient(circle at 10% 100%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0) 50%),
            radial-gradient(circle at 90% 100%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0) 50%),
            radial-gradient(circle at center, rgba(255, 236, 139, 0.3) 0%, rgba(255, 248, 220, 0.2) 100%)
          `,
          animation: `${pulseGlow} 4s ease-in-out infinite`,
        }
      }}
    >
      {/* Logo on the RIGHT in RTL */}
      <Box sx={{ display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <img src={zuziLogo} alt="Logo" style={{ height: 35,borderRadius:2 }} />
      </Box>

      {/* Icons on the LEFT in RTL */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, position: "relative", zIndex: 1 }}>
        <IconButton onClick={() => navigate("/favorites")} sx={{ml:0, padding: "3px",        // ↓ Padding reduced
        width: 30,             // ↓ Width set
        height: 30,            // ↓ Height set
        minWidth: 0,           // ↓ Prevents expanding
        minHeight: 0,}}>
          <FaRegHeart />
        </IconButton>

        <IconButton onClick={() => navigate("/chat")}sx={{ml:1, padding: "0px",        
        width: 32,         
        height: 32
        ,
        minWidth: 0,
        minHeight: 0,}} >
          <TbMessageCircle />
        </IconButton>

        <IconButton
          onClick={() => {
            handlePostAd();
            navigate("/post-ad");
          }}

          sx={{  border: "1px solid #000",
        backgroundColor: "#f4c724",
        borderRadius: 1,
        ml: 1.2,
        padding: "2px",        // ↓ Padding reduced
        width: 20,
        height: 20,
        minWidth: 0,
        minHeight: 0,}}
        >
          <AddIcon   sx={{fontSize:12}}/>
        </IconButton>

        <IconButton onClick={toggleDrawer(true)} size="medium">
          <SlMenu />
        </IconButton>
      </Box>
    </Box>

     {/* Mobile Categories Row */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              backgroundColor: "white",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              padding: "8px 0",
              overflowX: "auto",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: -1,
                background: `
                  radial-gradient(circle at 10% 100%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0) 50%),
                  radial-gradient(circle at 90% 100%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0) 50%),
                  radial-gradient(circle at center, rgba(255, 236, 139, 0.3) 0%, rgba(255, 248, 220, 0.2) 100%)
                `,
                opacity: 0.8
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                padding: "0 8px",
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={(e) => handleCategoryMenuOpen(category, e)}
                  id={`mobile-cat-${category.id}`}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    color: currentCategoryId === category.id ? colors.primary : colors.secondary,
                    fontSize: "0.9rem",
                    fontWeight: currentCategoryId === category.id ? 700 : 400,
                    whiteSpace: "nowrap",
                    minWidth: "auto",
                    padding: "4px 8px",
                    borderRadius: "10px",
                    border: `1px solid ${currentCategoryId === category.id ? colors.primary : colors.secondary}20`,
                    backgroundColor: currentCategoryId === category.id ? colors.primary + "10" : "transparent",
                    "&:hover": {
                      backgroundColor: colors.primary + "10",
                      borderColor: colors.primary,
                    },
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>
          </Box>

      {/* Category Dropdown Menu */}
      <Menu
        anchorEl={categoryMenuAnchor}
        open={Boolean(categoryMenuAnchor)}
        onClose={handleCategoryMenuClose}
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
            overflow: "hidden",
            direction: "rtl",
            "&::-webkit-scrollbar": { display: "none" },
          },
        }}
      >
        {selectedCategory && (
          <Box sx={{ maxHeight: 400, overflowY: "auto", direction: "rtl" }}>
            <MenuItem
              onClick={() => {
                navigate(`/category/${selectedCategory.id}`);
                handleCategoryMenuClose();
              }}
              sx={{
                p: 2,
                textAlign: "right",
                backgroundColor: currentCategoryId === selectedCategory.id ? colors.primary + "20" : "transparent",
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
                  color: currentCategoryId === selectedCategory.id ? colors.primary : "inherit",
                  borderBottom: `1px solid ${colors.primary}20`,
                  width: "100%",
                  pb: 1,
                }}
              >
                {selectedCategory.name}
              </Typography>
            </MenuItem>
            <Divider />
            {selectedCategory.subcategories?.map((subcategory) => (
              <MenuItem
                key={subcategory.id}
                onClick={() => handleSubcategoryClick(selectedCategory.id, subcategory.id)}
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

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default MobileNavbar; 