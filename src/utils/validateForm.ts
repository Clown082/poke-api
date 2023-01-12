import * as yup from 'yup'

export const LoginValidate = yup.object().shape({
  username: yup.string().trim().required('Email field is required'),
  password: yup
    .string()
    .trim()
    .required('Password field is required')
    .min(4, 'Minimum 4 characters required')
    .max(20, 'Maximum 20 characters required'),
})

export const RegisterValidate = yup.object().shape({
  username: yup.string().trim().required('Email field is required'),
  password: yup
    .string()
    .trim()
    .required('Password field is required')
    .min(4, 'Minimum 4 characters required')
    .max(20, 'Maximum 20 characters required'),
  confirmPassword: yup
    .string()
    .trim()
    .required('Password field is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})