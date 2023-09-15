import "./App.css";
import {isValidElement, useState} from "react";
import logo from "./logo.png";
import {Select} from  "antd" ;
import {Routes , Route } from "react-router-dom";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import RecoverAccount from "./components/RecoverAccount";
import WalletView from "./components/WalletView";

function App() {
  const [selectedChain , setSelectedChain ] = useState("0x1");
  const [wallet , setWallet] = useState(null);
  const [seedPhrase , setSeedPhrase] = useState(null);

  return (
    <div className="App" style={{ backgroundColor: "#e4ace3" }}>
      <header>
       <img src={logo} className="headerLogo" alt="logo"/>
       <Select
          
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1",
            },
            {
              label: "Mumbai Testnet",
              value: "0x13881",
            },

          ]}
          className="dropdown"
          styles={{
            control: () => ({
              backgroundColor: "#e4ace3", // Set the background color to black
            }) }}
        ></Select>
      </header>
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
