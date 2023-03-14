const { ethers } = require("ethers");
const axios = require('axios');
const { mnemonic, ETHEREUM_RPC, FxERC20RootTunnel, ERC20RootAbi, RootERC20, ERC20Abi, MATIC_RPC, FxERC20ChildTunnel, ERC20ChildAbi, ChildERC20, TestnetApi, EventSignature } = require('./secrets.json');

const accountIndex = 0;

const RootProvider = new ethers.providers.JsonRpcProvider(`${ETHEREUM_RPC}`);
const childProvider = new ethers.providers.JsonRpcProvider(`${MATIC_RPC}`);

const wallet = new ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${accountIndex}`);
const signer = wallet.connect(RootProvider);
const signer2 = wallet.connect(childProvider);

const RootTunnel = new ethers.Contract(FxERC20RootTunnel, ERC20RootAbi, RootProvider);
const RootTunnelWithSigner = RootTunnel.connect(signer);

const rootToken = new ethers.Contract(RootERC20, ERC20Abi, RootProvider);
const rootTokenWithSigner = rootToken.connect(signer);

const ChildTunnel = new ethers.Contract(FxERC20ChildTunnel, ERC20ChildAbi, childProvider);
const ChildTunnelWithSigner = ChildTunnel.connect(signer2);

async function DepositERC20(_amount) {
    const amount = (_amount * 1000000000000000000).toString(); // 18 decimals
    const result = await rootTokenWithSigner.approve(FxERC20RootTunnel, amount)
    await result.wait()

    const tx = await RootTunnelWithSigner.deposit(RootERC20, signer.address, amount, '0x')

    const confirmedTx = await tx.wait()
    console.log(confirmedTx.transactionHash)
}
//DepositERC20(1);

async function WithdrawERC20ChildChain(_amount){
    const amount = (_amount * 1000000000000000000).toString(); // 18 decimals
    const tx = await ChildTunnelWithSigner.withdraw(ChildERC20, amount)

    const confirmedTx = await tx.wait()
    console.log(confirmedTx.transactionHash)
}
// WithdrawERC20ChildChain(1);

async function GeneratePayload(txHash){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    path = `${TestnetApi}${txHash}${EventSignature}`
    try {
        const response = await axios.get(path);
        //console.log(response.data.result);
        return (response.data.result)
      } catch (error) {
        console.error(error);
      }
}
// GeneratePayload('0x3f2c4b1f26f092513a95c3ef26537b799b454368e9f57cd376808a8909b88f7a')


async function WithdrawERC20RootChain(txHash){
    let payload = GeneratePayload(txHash)
    const tx = await RootTunnelWithSigner.receiveMessage(payload)

    const confirmedTx = await tx.wait()
    console.log(confirmedTx.transactionHash)
}
// WithdrawERC20RootChain('0x3f2c4b1f26f092513a95c3ef26537b799b454368e9f57cd376808a8909b88f7a');