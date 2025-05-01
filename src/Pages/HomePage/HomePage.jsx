import { Box } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import HeroSlider from '../../Components/HeroSlider/HeroSlider';
import ProductSection from '../../Components/ProductSection/ProductSection';
import Footer from '../../Components/Footer/Footer';
import colors from '../../Style/colors';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: colors.background }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSlider />
        <ProductSection />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage; 