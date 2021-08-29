async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:" , deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const waveContractFactory = await hre.ethers.getContractFactory("Catify");
  const token = await waveContractFactory.deploy(100);

  console.log("Catify address:", token.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log('error', error)
    process.exit(1);
  })