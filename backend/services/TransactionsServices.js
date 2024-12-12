const axios = require("axios");
const { BITQUERY_API_KEY, TOP_BSC_WHALE_ACCOUNTS_IN_DESC_ORDER, BITQUERY_API_URL } = require("../config/key");
const { setCronJob } = require("../utils/set-cron-job");
const { emit } = require("../utils/socket-gate");
const { changeMinToCronTime } = require('./../utils/changeMinToCronTime');

const getTransactionsFromBiggestWhales = async () => {
  console.log("getTransactionsFromBiggestWhales:: fetching transactions")
  const query = `
  query ($addresses: [String!]) {
    EVM(network: bsc) {
      Transactions(
        where: {
          Transaction: {
            From: {
              in: $addresses
            }
          }
        }
      ) {
         Transaction {
          To
          From
          Value
          Hash
        }
        Block {
          Number
        }
    }
  }
`;

  try {
    const response = await axios.post(
      BITQUERY_API_URL,
      {
        query,
        variables: { addresses: TOP_BSC_WHALE_ACCOUNTS_IN_DESC_ORDER }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": BITQUERY_API_KEY
        }
      }
    );


    const transactions = response.data.data?.EVM?.Transactions;

    if (!transactions) {
      console.log("getTransactionsFromBiggestWhales:: No transactions found")
      return [];
    }

    return transactions;
  } catch (error) {
    console.error("getTransactionsFromBiggestWhales::Error fetching transactions:", error.response?.data || error.message);
    return [];
  }

}


const getTransactionsToBiggestWhales = async () => {
  console.log("getTransactionsToBiggestWhales:: fetching transactions")
  const query = `
  query ($addresses: [String!]) {
    EVM(network: bsc) {
      Transactions(
        where: {
          Transaction: {
            To: {
              in: $addresses
            }
          }
        }
      ) {
        Transaction {
          To
          From
          Value
          Hash
        }
        Block {
          Number
        }
      }
    }
  }
`;

  try {
    const response = await axios.post(
      BITQUERY_API_URL,
      {
        query,
        variables: { addresses: TOP_BSC_WHALE_ACCOUNTS_IN_DESC_ORDER }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": BITQUERY_API_KEY
        }
      }
    );

    const transactions = response.data.data?.EVM?.Transactions;

    if (!transactions) {
      console.log("getTransactionsToBiggestWhales:: No transactions found")
      return [];
    }

    return transactions;
  } catch (error) {
    console.error("getTransactionsToBiggestWhales::Error fetching transactions:", error.response?.data || error.message);
    return [];
  }
}


const getBiggestWhalesTrasanctions = async () => {
  try {
    console.log("getBiggestWhalesTrasanctions:: fetching transactions")
    const [transactionsFromBiggestWhales, transactionsToBiggestWhales] = await Promise.all([
      getTransactionsFromBiggestWhales(),
      getTransactionsToBiggestWhales()
    ])

    const allWhaleTransactions = [
      ...transactionsFromBiggestWhales,
      ...transactionsToBiggestWhales
    ].map(transaction => {
      return {
        sender: transaction.Transaction.From,
        to: transaction.Transaction.To,
        amount: transaction.Transaction.Value,
        hash: transaction.Transaction.Hash,
        blockHeight: transaction.Block.Number
      }
    });

    return allWhaleTransactions

  } catch (error) {
    console.error("getBiggestWhalesTrasanctions:: Error fetching transactions:", error.response?.data || error.message);
  }
}

const emitWhaleTransactions = async (time) => {

  emit({
    eventName: "interval",
    payload: time
  });

  const transactions = await getBiggestWhalesTrasanctions();

  if (transactions.length > 0) {
    console.log("getBiggestWhalesTrasanctions:: transactions fetched successfully");
  }

  emit({
    eventName: "transactions",
    payload: transactions
  });
}

exports.setBiggestWhalesTransactionsCronJob = async (time = '1') => {
  emitWhaleTransactions(time);

  const cronTime = changeMinToCronTime(time);
  setCronJob(cronTime, () => {
    emitWhaleTransactions(time);
  });

}
