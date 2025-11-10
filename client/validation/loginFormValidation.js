import *as yup from 'yup';    

export const loginSchema = yup.object().shape({
  email: yup.string().min(5).max(50).email('Invalid email format').required('Email is required'),
  password: yup.string().min(8).max(20).required('Password is required'),
});
