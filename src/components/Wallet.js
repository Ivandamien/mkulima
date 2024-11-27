const Wallet = ({ walletBalance, onCheckout }) => {
  return (
    <div className="wallet">
      <h2>Wallet Balance: {walletBalance} USD</h2>
      <button onClick={onCheckout}>Checkout</button>
    </div>
  );
};

export default Wallet;
