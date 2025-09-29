const { ethers } = require('ethers');

const privateKey = '0xdc16a1a6896917e7dd3566e1515590ddc9519716e4ad651758bba9103563bdbe';
const wallet = new ethers.Wallet(privateKey);

const publicKey = wallet.publicKey;
console.log('Private Ke:', privateKey);
console.log('Public Key:', wallet.signingKey.publicKey);

const address = wallet.address;
console.log('Address:', address);