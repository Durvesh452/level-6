import * as StellarSdk from '@stellar/stellar-sdk';
import { server } from './stellar';
import { logger } from './logger';

const NETWORK = StellarSdk.Networks.TESTNET;

export const buildSponsoredTransaction = async (innerTx, sponsorSecret) => {
  try {
    const sponsorKeypair = StellarSdk.Keypair.fromSecret(sponsorSecret);
    
    // Build Fee Bump Transaction
    const feeBumpTx = StellarSdk.TransactionBuilder.buildFeeBumpTransaction(
      sponsorKeypair,
      StellarSdk.BASE_FEE * 10, // Sponsored fee (adjust as needed)
      innerTx,
      NETWORK
    );

    feeBumpTx.sign(sponsorKeypair);
    return feeBumpTx;
  } catch (error) {
    logger.error('Error building sponsored transaction:', error);
    throw error;
  }
};

export const submitSponsoredTransaction = async (feeBumpTx) => {
  try {
    const result = await server.submitTransaction(feeBumpTx);
    logger.info('Sponsored transaction submitted successfully', { txHash: result.hash });
    return result;
  } catch (error) {
    logger.error('Error submitting sponsored transaction:', error);
    throw error;
  }
};
