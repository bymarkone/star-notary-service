pragma solidity ^0.4.23;

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

	function createStar(string _name, string _starStory, string _ra, string _dec, string _mag, uint256 _tokenId) public {
		Star memory newStar = Star(_name, _starStory, _ra, _dec, _mag);
		tokenIdToStarInfo[_tokenId] = newStar;
		ERC721Token.mint(_tokenId);
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

		if (msg.value > starCost) {
			msg.sender.transfer(msg.value - starCost);
		}

		starOwner.transfer(starCost);
	}

	function clearPreviousStarState(uint _tokenId) private {
		tokenToApproved[_tokenId] = address(0);

		starsForSale[_tokenId] = 0;
	}
}
