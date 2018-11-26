pragma solidity ^0.4.24;

import './ERC721Token.sol';

contract StarNotary is ERC721Token {
	
	struct Star {
		string name;
		string starStory;
		string ra;
		string dec;
		string mag;
	}
	
	mapping(uint256 => Star) public tokenIdToStarInfo;
	mapping(uint256 => uint256) public starsForSale;
	mapping(bytes32 => bool) public existingStars;

	function createStar(string memory _name, string memory _starStory, string memory _ra, string memory _dec, string memory _mag, uint256 _tokenId) public {
		bytes32 starIdentity = keccak256(abi.encodePacked(_ra, _dec, _mag));
		require(!checkIfStarExist(starIdentity));

		existingStars[starIdentity] = true;

		Star memory newStar = Star(_name, _starStory, _ra, _dec, _mag);
		tokenIdToStarInfo[_tokenId] = newStar;
		ERC721Token.mint(_tokenId);
	}

	function checkIfStarExist(bytes32 starIdentity) public view returns(bool){
		return !!existingStars[starIdentity];
	}

	function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
		require(this.ownerOf(_tokenId) == msg.sender);
		starsForSale[_tokenId] = _price;
	}

	function buyStar(uint256 _tokenId) public payable {
		require(starsForSale[_tokenId] > 0);

		uint256 starCost = starsForSale[_tokenId];
		address starOwner = this.ownerOf(_tokenId);
		require(msg.value >= starCost);

		clearPreviousStarState(_tokenId);

		transferFromHelper(starOwner, msg.sender, _tokenId);

		if(msg.value > starCost) { 
				msg.sender.transfer(msg.value - starCost);
		}

		starOwner.transfer(starCost);
	}
	function clearPreviousStarState(uint256 _tokenId) private {
			//clear approvals
			tokenToApproved[_tokenId] = address(0);

			//clear being on sale
			starsForSale[_tokenId] = 0;
	}
}
