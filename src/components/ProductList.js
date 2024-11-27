const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.price} USD</p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
