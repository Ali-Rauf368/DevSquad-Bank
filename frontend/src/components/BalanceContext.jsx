import React, { createContext, useState } from 'react';

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const deposit = (amount) => {
    setTotalAmount((prevAmount) => prevAmount + amount);
  };

  const withdraw = (amount) => {
    setTotalAmount((prevAmount) => prevAmount - amount);
  };

  const addTransaction = (transaction) => {
    const transactionWithTimestamp = {
      ...transaction,
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      }),
    };

    setTransactions((prevTransactions) => [...prevTransactions, transactionWithTimestamp]);
  };

 
  const makeOnlinePayment = (amount, description, category) => {
    if (amount > 0) {
      withdraw(amount); 
      addTransaction({
        id: Date.now(),
        type: 'Online Pay',
        description,
        category,
        amount,
      });
    }
  };

  return (
    <BalanceContext.Provider value={{ totalAmount, transactions, deposit, withdraw, addTransaction, makeOnlinePayment }}>
      {children}
    </BalanceContext.Provider>
  );
};
