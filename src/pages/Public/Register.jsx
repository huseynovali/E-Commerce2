import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { addValidationRegisterSchema } from "../../validation/validation";

const Register = () => {
  const navigation = useNavigate()

  const onSubmit = (values) => {
    let allUsers = JSON.parse(localStorage.getItem("users")) || [];
    let checkEmail = allUsers.find((item) => item.email === values.email);

    if (!checkEmail) {
      navigation("/login");
      localStorage.setItem("users", JSON.stringify([...allUsers, values]));
    } else {
      alert("This email already exists!");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmpassword: ""
    },

    validationSchema: addValidationRegisterSchema,
    onSubmit: onSubmit

  })
  const inputTypeData = [
    {
      inputname: "name",
      type: "text",
      id: "name",
      label: "Name",
      autoComplete: "name",
    },
    {
      inputname: "lastname",
      type: "text",
      id: "lastname",
      label: "Lastname",
      autoComplete: "lastname",
    },
    {
      inputname: "username",
      type: "text",
      id: "username",
      label: "Username",
      autoComplete: "username",
    },
    {
      inputname: "email",
      type: "email",
      id: "email",
      label: "Email",
      autoComplete: "email",
    },
    {
      inputname: "password",
      type: "password",
      id: "password",
      label: "Password",
      autoComplete: "password",
    },
    {
      inputname: "confirmpassword",
      type: "password",
      id: "confirmpassword",
      label: "Confirm Password",
      autoComplete: "confirmpassword",
    }
  ];

  return (
    <div >
      <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center", height: "calc(100vh - 100px)" }}>
        <Grid md={5}>
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
              Register
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
              {inputTypeData.map((input) => (
                <TextField
                  key={input.id}
                  margin="normal"
                  required
                  fullWidth
                  id={input.id}
                  label={input.label}
                  name={input.inputname}
                  autoComplete={input.autoComplete}
                  autoFocus={input.inputname === 'name'}
                  type={input.type}
                  value={formik.values[input.inputname]}
                  onChange={formik.handleChange}
                  error={formik.touched[input.inputname] && Boolean(formik.errors[input.inputname])}
                  helperText={formik.touched[input.inputname] && formik.errors[input.inputname]}
                />
              ))}
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
                  <Link to={'/login'} variant="body2" >
                    <Button

                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Register
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register