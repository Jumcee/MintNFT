require('dotenv').config();
const ethers = require('ethers');

const { API_KEY, PRIVATE_KEY } = process.env;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x359451AC3C73827A7653C0Ab7D30243844a55447'

const Provider = new ethers.AlchemyProvider('sepolia', API_KEY)
const signer = new ethers.Wallet(PRIVATE_KEY, Provider)
const myNftContract = new ethers.Contract(contractAddress, abi, signer)



// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmbzZFujBL7xBiPY4PyzDNusN61oYX8e52mYES4HT93qxT"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/QmbzZFujBL7xBiPY4PyzDNusN61oYX8e52mYES4HT93qxT`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
