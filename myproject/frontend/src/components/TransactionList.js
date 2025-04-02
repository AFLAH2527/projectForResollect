import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/api";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((txn) => (
          <li key={txn.id}>
            {txn.member_name} borrowed "{txn.book_title}" on {new Date(txn.borrowed_at).toLocaleDateString()}
            {txn.returned_at ? ` and returned on ${new Date(txn.returned_at).toLocaleDateString()}` : " (Not returned yet)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
