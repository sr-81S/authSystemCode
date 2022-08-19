import React from 'react'
import imgSign from "../images/signup.svg";
import { Button } from '@mui/material';

const Home = () => {
  return (
   <>
        <div className="main_div">
            <div className="hero_div grid grid-two-col">
                <div  className=" left_div">
                    <div style={{textAlign:'center'}} className="headline">
                        <h1>Welcome to shild </h1>
                        <p>find the web solution</p>
                        <Button sx={{mt:3}} size="large" variant="outlined">Outlined</Button>
                    </div>
                </div>
                <div className="right_div">
                    <img src={imgSign}  className='item_center' style={{height:'35rem'}} alt="" />
                </div>
            </div>
        </div>
   </>
  )
}

export default Home