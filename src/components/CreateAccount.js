import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {ethers} from "ethers";
import { useState } from "react";

function CreateAccount( {setSeedPhrase , setWallet}) {
  const navigate = useNavigate() ;
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
 
  function generateSeed(){
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase ;
    setNewSeedPhrase(mnemonic);
  }

  function storeSeedandWallet() {
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address)

  }

  return (
    <>
      <div className="content">
      <div className="mnemonic">
        <ExclamationCircleOutlined style={{frontSize:"20px"}}/>
        <div>
         Once you generate the seed phrase, save it securely in order to
         recover your wallet in the future.
        </div>
      </div>
      <Button 
      style={{ backgroundColor: "#582b5c" }}
       onClick={()=> generateSeed( )}
       className="frontPageButton" type="primary">Generate Seed Phrase</Button>
      <Card className="seedPhraseContainer">
        {newSeedPhrase && <pre style={{whiteSpace: "pre-wrap"}}>{newSeedPhrase}</pre>}
      </Card>
      <Button 
       onClick={()=> storeSeedandWallet()}
       className="frontPageButton" type="default">Open Your Wallet</Button>
      
      <p className="frontPageBottom" onClick={()=>navigate("/")}>Back Home</p>

      </div>

    </>
  );
}

export default CreateAccount;
