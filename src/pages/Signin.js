import React from "react";
import { Button, TextField, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebase/firebase.utils";
import { Formik } from "formik";
import * as Yup from "yup";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required!!"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const stylesFunc = makeStyles({
  wrapper: {
    marginTop: "10rem",
  },
});

const initialValues = {
  email: "",
  password: "",
};

function Signin() {
  const signinStyles = stylesFunc();

  const handleGoogleButtonClick = () => {
    firebase.useGoogleProvider();
  };

  const handleFormSubmit = (values) => {
    // alert(JSON.stringify(values, null, 2));
    firebase.signIn(values.email, values.password);
  };

  return (
    <Container className={signinStyles.wrapper} maxWidth="sm">
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={signInValidationSchema}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  required
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && errors.password}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleGoogleButtonClick}
                >
                  Sign In with Google
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default Signin;
