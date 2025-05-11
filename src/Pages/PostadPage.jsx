import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
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
      <Box dir="rtl" sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', p: { xs: 2, sm: 3, md: 4 }, mt: 2 }}>
        <Paper sx={{ p: { xs: 2, sm: 4 }, boxShadow: 'none', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom textAlign="right">פרסם מודעה</Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <label>כותרת המוצר</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="הזן כותרת"
                  style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </Grid>
               <Grid item xs={12} sm={6}>
                <label>מיקום</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="לדוגמה: תל אביב"
                  style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </Grid>

              
              <Grid item xs={12} sm={6}>
                <label>מחיר</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="₪"
                  style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <label>קטגוריה</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                >
                  <option value="">בחר קטגוריה</option>
                  <option value="אלקטרוניקה">אלקטרוניקה</option>
                  <option value="ריהוט">ריהוט</option>
                  <option value="רכב">רכב</option>
                  <option value="אופנה">אופנה</option>
                  <option value="אחר">אחר</option>
                </select>
              </Grid>
              <Grid item xs={12}>
                <label>תיאור</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="כתוב תיאור מפורט"
                  style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </Grid>


              <Grid item xs={12} sm={6}>
                <label>מצב</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                >
                  <option value="יד שנייה">יד שנייה</option>
                  <option value="חדש">חדש</option>
                </select>
              </Grid>

             

              <Grid item xs={12}>
                <label>העלה תמונות</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: 'block', marginTop: '10px' }}
                />
                <Box display="flex" flexWrap="wrap" mt={2}>
                  {imagePreviews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="preview"
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover', marginLeft: '10px', marginBottom: '10px', borderRadius: '8px' }}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <label>שם מלא</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  placeholder="לדוגמה: דוד לוי"
                  style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <label>דוא״ל</label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  required
                  placeholder="name@email.com"
                  style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <label>טלפון</label>
                <input
                  type="tel"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleChange}
                  required
                  placeholder="לדוגמה: 050-0000000"
                  style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="start">
                <Button variant="contained" color="primary" type="submit" sx={{ py: 1.5, mt: 2, borderRadius: '8px' }}>
                  פרסם מודעה
                </Button>
              </Box>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default PostAd;
