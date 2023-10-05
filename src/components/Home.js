import React from "react";
import mwallet from "../logo.png";
import { useState, useEffect } from 'react';
import { Button } from "antd";
import { Input, Popover, Radio, Modal, message } from "antd";



import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate() ;
  const [messageApi, contextHolder] = message.useMessage();


  return (
    <>
          {contextHolder}

      <div className="content">
      <img src={mwallet} className="frontPageLogo" alt="logo" />
      <h2>Hey There </h2>
      <h4 className="h4">Welcome To Your Web3 Wallet</h4>
      
      <Button style={{ backgroundColor: "#21273a" }} onClick={()=> navigate("/yourwallet")}
       className="frontPageButton" type="primary">Create A Wallet</Button>
      <Button onClick={()=> navigate("/recover")}
       className="frontPageButton" type="default">Sign in With Seed Pharse</Button>
      <p className="frontPageBottom">
          Buy tokens directly from sevo.fi
          <a href="https://sevofi.vercel.app/" target="_blank" rel="noreferrer">
          sevo.fi
          </a>
      </p>
      
      </div>
    </>
  );
}

export default Home;
