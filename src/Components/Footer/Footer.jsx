import { Box, Container, Grid, Typography, Link, IconButton, useTheme, useMediaQuery, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import colors from '../../Style/colors';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const categories = [
    {
      title: 'אלקטרוניקה',
      items: ['סמארטפונים', 'מחשבים ניידים', 'טאבלטים', 'אביזרים', 'אודיו']
    },
    {
      title: 'ריהוט',
      items: ['סלון', 'חדר שינה', 'מטבח', 'משרד', 'חוץ']
    },
    {
      title: 'ביגוד',
      items: ['גברים', 'נשים', 'ילדים', 'אביזרים', 'הנעלה']
    },
    {
      title: 'ספורט',
      items: ['כושר', 'חוץ', 'ספורט קבוצתי', 'ספורט ימי', 'ספורט חורף']
    }
  ];

  const companyLinks = [
    { name: 'אודותינו', href: '/about' },
    { name: 'קריירה', href: '/careers' },
    { name: 'עיתונות', href: '/press' },
    { name: 'בלוג', href: '/blog' }
  ];

  const supportLinks = [
    { name: 'מרכז עזרה', href: '/help' },
    { name: 'מרכז בטיחות', href: '/safety' },
    { name: 'הנחיות קהילה', href: '/guidelines' },
    { name: 'תנאי שימוש', href: '/terms' },
    { name: 'מדיניות פרטיות', href: '/privacy' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.secondary,
        color: 'white',
        py: 5,
        mt: 'auto',
        direction: 'rtl',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ direction: 'rtl' }}>
          {/* Logo and Social */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1.5
            }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: colors.primary,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '2rem'
                }}
              >
                זוזי
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.8,
                  fontFamily: 'Poppins, sans-serif',
                  lineHeight: 1.5,
                  maxWidth: '280px',
                  fontSize: '0.9rem'
                }}
              >
                השוק המקוון המוביל לקנייה ומכירה של פריטים יד שנייה.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 1.5,
                mt: 1.5
              }}>
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                  <IconButton 
                    key={index}
                    sx={{ 
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': { 
                        backgroundColor: colors.primary,
                        color: colors.secondary
                      },
                      transition: 'all 0.3s ease',
                      p: 0.8
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Categories */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {categories.map((category) => (
                <Grid item xs={6} sm={3} key={category.title}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: colors.primary,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem'
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {category.items.map((item) => (
                      <Box 
                        component="li" 
                        key={item} 
                        sx={{ 
                          mb: 1,
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        <Link
                          href="#"
                          sx={{
                            color: 'white',
                            textDecoration: 'none',
                            opacity: 0.8,
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              color: colors.primary,
                              opacity: 1,
                              paddingRight: '6px'
                            }
                          }}
                        >
                          {item}
                        </Link>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Divider */}
          <Grid item xs={12}>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />
          </Grid>

          {/* Company and Support Links */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: colors.primary,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem'
                  }}
                >
                  החברה
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {companyLinks.map((link) => (
                    <Box 
                      component="li" 
                      key={link.name} 
                      sx={{ 
                        mb: 1,
                        '&:last-child': { mb: 0 }
                      }}
                    >
                      <Link
                        href={link.href}
                        sx={{
                          color: 'white',
                          textDecoration: 'none',
                          opacity: 0.8,
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: colors.primary,
                            opacity: 1,
                            paddingRight: '6px'
                          }
                        }}
                      >
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: colors.primary,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem'
                  }}
                >
                  תמיכה
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {supportLinks.map((link) => (
                    <Box 
                      component="li" 
                      key={link.name} 
                      sx={{ 
                        mb: 1,
                        '&:last-child': { mb: 0 }
                      }}
                    >
                      <Link
                        href={link.href}
                        sx={{
                          color: 'white',
                          textDecoration: 'none',
                          opacity: 0.8,
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: colors.primary,
                            opacity: 1,
                            paddingRight: '6px'
                          }
                        }}
                      >
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12}>
            <Box
              sx={{
                pt: 3,
                textAlign: 'center'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '0.85rem'
                }}
              >
                © {new Date().getFullYear()} זוזי. כל הזכויות שמורות.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer; 