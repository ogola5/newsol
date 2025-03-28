import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Validation schema
const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  childrenEmails: yup.string().required('Children Emails are required'),
});

function ParentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Registration Data:', data);
    // Simulate sending data to backend (for now, pass it to parent login)
    navigate('/parent-login', { state: { registrationData: data } });
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold' }}>
        Parent Registration
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
      <TextField
        fullWidth
        label="Phone Number"
        {...register('phoneNumber')}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
      <TextField
        fullWidth
        label="Children Emails (comma-separated)"
        {...register('childrenEmails')}
        error={!!errors.childrenEmails}
        helperText={errors.childrenEmails?.message}
        sx={{ mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
}

export default ParentForm;