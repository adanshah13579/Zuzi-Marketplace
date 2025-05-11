import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper, Divider } from '@mui/material';
import Navbar from '../Components/Navbar/Navbar';

const PostAd = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'יד שנייה',
    location: '',
    images: [],
    userName: '',
    userEmail: '',
    userPhone: ''
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <Box dir="rtl" sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', p: { xs: 3, sm: 4, md: 5 }, mt: 0 }}>
        <Paper sx={{ p: { xs: 3, sm: 5 }, boxShadow: 'none', borderRadius: '10px', border: '1px solid #eee' }}>
          <Typography variant="h3" gutterBottom textAlign="right" sx={{ fontWeight: 'bold', mb: 4 }}>
            פרסם מודעה
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Product Information Section */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
              פרטי המוצר
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  כותרת המוצר*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="הזן כותרת"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  מיקום*
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="לדוגמה: תל אביב"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  מחיר*
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="₪"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  קטגוריה*
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">בחר קטגוריה</option>
                  <option value="אלקטרוניקה">אלקטרוניקה</option>
                  <option value="ריהוט">ריהוט</option>
                  <option value="רכב">רכב</option>
                  <option value="אופנה">אופנה</option>
                  <option value="אחר">אחר</option>
                </select>
              </Grid>

              <Grid item xs={12} md={6}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  מצב*
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="יד שנייה">יד שנייה</option>
                  <option value="חדש">חדש</option>
                </select>
              </Grid>

              <Grid item xs={12}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  תיאור*
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="כתוב תיאור מפורט"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    resize: 'vertical',
                    minHeight: '120px',
                    boxSizing: 'border-box'
                  }}
                />
              </Grid>
            </Grid>

            {/* Image Upload Section */}
            <Divider sx={{ my: 5 }} />
            
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
              תמונות
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  העלה תמונות (עד 10)
                </label>
                <Box 
                  sx={{ 
                    border: '1px dashed #ddd', 
                    borderRadius: '8px', 
                    p: 4, 
                    textAlign: 'center',
                    backgroundColor: '#fafafa'
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button 
                      variant="outlined" 
                      component="span"
                      sx={{ py: 1.5, px: 3, borderRadius: '8px' }}
                    >
                      בחר תמונות
                    </Button>
                  </label>
                  <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
                    גרור ושחרר תמונות לכאן או לחץ כדי לבחור
                  </Typography>
                </Box>
                
                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body1" sx={{ fontWeight: '600', mb: 2 }}>
                      תמונות שנבחרו:
                    </Typography>
                    <Box 
                      display="flex" 
                      flexWrap="wrap" 
                      gap={2}
                    >
                      {imagePreviews.map((src, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            position: 'relative',
                            width: 120,
                            height: 120,
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #eee'
                          }}
                        >
                          <img
                            src={src}
                            alt="preview"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>

            {/* Contact Information Section */}
            <Divider sx={{ my: 5 }} />
            
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
              פרטי יצירת קשר
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  שם מלא*
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  placeholder="לדוגמה: דוד לוי"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  דוא״ל*
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  required
                  placeholder="name@email.com"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                  טלפון*
                </label>
                <input
                  type="tel"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                  required
                  placeholder="לדוגמה: 050-0000000"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                size="medium"
                sx={{ 
                  py: 2, 
                  px: 4, 
                  borderRadius: '8px', 
                  fontSize: '14px',
                  fontWeight: '600',
                  minWidth: '150px'
                }}
              >
                פרסם מודעה
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default PostAd;