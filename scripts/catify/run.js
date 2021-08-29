async function main() {
  const [aPerson, randoPerson, anotherRando] = await hre.ethers.getSigners();
  const catContractFactory = await hre.ethers.getContractFactory("Catify");
  const catContract = await catContractFactory.deploy();

  // waiting for transaction to be mined
  await catContract.deployed();
  console.log("contract deployed, yay! --", catContract.address)
  console.log("Contract deployed by:", aPerson.address);
  
  let bal = await catContract.balanceOf(randoPerson.address)
  console.log("[Before create] Random person token balance: ", bal.toNumber());

  let catTxn = await catContract.connect(randoPerson).createCollectible();
  await catTxn.wait()


  catTxn = await catContract.connect(randoPerson).createCollectible();
  await catTxn.wait()

  // sending from random person to another random person
  catTxn = await catContract.connect(randoPerson).transferFrom(randoPerson.address, anotherRando.address, 1);

  bal = await catContract.balanceOf(randoPerson.address)
  console.log("[After create] Random person token balance: ", bal.toNumber());
  bal = await catContract.balanceOf(anotherRando.address)
  console.log("[After create] Another random person token balance: ", bal.toNumber());
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.log('error', error)
  process.exit(1);
})