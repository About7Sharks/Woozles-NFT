const { utils } = require("ethers");

async function main() {
    const baseTokenURI = "ipfs://QmY7uBXnXNFqCoz7b3NWUak1j6XtJmEc8zCPVyd6MYxd8a/";

    // Get owner/deployer's wallet address
    const [owner] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("NFTCollectible");

    // Deploy contract with the correct constructor arguments
    const contract = await contractFactory.deploy(baseTokenURI);

    // Wait for this transaction to be mined
    await contract.deployed();

    // Get contract address
    console.log("Contract deployed to:", contract.address);

    // Reserve NFTs
    // let txn = await contract.reserveNFTs();
    // await txn.wait();
    console.log("1 NFT(s) have been reserved");

    // Mint 1 NFTs by sending 0.01 ether
    let txn = await contract.mintNFTs(1, { value: utils.parseEther('0.01') });
    await txn.wait()

    // Get all token IDs of the owner
    let tokens = await contract.tokensOfOwner(owner.address)
    console.log("Owner has tokens: ", tokens);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
