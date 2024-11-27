const Header = () => {
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <div
      className="header"
      style={{ backgroundImage: 'url("/assets/header.png")' }}
    >
      <h1>Inua Mkulima Subsidy Program</h1>
      <div className="header-right">
        <span>Logged in as {username}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
