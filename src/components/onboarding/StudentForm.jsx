import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  parentEmail: yup.string().email("Invalid email").when("dateOfBirth", (dateOfBirth, schema) => {
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    return age < 18 ? schema.required("Parent Email is required for students under 18") : schema;
  }),
  gradeLevel: yup.string().required("Grade Level is required"),
});

function StudentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Ensure the date format is correct
      const formattedData = {
        ...data,
        user_type: "student", // ✅ Ensure user type is included
        dateOfBirth: new Date(data.dateOfBirth).toISOString(), // ✅ Convert dateOfBirth to ISO format
      };

      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Registration failed");

      console.log("✅ Registration Success:", result);
      navigate("/student-login"); // Redirect after success
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 4 }}>
      <Typography variant="h5" gutterBottom>Student Registration</Typography>
      <TextField fullWidth label="Full Name" {...register("fullName")} error={!!errors.fullName} helperText={errors.fullName?.message} sx={{ mb: 2 }} />
      <TextField fullWidth label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} {...register("dateOfBirth")} error={!!errors.dateOfBirth} helperText={errors.dateOfBirth?.message} sx={{ mb: 2 }} />
      <TextField fullWidth label="Email" type="email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} sx={{ mb: 2 }} />
      <TextField fullWidth label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} sx={{ mb: 2 }} />
      <TextField fullWidth label="Parent Email" type="email" {...register("parentEmail")} error={!!errors.parentEmail} helperText={errors.parentEmail?.message} sx={{ mb: 2 }} />
      <TextField fullWidth label="Grade Level" {...register("gradeLevel")} error={!!errors.gradeLevel} helperText={errors.gradeLevel?.message} sx={{ mb: 2 }} />
      <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
    </Box>
  );
}

export default StudentForm;
