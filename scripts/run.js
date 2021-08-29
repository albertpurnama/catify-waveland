
const { ethers } = require("hardhat");

const catStorageAddress = "0x65Db0fD5B3Eefc0eD981Fde2c4465aCe9Ebea6C4"
async function main() {
  const [aPerson, randoPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy(catStorageAddress);

  // waiting for transaction to be mined
  await waveContract.deployed();
  console.log("contract deployed, yay! --", waveContract.address)
  console.log("Contract deployed by:", aPerson.address);

  // Add permissions to the randos
  const catContractFactory = await hre.ethers.getContractFactory("Catify");
  const catStorage = new ethers.Contract(catStorageAddress, catContractFactory.interface, randoPerson);

  await catStorage.connect(randoPerson).createCollectible();
  await catStorage.connect(randoPerson).createCollectible();
  

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log("initial waveCount: ", waveCount);

  let waveTxn = await waveContract.connect(randoPerson).wave("hello world from random person");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  console.log('Current total Count after first wave: ', waveCount.toNumber());

  waveTxn = await waveContract.connect(randoPerson).wave("hello world");
  await waveTxn.wait();
  const waves = await waveContract.getWaves();
  console.log(waves);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log('error', error)
    process.exit(1);
  })