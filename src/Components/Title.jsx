import { useState } from "react";
import { useAuth } from "./../contexts/AuthContext";
import icons8 from "../../public/icons8-customer-30.png"
import { Link, useNavigate } from 'react-router-dom';
const Title = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();


  // async function handleLogout() {
  //   setError("");

  //   try {
  //     await logout();
  //     navigate('/login', { replace: true });
  //   } catch {
  //     setError("Failed to log out");
  //   }
  // }
  return (
    <>
      <div className="title">
        <Link to='/profile'> <div
          role="button"
         
          className="flex align-baseline justify-end"
        >
          <img
            src={icons8}
            className="w-5 h-5 mt-6"
          ></img>
          <h4 className="mt-5 mr-7 ml-2">Profile</h4>
        </div></Link>
       
        <h2>All Pictures</h2>
        <p>
          You can share your pics with rest of the world in{" "}
          <span className="login-text">Memories</span>
        </p>
      </div>
    </>
  );
};

export default Title;
