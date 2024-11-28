import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import LoadingSpinner from "../components/LoadingSpinner";
import "./DashboardDetail.css";
import { FaChevronLeft } from "react-icons/fa6";

const DashboardDetail = () => {
  const initialWalletBalance = 5000; // Initial wallet balance
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [walletBalance, setWalletBalance] = useState(initialWalletBalance);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching products from the API
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
  }, []);

  // Update wallet balance dynamically when selectedProducts changes
  useEffect(() => {
    updateWalletBalance(selectedProducts);
  }, [selectedProducts]);

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

  const updateWalletBalance = (products) => {
    const totalDeduction = products.reduce(
      (total, product) =>
        total + product.price * product.quantity - (product.deduction || 0),
      0
    );
    const updatedBalance = initialWalletBalance - totalDeduction;
    setWalletBalance(updatedBalance > 0 ? updatedBalance : 0); // Ensure balance does not go negative
  };

  const handleCheckout = () => {
    if (walletBalance < 0) {
      setError("Insufficient funds.");
    } else {
      axios
        .post("https://dummyjson.com/checkout", {
          selectedProducts: selectedProducts.map((product) => product.id),
          total: selectedProducts.reduce(
            (total, product) => total + product.price,
            0
          ),
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
          <button className="btn-back" onClick={handleCheckout}>
            <FaChevronLeft />
            Back
          </button>
          <div className="par">
            <p className="detail-prod">Product Detail</p>
          </div>
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
    </div>
  );
};

export default DashboardDetail;
