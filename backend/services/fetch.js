require('dotenv').config();
const fetch = require('node-fetch');

const BITQUERY_API_URL = 'https://graphql.bitquery.io/';

const WBNB_CONTRACT_ADDRESS = "";


// Run the function
fetchTopBNBHolders();