import { Avatar, Grid, Paper, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
//import Cookies from 'universal-cookie';





const Login = () => {

    const [loginval, setLoginval] = useState({
        email: "",
        password: ""
    })
    
    const navi = useNavigate()

    const fildSpace = {
        mt:2
    }
    const onLogin = async (e)=>{
        e.preventDefault()
        let data, res;
        const {email, password} = loginval;
        if(!email || !password){
            alert("field missing")
        }else{
            res = await fetch("api/signin",{
                method: "POST",
                //credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email, password }),
            })

        }
        data = await res.json()
        const {message,token} = data
        console.log(token);
        if(res.status >= 400 || !data){
            alert("error in login")
        } else{
            alert("Login success")
            // const cookies = new Cookies()
            // cookies.set('auth',token,{path: "/"})
            
            // localStorage.setItem("token",token)
            // window.location = "/"
            //console.log(cookies.get('auth'));
            sessionStorage.setItem("token",token)
            navi("/reset")
        }
    }

    const inChange =(e)=>{
        const {name, value} = e.target;
        setLoginval((preval)=>{
            return{
                ...preval,
                [name]: value,
            }
        })
    }



  return (
    <>
        <div className="main_div">
            <div className="form_div">
                <Grid>
                    <Paper sx={{padding: "30px 20px", backgroundColor:"#FAFDF8" , width: 400, margin: "60px auto"}}>
                        <Grid align='center' >
                            <Avatar>

                            </Avatar>
                            <h2 style={{marginTop:"15px"}} >Log In</h2>
                        </Grid>
                        <form  style={{marginTop:"15px",marginBottom:"15px"}} method="POST" >
                            <TextField sx={fildSpace} fullWidth  name='email' onChange={inChange} value={loginval.email} label='Email' placeholder='Enter your email' />
                            <TextField sx={fildSpace} fullWidth type='password'  name='password' onChange={inChange} value={loginval.password} label='Password' placeholder='Enter your password' />
                            
                            <Button sx={fildSpace} onClick={onLogin} type='submit' fullWidth variant="contained">Log In</Button>
                            
                        </form>
                    </Paper>
                </Grid>
            </div>
        </div>
    </>
  )
}

export default Login