import React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import useInput from "../../hooks/use-input";
import { nameValidate } from "../../utils/inputValidate";

const SignUp = () => {
  const {
    value: firstName,
    valueIsValid: firstNameIsValid,
    valueHasError: firstNameHasError,
    onChangeHandler: firstNameOnChangeHandler,
    onBlurHandler: firstNameOnBlurHandler,
    resetValue: firstNameReset
  } = useInput(nameValidate);
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={6}>
        <img
          src="/hcmus2.jpg"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt="brand"
        />
      </Grid>
      <Grid item xs={12} sm={6} spacing={2}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container justifyContent="center">
            <img src="/Elearning.png" width="75%" alt="logo" />
          </Grid>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ m: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I agree with HCMUS's policy."
                />
              </Grid>
              <Grid
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  flexWrap: "nowrap",
                  justifyContent: "center",
                  "& > :not(style)": { m: 2 },
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      maxHeight: 80,
                      borderRadius: 4,
                      height: 50,
                      fontSize: 20,
                      textTransform: "none",
                      width: 200,
                    }}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                      Forgot password?
                    </Link> */}
                  </Grid>
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>

                <Divider>
                  <Typography
                    gutterBottom
                    variant="h7"
                    component="div"
                    sx={{ opacity: 0.7, fontWeight: 400, marginBottom: "-7px" }}
                  >
                    Or With
                  </Typography>
                </Divider>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    "& > :not(style)": { m: 2 },
                  }}
                >
                  <Grid item>
                    <Link href="#" variant="body2">
                      <img src="/google.png" height="50px" />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      <img src="/facebook.png" height="50px" />
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
