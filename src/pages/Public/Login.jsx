import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { addValidationLoginSchema } from "../../validation/validation";

const Login = () => {
  const navigation = useNavigate()

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      navigation("/")
    }
  }, [])


  const checkLogin = (params) => {
    let allUsers = JSON.parse(localStorage.getItem("users")) || [];
    let haveUser = allUsers.find(item => item.email == params.email && item.password == params.password);
    if (haveUser) {
      let randTokenNum = Math.floor(Math.random() * 1000)
      localStorage.setItem("token", JSON.stringify(haveUser.email + randTokenNum));
      localStorage.setItem("activeUser", JSON.stringify(haveUser));
      navigation("/")
    } else {
      alert("user not found !")
    }
  }


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: addValidationLoginSchema,
    onSubmit: (values) => {
      checkLogin(values)
    },
  });


  return (
    <div >
      <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center", height: "calc(100vh - 100px)" }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={'/register'} variant="body2" style={{ color: "blue", textDecoration: "none" }}>
                  "Don't have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default Login