const Ethereum = {
    hex: '0x1',
    name: 'Ethereum',
    rpcUrl: '',
    ticker: "ETH"
};
const Binance = {
    hex: '0x38',
    name: 'Binance',
    rpcUrl: '',
    ticker: "BNB"
};
const Polygon = {
    hex: '0x89',
    name: 'Polygon',
    rpcUrl: '',
    ticker: "MATIC"
};
const Arbitrum = {
    hex: '0xa4b1',
    name: 'Arbitrum',
    rpcUrl: '',
    ticker: "ETH"
};
const Optimusim = {
    hex: '0xa',
    name: 'Optimisum',
    rpcUrl: '',
    ticker: "ETH"
};
const Avalanche = {
    hex: '0xa86a',
    name: 'Avalanche',
    rpcUrl: '',
    ticker: "AVAX"
};

const MumbaiTestnet = {
    hex: '0x13881',
    name: 'Mumbai Testnet',
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/bS_v7YM67zplwK1cS1oqnFXaE6Qwl799',
    ticker: "MATIC"
};

export const CHAINS_CONFIG = {
    "0x1": Ethereum,
    "0x89" : Polygon ,
    "0x38" : Binance ,
    "0xa" : Optimusim ,
    "0xa4b1" : Arbitrum ,
    "0xa86a" : Avalanche ,
    "0x13881": MumbaiTestnet,

};

