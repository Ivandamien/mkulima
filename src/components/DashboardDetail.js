import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaChevronLeft } from "react-icons/fa6";
import "./DashboardDetail.css";

const DashboardDetail = () => {
  const initialWalletBalance = 5000; // Initial wallet balance
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [walletBalance, setWalletBalance] = useState(initialWalletBalance);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error loading products.");
        setLoading(false);
      });
  };

  const resetState = () => {
    // Reset everything to the initial state
    setProducts([]);
    setSelectedProducts([]);
    setWalletBalance(initialWalletBalance);
    fetchProducts(); // Re-fetch the products to reset
  };

  const addToCart = (product) => {
    setSelectedProducts((prevProducts) => {
      const existingProduct = prevProducts.find((p) => p.id === product.id);
      if (existingProduct) return prevProducts; // Prevent duplicates

      return [
        ...prevProducts,
        { ...product, quantity: 1, deduction: 0 }, // Add with default quantity 1 and no deduction
      ];
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, newQuantity) } // Ensure quantity >= 1
          : product
      )
    );
  };

  const handleDeductionChange = (id, newDeduction) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, deduction: Math.max(0, newDeduction) } // Ensure deduction >= 0
          : product
      )
    );
  };

  const removeFromCart = (id) => {
    setSelectedProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== id
      );
      if (updatedProducts.length === 0) {
        setWalletBalance(initialWalletBalance); // Reset to initial balance if all products are removed
      }
      return updatedProducts;
    });
  };

  const calculateTotalDeduction = () => {
    return selectedProducts.reduce(
      (total, product) =>
        total + product.price * product.quantity - (product.deduction || 0),
      0
    );
  };

  const handleCheckout = () => {
    if (walletBalance < 0) {
      setError("Insufficient funds.");
    } else {
      axios
        .post("https://dummyjson.com/checkout", {
          selectedProducts: selectedProducts.map((product) => product.id),
          total: calculateTotalDeduction(),
        })
        .then(() => alert("Checkout successful"))
        .catch(() => alert("Checkout failed"));
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-detail">
      <div className="product-header">
        <h1>Product List</h1>
        <div className="cta">
          <button className="btn-back" onClick={resetState}>
            <FaChevronLeft style={{ marginRight: "8px" }} /> Back
          </button>
        </div>
        <div>
          <p>
            <strong>Inua Mkulima Wallet</strong> Balance{" "}
            <strong>${walletBalance.toFixed(2)}</strong>
          </p>
        </div>
      </div>

      <div className="product-check">
        <div>
          <h3>Product</h3>
          <div className="product-list">
            {products.length === 0 ? (
              <p>No products available</p>
            ) : (
              <div className="product-table-wrapper">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <ProductCard
                            product={product}
                            addToCart={addToCart}
                          />
                        </td>
                        <td>{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div>
          <h3>Selected Products</h3>
          <Cart
            selectedProducts={selectedProducts}
            removeFromCart={removeFromCart}
            onQuantityChange={handleQuantityChange}
            onDeductionChange={handleDeductionChange}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          className="btn-back"
          onClick={resetState}
          style={{
            backgroundColor: "#fff",
            border: "2px solid #000",
            color: "#000",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FaChevronLeft style={{ marginRight: "8px" }} /> Back
        </button>

        <button
          className="btn-checkout"
          onClick={handleCheckout}
          disabled={selectedProducts.length === 0}
          style={{
            backgroundColor:
              selectedProducts.length === 0 ? "#3E3E3E99" : "#000",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: selectedProducts.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Deduct{" "}
          {selectedProducts.length === 0
            ? "0.00"
            : calculateTotalDeduction().toFixed(2)}{" "}
          USD
        </button>
      </div>

      {calculateTotalDeduction() > 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            color: "red",
            fontWeight: "bold",
          }}
        >
          You will receive {calculateTotalDeduction().toFixed(2)} USD from the
          subsidy program. If this does not cover the total cost of the
          purchase, ensure you get the balance from the customer.
        </p>
      )}
    </div>
  );
};

export default DashboardDetail;
