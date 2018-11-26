console.log('LOADING JS')

const contractAddress = '0x5189231b02b5eb6cd2187f0578c5cc75ade15f49'
const host = 'https://rinkeby.infura.io/v3/fe2e30a2a6ea47b38d6ea1314ec8fddb'

if(typeof web3 != 'undefined') { 
		web3 = new Web3(web3.currentProvider) // what Metamask injected 
} else {
		web3 = new Web3(new Web3.providers.HttpProvider(host))
}

var StarNotary = web3.eth.contract(abi);
var starNotary = StarNotary.at(contractAddress);
web3.eth.defaultAccount = web3.eth.accounts[0];

console.log('ACCOUNT', web3.eth.defaultAccount)

// Enable claim button being clicked
function claimButtonClicked() {
		const id = parseInt((Math.random() * 100), 10)
		console.log("STAR ID", id)

		let account = web3.eth.defaultAccount;
		let starName = document.getElementById("star-name-input").value;
		let starDec = document.getElementById("star-dec-input").value;
		let starMag = document.getElementById("star-mag-input").value;
		let starCent = document.getElementById("star-cent-input").value;
		let starStory = document.getElementById("star-story-input").value;

		starNotary.createStar(starName, starDec, starMag, starCent, starStory, id,
			{ from: account, gas: 4000000 }, 
			function(error, result) {
				if (!error) {
						document.getElementById('output').innerText = result;
				} else {
						console.log(error);
						return;
				}
		});
}

function starButtonClicked() {
	const starId = document.getElementById('star-id-input').value
	let account = web3.eth.defaultAccount;
	starNotary.tokenIdToStarInfo(starId, {from: account, gas: 4000000},
		function(error, result) {
				if (!error) {
						document.getElementById('retrive-output').innerText = result;
				} else {
						console.log(error);
						return;
				}
		});
}
