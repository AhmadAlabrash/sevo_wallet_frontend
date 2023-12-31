
import React, { useEffect, useState } from "react";
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../noImg.png"
import axios from "axios";
import { CHAINS_CONFIG } from "../chains";
import { ethers } from "ethers";




function WalletView({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain,
}) {

  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [amountToSend, setAmountToSend] = useState(null);
  const [sendToAddress, setSendToAddress] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState(null);

  const navigate = useNavigate();
  function logout(){
    setSeedPhrase(null);
    setNfts(null);
    setTokens(null);
    setBalance(0);
    setWallet(null);
    navigate("/");
  }
  const items = [{
    key :"3" ,
    label : "Tokens" ,
    children : (<>{tokens ? 
      
      (
      <>
      
        <List
          bordered
         
          itemLayout="horizontal"
          dataSource={tokens}
          renderItem={(item, index) => (
            <List.Item style={{ textAlign: "left" , color:'white'  }}>
              <List.Item.Meta
               
                avatar={<Avatar   src={item.logo || logo} />}
                title={<span style={{ color: "white" }}>{item.symbol}</span>}
                
                description={<span style={{ color: "white" }}>{item.name}</span>}
              />
              <div > 
                {(
                  Number(item.balance) /  10 ** Number(item.decimals)
                
                ).toFixed(2)}{" "}
                Tokens
              </div>
            </List.Item>
          )}
        />
     
      </>
    ) : (
      <>
        <span style={{color : 'white'}}>You seem to not have any tokens yet</span>
        <p  className="frontPageBottom">
        Buy tokens directly from sevo.fi
          <a href="https://sevofi.vercel.app/" target="_blank" rel="noreferrer">
          sevo.fi
      
          </a>
        </p>
      </>
    )}
  </>
),


  },
  {
    key :"2" ,
    label : "NFTs" ,
    children : (<>{ nfts ? (
      <>
        {nfts.map((e, i) => {
          return (
            <>
              {e && (
                <img
                  key={i}
                  className="nftImage"
                  alt="nftImage"
                  src={e}
                />
              )}
            </>
          );
        })}
      </>
    ) : (
      <>
        <span style={{color:'white'}}>You seem to not have any NFTs yet</span>
        <p className="frontPageBottom">
        Buy tokens directly from sevo.fi
          <a href="https://sevofi.vercel.app/" target="_blank" rel="noreferrer">
          sevo.fi
          </a>
        </p>
      </>
    )}
  </>
),}
,
  
  {
    key :"1" ,
    label : "Transfer" ,
    children : (      <>
      <h3 style={{color:'white'}}>Native Balance </h3>
      <h1 style={{color:'white'}}>
        {balance.toFixed(2)} {CHAINS_CONFIG[selectedChain].ticker}
      </h1>
      <div style={{color:'white'}} className="sendRow">
        <p style={{ width: "90px", textAlign: "left" }}> To:</p>
        <Input
          value={sendToAddress}
          onChange={(e) => setSendToAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <div style={{color:'white'}} className="sendRow">
        <p style={{ width: "90px", textAlign: "left" }}> Amount:</p>
        <Input
          value={amountToSend}
          onChange={(e) => setAmountToSend(e.target.value)}
          placeholder="Native tokens you wish to send..."
        />
      </div>
      <Button
           

        style={{ backgroundColor: "#21273a" ,width: "100%", marginTop: "20px", marginBottom: "20px" }}
        type="primary"
        onClick={() => sendTransaction(sendToAddress, amountToSend)}
      >
        Send Tokens
      </Button>
      {processing && (
        <>
          <Spin />
          {hash && (
            <Tooltip title={hash}>
              <p style={{color:'white'}}>Hover For Tx Hash</p>
            </Tooltip>
          )}
        </>
      )}
    </>
  ),
 },
];

  async function sendTransaction(to, amount) {

    const chain = CHAINS_CONFIG[selectedChain];

    const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

    const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
      to: to,
      value: ethers.parseEther(amount.toString()),
    };

    setProcessing(true);
    try{
      const transaction = await wallet.sendTransaction(tx);

      setHash(transaction.hash);
      const receipt = await transaction.wait();

      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);

      if (receipt.status === 1) {
        getAccountTokens();
        console.log("Transfer successed <3 :) ");
      } else {
        console.log("failed !");
      }


    }catch(err){
      setHash(null);
      setProcessing(false);
      setAmountToSend(null);
      setSendToAddress(null);
    }
  }

  async function getAccountTokens() {
    setFetching(true);

    const res = await axios.get(`https://sevowallet.onrender.com/getTokens`, {
      params: {
        userAddress: wallet,
        chain: selectedChain,
      },
    });

    const response = res.data;

    if (response.tokens.length > 0) {
      setTokens(response.tokens);
    }

    if (response.nfts.length > 0) {
      setNfts(response.nfts);
    }

    setBalance(response.balance);

    setFetching(false);
  }
  useEffect(() => {
    if (!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  }, []);
  useEffect(() => {
    if (!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  }, [selectedChain]);

 
  


  return (
    <>
      <div className="content">
       <div className="logoutButton" onClick={logout}>
        <LogoutOutlined/>

       </div>
       <div className="walletName">Wallet</div>
        <Tooltip title={wallet}>
          <div>
            {wallet.slice(0, 4)}...{wallet.slice(38)}
          </div>
        </Tooltip>
        <Divider />
        <Divider />

        {fetching ? (
          <Spin />
        ) : (
          <Tabs defaultActiveKey="1" items={items} className="walletView" />
        )}
      </div>
    </>
  );
}

export default WalletView;
