import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import LoadingSpinner from "../components/LoadingSpinner";
import "./DashboardDetail.css";
import { FaChevronLeft } from "react-icons/fa6";

const DashboardDetail = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [walletBalance, setWalletBalance] = useState(1000); // Assuming a sample initial wallet balance
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

  const addToCart = (product) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
    setWalletBalance(walletBalance - product.price); // Deduct price from wallet balance
  };

  const removeFromCart = (productId) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== productId)
    );
    const product = products.find((prod) => prod.id === productId);
    setWalletBalance(walletBalance + product.price); // Add back to wallet balance
  };

  const handleCheckout = () => {
    if (walletBalance < 0) {
      setError("Insufficient funds.");
    } else {
      // Proceed with API request for checkout
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
  const handleQuantityChange = (id, newQuantity) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const handleDeductionChange = (id, newDeduction) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, deduction: newDeduction } : product
      )
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-detail">
      <div className="product-header">
        <h1>Product List</h1>
        <div className="cta">
          <button className="btn-back " onClick={handleCheckout}>
            <FaChevronLeft />
            Back
          </button>
          <div className="par">
            <p className="detail-prod">Product Detail</p>
          </div>
        </div>
        <div>
          <p className="">
            <strong>Inua Mkulima Wallet</strong> Balance{" "}
            <strong>${walletBalance}</strong>
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
                      <th className="th">
                        Product <span className="price">Price</span>{" "}
                      </th>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div>
          <h3>Select Product</h3>
          <Cart
            selectedProducts={selectedProducts}
            removeFromCart={removeFromCart}
            // walletBalance={walletBalance}
            // handleCheckout={handleCheckout}
            onQuantityChange={handleQuantityChange}
            onDeductionChange={handleDeductionChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardDetail;
