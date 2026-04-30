const LOG_LEVELS = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug'
};

const formatMessage = (level, message, data = {}) => {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data
  });
};

export const logger = {
  info: (message, data) => console.log(formatMessage(LOG_LEVELS.INFO, message, data)),
  warn: (message, data) => console.warn(formatMessage(LOG_LEVELS.WARN, message, data)),
  error: (message, data) => console.error(formatMessage(LOG_LEVELS.ERROR, message, data)),
  debug: (message, data) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(formatMessage(LOG_LEVELS.DEBUG, message, data));
    }
  },
  
  // Specific logger for transactions
  transaction: (txHash, wallet, amount, status, metadata = {}) => {
    const logData = {
      txHash,
      wallet,
      amount,
      status,
      ...metadata
    };
    console.log(formatMessage(LOG_LEVELS.INFO, `Stellar Transaction: ${status}`, logData));
  }
};
