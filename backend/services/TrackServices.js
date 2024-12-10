const axios = require("axios");
const { CronJob } = require("cron");
const { BITQUERY_API_KEY, TOP_BSC_WHALE_ACCOUNTS_IN_DESC_ORDER, BITQUERY_API_URL } = require("../config/key");


exports.transactionsFromBiggestWhales = async () => {
  console.log("p")

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
          Hash
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

    const transactions = response.data.data.EVM.Transactions;

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error.response?.data || error.message);
  }

}


exports.transactionsToBiggestWhales = async () => {

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
          Hash
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

    const transactions = response.data.data.EVM.Transactions;

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error.response?.data || error.message);
  }

}


exports.trackBiggestWhales = async () => {

  try {
    const [transactionsFromBiggestWhales, transactionsToBiggestWhales] = await Promise.all[
      TrackServices.transactionsFromBiggestWhales(),
      TrackServices.transactionsToBiggestWhales()
    ]
    const allWhaleTransactions = {
      ...transactionsFromBiggestWhales,
      ...transactionsToBiggestWhales
    };
    return allWhaleTransactions

  } catch (error) {
    console.error("Error fetching transactions:", error.response?.data || error.message);
  }
}


