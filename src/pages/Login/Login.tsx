import { useNotification } from '@/context/notification.context'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { loginUser } from '@/redux/slices/auth.slice'
import { LoginValidate } from '@/utils/validateForm'
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
export interface ILogin {
  username: string
  password: string
}

const Login: React.FC<{}> = () => {
  const usersState = useAppSelector((state) => state.userReducer)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { getError } = useNotification()

  const formik = useFormik<ILogin>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidate,
    onSubmit: (values: ILogin) => {
      const user = usersState.find((usr) => usr.username === values.username && usr.password === values.password)
      if (user) {
        dispatch(loginUser({ id: user.id, username: user.username }))
        navigate('/')
      } else {
        getError('Email or password incorrect')
      }
    },
  })
  return (
    <Container maxWidth="sm">
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
        <Grid item>
          <Paper sx={{ padding: '1.2em', borderRadius: '0.5em' }}>
            <Typography variant="h4" sx={{ mt: 1, mb: 1 }}>
              Login
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
              <Button fullWidth type="submit" variant="contained" sx={{ mt: 1.5, mb: 2 }}>
                Login
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
