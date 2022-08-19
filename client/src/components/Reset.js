import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const data = sessionStorage.getItem("token");
  console.log("data from client rest");
  console.log(data);
  const navi = useNavigate();
  
  useEffect(() => {
    // authGetData();
   
      // alert("u are un authorise");
       authGetData();
     return ()=>{
      console.log("out");
     }
    
  },[]);

  const authGetData = async () => {
    if(!data){
      navi("/signin")
    }else{
      try {
      
        const res = await fetch(`api/about/`, {
          method: "GET",
          //credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${data}`
          },
          mode:"cors"
        });
        const resData = await res.json();
        // console.log(resData);
        setUser(resData);
      } catch (error) {
        // alert("error in page auth");
        navi("/signin");
      }
    }
   
  };

  const logOut = ()=>{
    sessionStorage.clear();
    navi("/")
  }



  return (
    <>
      <div className="main_div">
        <div>
          <h1 style={{textAlign: "center", marginTop: "15px", color:"#396916" }} > {user.name} </h1>
          <h1 style={{textAlign: "center", marginTop: "15px", color:"#396916" }} > {user.email} </h1>
          <div style={{textAlign: "center", marginTop: "15px" }} >
        <Button onClick={logOut} color="success" variant="contained">Log Out</Button>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default Reset;
