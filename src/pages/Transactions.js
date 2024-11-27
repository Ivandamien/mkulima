import React, { useState, useEffect } from "react";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setTransactions(response.data.products); // Assuming the response has `products` data
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <p>
                {transaction.name} - {transaction.price}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;
