import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import TransactionTable  from '../common/TransactionsTable';
import  TransactionsIntervalForm  from '../common/TransactionsIntervalForm';
import { BACKEND_API_URL } from '../../constants/constants';

const socket = io(BACKEND_API_URL);

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [countDown, setCountDown] = useState(0); 
  
    useEffect(() => {
      const timer = setInterval(() => {
        if (countDown > 0) {
          setCountDown(countDown - 1);
          console.log({ a: new Date() });
        }
      }, 1000);
      return () => clearInterval(timer);
    }, [countDown]);


  useEffect(() => {

    socket.on("transactions", (data) => {
      console.log("Received transaction event:", data);
      setTransactions(data);
    });

    socket.on("interval", (data) => {
      console.log("Received interval event:", data);
      setCountDown(data * 60);
    });


    return () => {
      socket.off("transactions");
      socket.off("interval");
    };
  }, []);



  useEffect(() => {
    setCountDown(countDown);
  }, [transactions]);


  return (
    <div className="nyxCipher nyxBorderTop mx-5" id="toolkit">
        <div className="relative flex items-center justify-center">
       <TransactionsIntervalForm countDown={countDown} />
        </div>
          <TransactionTable transactions={transactions} />
    </div>
  );
}

