import * as StellarSdk from '@stellar/stellar-sdk';

const NETWORK = StellarSdk.Networks.TESTNET;
const HORIZON_URL = 'https://horizon-testnet.stellar.org';

export const server = new StellarSdk.Horizon.Server(HORIZON_URL);

export const generateKeypair = () => {
  return StellarSdk.Keypair.random();
};

const accountCache = new Map();
const CACHE_TTL = 30 * 1000; // 30 seconds

export const getAccount = async (publicKey) => {
  const cached = accountCache.get(publicKey);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
    return cached.data;
  }

  try {
    const account = await server.loadAccount(publicKey);
    accountCache.set(publicKey, { data: account, timestamp: Date.now() });
    return account;
  } catch (error) {
    console.error('Error loading account:', error);
    throw error;
  }
};


export const fundAccount = async (publicKey) => {
  try {
    const response = await fetch(`https://friendbot.stellar.org/?addr=${publicKey}`);
    return await response.json();
  } catch (error) {
    console.error('Error funding account:', error);
    throw error;
  }
};

import { logger } from './logger';
import { buildSponsoredTransaction } from './stellar-sponsor';

export const registerDocument = async (secretKey, hash, metadata = {}) => {
  const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
  const sponsorSecret = process.env.SPONSOR_SECRET_KEY;
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const account = await getAccount(sourceKeypair.publicKey());

      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK,
      })
        .addOperation(
          StellarSdk.Operation.manageData({
            name: 'TrustLand_Doc_Hash',
            value: hash,
          })
        );

      Object.entries(metadata).forEach(([key, value]) => {
        if (value) {
          transaction.addOperation(
            StellarSdk.Operation.manageData({
              name: `TL_${key.substring(0, 12)}`,
              value: value.toString(),
            })
          );
        }
      });

      const innerTx = transaction.setTimeout(30).build();
      innerTx.sign(sourceKeypair);

      let finalTx = innerTx;
      let isSponsored = false;

      if (sponsorSecret) {
        try {
          finalTx = await buildSponsoredTransaction(innerTx, sponsorSecret);
          isSponsored = true;
          logger.info('Transaction successfully wrapped in Fee Bump', { hash });
        } catch (sponError) {
          logger.warn('Sponsorship failed, falling back to user fee', { error: sponError.message });
        }
      }

      const result = await server.submitTransaction(finalTx);
      
      logger.transaction(result.hash, sourceKeypair.publicKey(), 0, 'success', { ...metadata, isSponsored });
      return result;
    } catch (error) {
      attempt++;
      logger.warn(`Transaction attempt ${attempt} failed:`, { error: error.message, hash });
      
      if (attempt === maxRetries) {
        logger.error(`Transaction failed after ${maxRetries} attempts`, { error: error.message, hash });
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
};


