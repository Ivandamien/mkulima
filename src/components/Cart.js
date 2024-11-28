import React from "react";
import "./Cart.css";

const Cart = ({
  selectedProducts,
  onQuantityChange,
  onDeductionChange,
  removeFromCart,
  walletBalance,
}) => {
  // Calculate total deductions
  const totalDeduction = selectedProducts.reduce(
    (total, product) =>
      total + product.price * product.quantity - (product.deduction || 0),
    0
  );

  return (
    <div className="cart-container">
      {selectedProducts.length === 0 ? (
        <p className="no-products">
          Please select a product from the product panel first.
        </p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Price (USD)</th>
                <th>Total</th>
                <th>Deduction</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        onQuantityChange(
                          product.id,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={product.deduction || 0}
                      onChange={(e) =>
                        onDeductionChange(
                          product.id,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(product.id)}
                    >
                      −
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-section">
            <p>
              Total Deduction:{" "}
              <strong>
                <span className="deduct">{totalDeduction.toFixed(2)} USD</span>
              </strong>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
