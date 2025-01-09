import React, {useEffect,  useState,useContext } from "react";
import styles from "./Navbar.module.css";
import Cookies from "js-cookie";
import { Link,useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate()
  const userName = Cookies.get("userName");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  
  
  useEffect(() => {
    if (Cookies.get("token")) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [isLoggedIn,Cookies.get("token")]);
  
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userName");
    Cookies.remove("userId");
    Cookies.remove("isAdmin");
    setisLoggedIn(false);
    navigate('/login')
  };

  return (
    <div>
      <main className={styles.navcontainer}>
       <div style={{ textDecoration:"none",color:'black' ,  }} > <div className={styles.appname}>
          {isLoggedIn?(<h1>Hello {userName}</h1>):(<h1>Poll App</h1>)}
        
        </div></div>
        
          <div className={styles.auth}>
            {!isLoggedIn?(
              <>
              <Link to='/register' className={styles.register}>
              <button>Register</button>
            </Link>
            <Link to='/login'  className={styles.login}>
              <button>Login </button>
            </Link></>):(<div onClick={handleLogout} style={{padding:'4px' , background:'#df2c2c'}} className={styles.login}>
              <button>Logout</button>
            </div>)}
            
           
          </div>
        
      </main>

      
    </div>
  );
};

export default Navbar;