const abi =	[
{
"constant": false,
"inputs": [
	{
		"name": "_name",
		"type": "string"
	},
	{
		"name": "_starStory",
		"type": "string"
	},
	{
		"name": "_ra",
		"type": "string"
	},
	{
		"name": "_dec",
		"type": "string"
	},
	{
		"name": "_mag",
		"type": "string"
	},
	{
		"name": "_tokenId",
		"type": "uint256"
	}
],
"name": "createStar",
"outputs": [],
"payable": false,
"stateMutability": "nonpayable",
"type": "function"
},
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tokenIdToStarInfo",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "starStory",
          "type": "string"
        },
        {
          "name": "ra",
          "type": "string"
        },
        {
          "name": "dec",
          "type": "string"
        },
        {
          "name": "mag",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
 
]

