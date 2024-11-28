import React from "react";

import "./ProductCard.css"; // CSS for the product card
import { CiCirclePlus } from "react-icons/ci";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <div className="product-details">
        <div className="product-name">{product.title}</div>
        <div className="product-price">${product.price}</div>
      </div>
      <div className="add-to-cart">
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          <CiCirclePlus size={15} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
