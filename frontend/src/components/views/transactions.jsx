import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import TransactionTable  from '../common/TransactionsTable';
import  TransactionsIntervalForm  from '../common/TransactionsIntervalForm';
import { BACKEND_API_URL } from '../../constants/constants';

const socket = io(BACKEND_API_URL);

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    socket.on("transactions", (data) => {
      console.log("Received transaction event:", data);
      setTransactions(data);
    });

    return () => {
      socket.off("transactions");
    };
  }, []);


  return (
    <div className="nyxCipher nyxBorderTop mx-5" id="toolkit">
        <div className="relative flex items-center justify-center">
       <TransactionsIntervalForm />
        </div>
          <TransactionTable transactions={transactions} />
    </div>
  );
}

