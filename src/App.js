import "./App.css";
import {isValidElement} from "react";
import logo from "./logo.png";
import {Select} from  "antd" ;
import {Routes , Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import {Button, Modal} from "antd";

import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import RecoverAccount from "./components/RecoverAccount";
import WalletView from "./components/WalletView";
import POL from "./polygon-matic-logo.svg";
import ETH from "./eth.svg";
import BNB from "./bnb.svg";
import WRN from "./wrn.svg";
import ARB from "./arb.png";
import OPT from "./opt.svg";
import AVA from "./ava.svg";

function App() {
  const [selectedChain , setSelectedChain ] = useState('0x1');
  const [wallet , setWallet] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [seedPhrase , setSeedPhrase] = useState(null);

  const networkOptions = [
    { 'value': '0x1', 'label': 'Ethereum' , 'img':ETH},
    { 'value': '0x89', 'label': 'Polygon' ,'img':POL},
    { 'value': '0x38', 'label': 'Binance Chain' , 'img':BNB },
    { 'value': '0xa', 'label': 'OP Mainnet','img':OPT },
    { 'value': '0xa4b1', 'label': 'Arbitrum' , 'img':ARB},
    { 'value': '0xa86a', 'label': 'Avalanche' , 'img':AVA},
    { 'value': '0x13881', 'label': 'Mumbai' , 'img':POL},

  ];

 

  const modifyChain = async (index)=>{
    await setSelectedChain(networkOptions[index].value)
    await setIsOpen(false)
    
  }



  return (
    <div className="App" >
      <header style={{paddingRight : '10px'}}>
       <img src={logo} className="headerLogo" alt="logo"/>


{selectedChain === '0x89' ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={POL} alt="pol" className="eth" /> Polygon
    </div>
  ) : selectedChain === '0x1' ? (
    <div  className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={ETH} alt="ETH" className="eth" /> Ethereum
    </div>
  )  : selectedChain === '0xa86a' ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={AVA} alt="Avalanche" className="eth" /> Avalanche
    </div>
  ) : selectedChain === '0x38' ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={BNB} alt="bnb" className="eth" /> Binance Chain
    </div>
  )  : selectedChain === '0xa' ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={OPT} alt="Optimiusm" className="eth" /> OP Mainnet
    </div>
  )  : selectedChain === '0xa4b1' ? (
    <div className="headerItem" onClick={() => setIsOpen(true)}>
      <img src={ARB} alt="Arbitrum" className="eth"   /> Arbitrum
    </div>
  ) : (
    <div className="headerItem" onClick={() => setIsOpen(true)} >
      <img src={POL} alt="Mumbai network" className="eth" /> Mumbai
    </div>
  )} 
      </header>

      <Modal

    open={isOpen}
    footer={null}
    onCancel={() => setIsOpen(false)}
    title="Select a Chain"
  >
    <div className="modalContent">
      {networkOptions?.map((e, i) => {
        return (
          <div
            className="tokenChoice"
            key={i}
            onClick={() => modifyChain(i)}
          >
            <img src={e.img} alt={e.label} className="tokenLogo" />
            <div className="tokenChoiceNames">
              <div className="tokenName">{e.label}</div>
              
            </div>
          </div>
        );
      })}
    </div>
  </Modal>
      {wallet && seedPhrase ? 
        (
          <Routes>
            <Route path="/yourwallet" element={<WalletView 
            wallet={wallet}
            setWallet={setWallet}
            seedPhrase={seedPhrase}
            setSeedPhrase={setSeedPhrase}
            selectedChain={selectedChain}
            />}/>
          </Routes>
        )
      :
      (
       <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/recover" element={<RecoverAccount
        setSeedPhrase={setSeedPhrase}
        setWallet={setWallet}
        />}
        />
        <Route 
         path="/yourwallet" 
         element={<CreateAccount 
         setSeedPhrase={setSeedPhrase}
         setWallet={setWallet}/>}/>
       </Routes>
      )
      }
      
    </div>
  );
}

export default App;
