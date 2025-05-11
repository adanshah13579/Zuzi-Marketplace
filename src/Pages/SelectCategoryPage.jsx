import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WeekendIcon from "@mui/icons-material/Weekend";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import StoreIcon from "@mui/icons-material/Store";
import BusinessIcon from "@mui/icons-material/Business";
import HandymanIcon from "@mui/icons-material/Handyman";
import Navbar from "../Components/Navbar/Navbar";

const categories = [
  { name: "יד שניה", icon: <WeekendIcon fontSize="large" />, path: "/post-ad", badge: "יש לכם פריטים מתאימים?" },
  { name: "כלי רכב", icon: <DirectionsCarIcon fontSize="large" />, path: "/post-ad" },
  { name: "נדל״ן", icon: <HomeIcon fontSize="large" />, path: "/post-ad" },
  { name: "משרה", icon: <WorkIcon fontSize="large" />, path: "/post-ad" },
  { name: "נדל״ן מסחרי", icon: <BusinessIcon fontSize="large" />, path: "/post-ad" },
  { name: "בעלי מקצוע", icon: <HandymanIcon fontSize="large" />, path: "/post-ad", isNew: true },
  { name: "עסקים למכירה", icon: <StoreIcon fontSize="large" />, path: "/post-ad", isNew: true },
];

export default function SelectCategory() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Box p={{ xs: 2, sm: 4 }}>
        <Typography
          variant="h6"
          textAlign="center"
          my={4}
          fontWeight={600}
          color="text.primary"
        >
          אני רוצה לפרסם מודעה בלוח...
        </Typography>

       <Grid container spacing={2} justifyContent="center" alignItems="center">
  {categories.map((cat, index) => (
    <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
      <Box sx={{ position: "relative" }}>
        {cat.isNew && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#f4c724",
              color: "#000",
              fontSize: 12,
              fontWeight: 600,
              px: 1.2,
              py: 0.3,
              borderRadius: "6px",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
              zIndex: 1,
            }}
          >
            חדש
          </Box>
        )}
        <Card
          onClick={() => navigate(cat.path)}
          sx={{
            height: 170,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            textAlign: "center",
            boxShadow: 2,
            padding: 2,
            minWidth: 200,
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            transition: "0.3s ease",
            backgroundColor: "#fff",
            '&:hover': {
              border: "2px solid #f4c724",
              boxShadow: "0 0 12px #f4c72455",
            }
          }}
        >
          <CardContent>
            <Box mb={1}>{cat.icon}</Box>
            <Typography fontWeight="500">{cat.name}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  ))}
</Grid>

      </Box>
    </>
  );
}
