import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CustomInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  showPasswordToggle = false,
  error,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ position: 'relative', mb: 0.5 }}>
      <Typography
        variant="body2"
        sx={{
          color: '#5d6d7c',
          fontSize: '0.875rem',
          mb: 0.5,
          textAlign: 'right',
          fontWeight: 500
        }}
      >
        {label}
        {required && <span style={{ color: '#d32f2f', marginRight: '4px' }}>*</span>}
      </Typography>
      <Box sx={{ position: 'relative' }}>
        <input
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          required={required}
          style={{
            width: '100%',
            padding: '12px 16px',
            paddingRight: showPasswordToggle ? '40px' : '16px',
            border: `1px solid ${error ? '#d32f2f' : '#e0e0e0'}`,
            borderRadius: '4px',
            fontSize: '0.875rem',
            backgroundColor: '#fff',
            textAlign: 'right',
            direction: 'rtl',
            '&:focus': {
              outline: 'none',
              borderColor: '#1976d2',
            }
          }}
          {...props}
        />
        {showPasswordToggle && (
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            sx={{
              position: 'absolute',
              left: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '4px',
              height: '32px',
              width: '32px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )}
      </Box>
      {error && (
        <Box
          component="span"
          sx={{
            color: '#d32f2f',
            fontSize: '0.75rem',
            display: 'block',
            mt: 0.5,
            textAlign: 'right',
          }}
        >
          {error}
        </Box>
      )}
    </Box>
  );
};

export default CustomInput; 