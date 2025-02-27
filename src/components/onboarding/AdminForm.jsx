//import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Typography } from '@mui/material';

// Validation schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function AdminForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Add logic to submit data to the backend
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold' }}>
        Admin Registration
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        {...register('fullName')}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
}

export default AdminForm;