pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Catify.sol";

contract WavePortal {
  event NewWave(address indexed from, string message, uint timestamp);

  Catify catStorage;

  struct Wave {
    address waver;
    string message;
    uint timestamp;
  } 

  Wave[] public waves;

  constructor(address catAddr) {
    console.log("WavePortal initialized!");
    address CatNFTStorageAddress = catAddr;
    console.log("With cat address: ", catAddr);
    catStorage = Catify(CatNFTStorageAddress);
  }

  function wave(string memory message) public {
    require(catStorage.balanceOf(msg.sender) > 0, "You don't have a Cat! Go get one!");

    waves.push(Wave(msg.sender, message, block.timestamp));
    console.log("%s waved: %s", msg.sender, message);

    emit NewWave(msg.sender, message, block.timestamp);
  }

  function getTotalWaves() view public returns (uint) {
    console.log("we have %d total waves", waves.length);
    return waves.length;
  }

  function getWaves() view public returns(Wave[] memory) {
    return waves;
  }
}