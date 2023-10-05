import React from "react";
import { useNavigate } from "react-router-dom";
import {ethers} from "ethers";
import { useState } from "react";
import { Button, Input } from "antd";
import { BulbOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function RecoverAccount({setSeedPhrase , setWallet}) {
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);

  function seedAdjust(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }

  function recoverWallet(){
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
    }catch(err){
      setNonValid(true);
      return;
    }

    setSeedPhrase(typedSeed);
    setWallet(recoveredWallet.address);
    navigate("/yourwallet");
    return;
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <BulbOutlined style={{ fontSize: "20px" }} />
          <div>
            Type your seed phrase in the field below to recover your wallet (it
            should include 12 words seperated with spaces)
          </div>
        </div>
        <TextArea
          value={typedSeed}
          onChange={seedAdjust}
          rows={4}
          className="seedPhraseContainer"
          placeholder="Type your seed phrase here..."
        />

       <Button
          style={{backgroundColor: "#21273a"  , color :'white'}}
          disabled={typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "}
          className="frontPageButton"
          type="primary"
          onClick={() => recoverWallet()}
        >
          Recover Wallet
        </Button>
        {nonValid && <p style={{color: "red"}}> Invalid Seed Phrase</p>}
        <p className="frontPageBottom" onClick={()=>navigate("/")}>Back Home</p>

      </div>
    </>
  );
}

export default RecoverAccount;
