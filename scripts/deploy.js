const catStorageAddress = "0x65Db0fD5B3Eefc0eD981Fde2c4465aCe9Ebea6C4"

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:" , deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const token = await waveContractFactory.deploy(catStorageAddress);

  console.log("WavePortal address:", token.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log('error', error)
    process.exit(1);
  })