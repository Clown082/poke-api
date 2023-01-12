import { useNotification } from '@/context/notification.context'
import { useAppDispatch } from '@/redux/hooks'
import { createUser } from '@/redux/slices/user.slice'
import { RegisterValidate } from '@/utils/validateForm'
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export interface IRegister {
  username: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { getSuccess } = useNotification()

  const formik = useFormik<IRegister>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterValidate,
    onSubmit: (values: IRegister) => {
      const id = uuidv4()
      dispatch(createUser({ id, username: values.username, password: values.password }))
      getSuccess('User created successfully')
      navigate('/Login')
    },
  })

  return (
    <Container maxWidth="sm">
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
        <Grid item>
          <Paper sx={{ padding: '1.2em', borderRadius: '0.5em' }}>
            <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
              Register
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="username"
                margin="normal"
                type="text"
                fullWidth
                label="Email"
                sx={{ mt: 2, mb: 1.5 }}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                name="password"
                margin="normal"
                type="password"
                fullWidth
                label="Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                name="confirmPassword"
                margin="normal"
                type="password"
                fullWidth
                label="Confirm Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 2 }}>
                Register
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register
