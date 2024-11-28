import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaChevronLeft } from "react-icons/fa6";
import PaymentModal from "../components/PaymentModal"; // Import the modal component
import { jsPDF } from "jspdf";
import "./DashboardDetail.css";
import ErrorModal from "./ErrorModal";

const DashboardDetail = () => {
  const initialWalletBalance = 5000;
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [walletBalance, setWalletBalance] = useState(initialWalletBalance);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerName] = useState("Gladys Kivua");
  const [customerId] = useState("123455");

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

  // Memoize the calculateTotalDeduction function to prevent redefinition on every render
  const calculateTotalDeduction = useCallback(() => {
    return selectedProducts.reduce(
      (total, product) =>
        total + product.price * product.quantity - (product.deduction || 0),
      0
    );
  }, [selectedProducts]); // Dependency is selectedProducts, as it affects the total deduction

  const handleWalletBalanceUpdate = useCallback(() => {
    const totalDeduction = calculateTotalDeduction();
    setWalletBalance(initialWalletBalance - totalDeduction);
  }, [calculateTotalDeduction, initialWalletBalance]); // Add calculateTotalDeduction and initialWalletBalance to dependencies

  // Use effect to update wallet balance when selectedProducts changes
  useEffect(() => {
    handleWalletBalanceUpdate();
  }, [handleWalletBalanceUpdate]); // Trigger when handleWalletBalanceUpdate changes

  const handleErrorModalClose = () => {
    setIsErrorModalVisible(false); // Close the error modal
    setError(null); // Reset error message
  };

  const handleCheckout = () => {
    const totalDeduction = calculateTotalDeduction();
    if (totalDeduction <= walletBalance) {
      setIsModalVisible(true); // Open the modal if the deduction is <= wallet balance
    } else {
      // setError("Insufficient funds.");
      setErrorMessage("Insufficient funds.");
      setIsErrorModalVisible(true);
    }
  };

  const handleModalDone = () => {
    setIsModalVisible(false); // Hide the modal
    resetState(); // Reset the state to initial values after checkout
  };

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.text("AGROVET RECEIPT", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Ref: wdfgyhjj`, 20, 40);
    doc.text(
      `Total Deduction: $${calculateTotalDeduction().toFixed(2)}`,
      20,
      50
    );
    doc.text(`Customer: ${customerName}`, 20, 60);
    doc.text(`Customer ID: ${customerId}`, 20, 70);
    doc.line(20, 75, 190, 75);

    const tableStartY = 85;
    doc.setFontSize(12);
    doc.text("Product", 20, tableStartY);
    doc.text("Qty", 120, tableStartY);
    doc.text("Price", 150, tableStartY);
    doc.text("Total", 180, tableStartY);

    let yPosition = tableStartY + 10;
    selectedProducts.forEach((product) => {
      const productName = product.title || "N/A";
      const productQty = product.quantity || 0;
      const productPrice = product.price || 0;
      const productTotal = (productPrice * productQty).toFixed(2);

      doc.text(productName.toString(), 20, yPosition);
      doc.text(productQty.toString(), 120, yPosition);
      doc.text(`$${productPrice.toFixed(2)}`, 150, yPosition);
      doc.text(`$${productTotal}`, 180, yPosition);
      yPosition += 10;
    });

    doc.line(20, yPosition, 190, yPosition);

    const totalAmount = calculateTotalDeduction();
    yPosition += 10;
    doc.setFontSize(14);
    doc.text(`Amount to be Paid: $${totalAmount.toFixed(2)}`, 20, yPosition);

    doc.setFontSize(10);
    doc.text("Thank you for your purchase!", 20, yPosition + 10);
    doc.text("Agrovet Ltd. | Your trusted Agro Supplier", 20, yPosition + 20);

    doc.save("receipt.pdf");
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

          <div>
            <p className="">Product Details</p>
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
                    <tr className="th">
                      <th colSpan="7">
                        Product <span className="mr">Price</span>
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
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "65px",
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
            border:
              selectedProducts.length === 0
                ? "2px solid #3e3e3e99"
                : "2px solid #000",
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

      {/* Error Modal for Insufficient Funds */}
      {isErrorModalVisible && (
        <ErrorModal
          message={errorMessage} // Dynamically pass the error message here
          onClose={handleErrorModalClose} // Close modal when user clicks "Close"
        />
      )}

      {/* Payment Modal */}
      <PaymentModal
        isVisible={isModalVisible}
        totalDeduction={calculateTotalDeduction()}
        onDownload={handleDownloadReceipt}
        onDone={handleModalDone}
        customerName={customerName}
        customerId={customerId}
      />
    </div>
  );
};

export default DashboardDetail;
