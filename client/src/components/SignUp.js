import React, { useState } from "react";
import { TextField, Button, Grid, Paper, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignUp = () => {
  const [inval, setInval] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const nav = useNavigate();

  const handelOnchange = (e) => {
    const { name, value } = e.target;
    setInval((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addData = async () => {
    

    let ch1 = false,
      ch2 = false;
    let res, data;
    const { name, email, mobile, password, cpassword } = inval;
    if (!name || !email || !mobile || !password || !cpassword) {
     
      toast.warn('field missing', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      ch1 = true;
    }
    if (password !== cpassword) {
     
      toast.warn('Conform Password Not Match', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      ch2 = true;
    }

    if (!ch1 && !ch2) {
      res = await fetch("api/resister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobile, password, cpassword }),
      })
    }

    data = await res.json();
    console.log(data);

    if (res.status >= 400 || !data) {
      toast.error('error in user resister', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } else {
      toast.success('New User Resister', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      nav("/signup");
    }
  };

  return (
    <>
      <div className="main_div">
        <div className="form_div">
          <Grid>
            <Paper
              sx={{
                padding: "30px 20px",
                backgroundColor: "#FAFDF8",
                width: 400,
                margin: "20px auto",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <Grid align="center">
                <Avatar></Avatar>
                <h2 style={{ margin: "10px" }}>Signup</h2>
              </Grid>
              <form method="POST" style={{ marginTop: "30px" }}>
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  onChange={handelOnchange}
                  value={inval.name}
                  name="name"
                  id="name"
                  label="Name"
                  placeholder="Enter your name"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  onChange={handelOnchange}
                  value={inval.email}
                  name="email"
                  id="email"
                  label="Email"
                  placeholder="Enter your Email"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  onChange={handelOnchange}
                  value={inval.mobile}
                  name="mobile"
                  id="mobile"
                  label="Mobile"
                  placeholder="Enter your mobile number"
                />
                <TextField
                  sx={{ mt: 2 }}
                  type="password"
                  fullWidth
                  onChange={handelOnchange}
                  value={inval.password}
                  name="password"
                  id="password"
                  label="Password"
                  placeholder="Enter your Password"
                />
                <TextField
                  sx={{ mt: 2 }}
                  type="password"
                  fullWidth
                  onChange={handelOnchange}
                  value={inval.cpassword}
                  name="cpassword"
                  id="cpassword"
                  label="Conform Password"
                  placeholder="Conform your Password"
                />
                <Button
                  type="submit"
                  onClick={addData}
                  sx={{ mt: 2 }}
                  variant="contained"
                >
                  Sign Up
                </Button>
              </form>
            </Paper>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SignUp;
