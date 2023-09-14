import React from "react";
import mwallet from "../logo.png";
import { Button } from "antd";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate() ;

  return (
    <>
      <div className="content">
      <img src={mwallet} className="frontPageLogo" alt="logo" />
      <h2>Hey There </h2>
      <h4 className="h4">Welcome To Your Web3 Wallet</h4>
      
      <Button style={{ backgroundColor: "#582b5c" }} onClick={()=> navigate("/yourwallet")}
       className="frontPageButton" type="primary">Create A Wallet</Button>
      <Button onClick={()=> navigate("/recover")}
       className="frontPageButton" type="default">Sign in With Seed Pharse</Button>
      <p className="frontPageBottom">
          Buy tokens directly from moonpay
          <a href="https://moonpay.com/" target="_blank" rel="noreferrer">
            moonpay
          </a>
      </p>
      
      </div>
    </>
  );
}

export default Home;
