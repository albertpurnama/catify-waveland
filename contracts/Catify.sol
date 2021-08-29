pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Catify is ERC721URIStorage {
  uint256 tokenCounter;
  uint256 stock;

  constructor(uint256 s) ERC721 ("Catillery", "CAT") {
    tokenCounter = 0;
    stock = s;
  }

  function createCollectible() public returns(uint256) {
    // check whether stock is available
    require(stock > 0, "Too late! Cats are gone!");
    
    uint256 newItemId = tokenCounter;
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, "https://placekitten.com/200/200");
    tokenCounter += 1;
    stock -= 1;

    return newItemId;
  }
} 