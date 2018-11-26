const HDWalletProvider = require('truffle-hdwallet-provider')
const json = require('./build/contracts/StarNotary.json')
const Web3 = require('web3')
const mnemonic = 'plate cancel general file clinic buzz garbage hub empty thought recycle grit'
const host = 'https://rinkeby.infura.io/v3/fe2e30a2a6ea47b38d6ea1314ec8fddb'
const provider = new HDWalletProvider(mnemonic, host)
const web3 = new Web3(provider)

const address = '0xffD2B1a93eE09B3b9AB9DAAc17fE0F97205f53a6' 
const contractAddress = '0x5189231b02b5eb6cd2187f0578c5cc75ade15f49'

const contract = new web3.eth.Contract(json.abi, contractAddress, { from: address })

const id = parseInt((Math.random() * 100), 10)
console.log("ID OF STAR: ", id)

const starPrice = web3.utils.toWei('.01', 'ether')

contract.methods.createStar('Star power 103!', 'I love my wonderful star', 'ra_2', 'dec_1', 'mag_2', id)
	.send({from: address, gas: 4000000, gasPrice: 10000000000})
	.on('transactionHash', (hash) => console.log("HASH", hash))
	.on('receipt', (hash) => console.log("RECEIPT", hash))
	.on('error', console.log)

//contract.methods.putStarUpForSale(19, starPrice)
//	.send({from: address, gas: 4000000, gasPrice: 10000000000})
//	.on('transactionHash', (hash) => console.log("HASH", hash))
//	.on('receipt', (hash) => console.log("RECEIPT", hash))
//	.on('error', console.log)


