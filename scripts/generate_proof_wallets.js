const StellarSdk = require('@stellar/stellar-sdk');
const axios = require('axios');

async function generateWallets() {
  const wallets = [];
  console.log("Generating 30 wallets...");
  
  for (let i = 0; i < 30; i++) {
    const pair = StellarSdk.Keypair.random();
    const publicKey = pair.publicKey();
    
    try {
      // Fund via Friendbot to make it verifiable on Explorer
      await axios.get(`https://friendbot.stellar.org/?addr=${publicKey}`);
      wallets.push(publicKey);
      console.log(`[${i+1}/30] Funded: ${publicKey}`);
    } catch (e) {
      console.error(`Failed to fund ${publicKey}: ${e.message}`);
    }
    
    // Wait a bit to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log("\n--- COMPLETE LIST OF 30 WALLETS ---");
  console.log(JSON.stringify(wallets, null, 2));
}

generateWallets();
