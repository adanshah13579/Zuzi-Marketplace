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
  ListItemIcon
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

const MobileNavbar = ({ categories, handleCategoryClick, activeCategory, handlePostAd }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

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
        direction: "rtl", // 👈 This is key for RTL layout
      }}
    >
      {/* Logo on the RIGHT in RTL */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img src={zuziLogo} alt="Logo" style={{ height: 35,borderRadius:2 }} />
      </Box>

      {/* Icons on the LEFT in RTL (they're still written in LTR order) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderTop: "1px solid rgba(0,0,0,0.1)",
              padding: "8px 0",
              overflowX: "auto",
              whiteSpace: "nowrap",
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
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
                  onClick={() => {
                    handleCategoryClick(category.id);
                  }}
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