const Cart = ({ selectedProducts, onRemoveFromCart }) => {
  return (
    <div className="cart">
      <h2>Selected Products</h2>
      {selectedProducts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price} USD
              <button onClick={() => onRemoveFromCart(product.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
