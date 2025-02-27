//import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Typography } from '@mui/material';

// Validation schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  dateOfBirth: yup.date().required('Date of Birth is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  parentEmail: yup.string().email('Invalid email').when('dateOfBirth', (dateOfBirth, schema) => {
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    return age < 18 ? schema.required('Parent Email is required for students under 18') : schema;
  }),
  gradeLevel: yup.string().required('Grade Level is required'),
});

function StudentForm() {
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
        Student Registration
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        {...register('fullName')}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }} // Light background for inputs
      />
      <TextField
        fullWidth
        label="Date of Birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register('dateOfBirth')}
        error={!!errors.dateOfBirth}
        helperText={errors.dateOfBirth?.message}
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
      <TextField
        fullWidth
        label="Parent/Guardian Email"
        type="email"
        {...register('parentEmail')}
        error={!!errors.parentEmail}
        helperText={errors.parentEmail?.message}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
      <TextField
        fullWidth
        label="Grade Level"
        {...register('gradeLevel')}
        error={!!errors.gradeLevel}
        helperText={errors.gradeLevel?.message}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
}

export default StudentForm;