# FxBridge
Implementation of Polygon bridge from ethereum to polygon and back using the fx portal contracts and ethers.


## Introduction
This repository is to the bridge using fxportal contracts provided by polygon.

inintialise the repo by running 

> **npm install**

it will install all the necessary deps in order to complete the actions.

edit **secret.json** for 

"mnemonic": "your seed phrase" // Add your mnemonics.

"RootERC20": "0xE579cf85D796e11802B61aF31A3465424f76E6d0" // Add your custom erc20 token.
"ChildERC20": "0xbcBd066f2810E541d289c868F72bF4A18507CfeB" // Map your token using [this link](https://mapper.polygon.technology/map) for testnet and update child erc20 address here

or Create a new github issue with your ethereum address in it i will send these tokens to you. you can create an issue [here](https://github.com/iamrahulchauhan/FxBridge/issues)

"MATIC_RPC": "https://rpc-mumbai.maticvigil.com/v1/yourprivatekey", // Register for free on maticvigil and update your private key here.
"ETHEREUM_RPC": "https://goerli.infura.io/v3/yourprivatekey", // Add your infura private key here.

