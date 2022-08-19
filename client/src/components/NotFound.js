import React from "react";
import {Link} from "react-router-dom"
import { Button } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <div className="main_div_404">
        <div className="Content_404">
          <h1>Page Not Found 404</h1>
          <div style={{display: "flex", justifyContent: "center",marginTop: '10px'}} >

          <Link to='/' style={{textDecoration: "none"}} > 
          <Button color="success" variant="contained" size="large">
          Go To Home
        </Button>
           </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
