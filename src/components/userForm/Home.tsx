import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
const Home = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
    <div className="message" >
        <h1>Hello {`${user?.name}`} </h1>

      <h2 className="welcome" >
        thank you  for testing my application! I’ve walked the
        path as far as I could see. Now, the way forward is yours to show me :)
      </h2>
    <button onClick={handleLogout}>Logout</button>
    </div>

    </>
  );
};

export default Home;
