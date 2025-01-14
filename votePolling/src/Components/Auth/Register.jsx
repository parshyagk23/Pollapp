import { useState } from "react";
import styles from "./auth.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "./../../Api/Auth";

const Register = () => {
  const [RegisterData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  const handleOnchange = (e) => {
    setError({ username: "", email: "", password: "" });

    setRegisterData({ ...RegisterData, [e.target.id]: e.target.value });
  };
  const HandleError = () => {
    let isError = false;

    let newError = {
      email: "",
      password: "",
      username:""

    };
    if (!RegisterData.email.includes("@gmail.com")) {

      newError.email = 'Plase enter correct email'
    }

    if (!RegisterData.password) {
      newError.password = 'Password is required'
    }
    if (!RegisterData.username) {
      newError.username = 'Username is required'
    }

    setError(newError)
    if (!RegisterData.email.includes("@gmail.com") || !RegisterData.password || !RegisterData.username) {
      isError = true;
    }
    return isError
  }
  const handleRegister = async () => {

    if (HandleError()) {
      return;
    }
    const responce = await register(RegisterData);

    if (responce.errormessage === "Username Already exists") {
      toast.error("user Already exist with email", { position: "top-center" });
      setRegisterData({
        email: "",
        username: "",
        password: "",
      });
      return;
    }
    toast.success("Register successful", { position: "top-center" });
    setRegisterData({
      email: "",
      username: "",
      password: "",
    });
    
  };

  return (
    <>
      <ToastContainer />

      <main className={styles.auth}>
        <h1 style={{ margin: '0' }} >Register</h1>
        <div className={styles.userdata} >
          <label htmlFor="username">Username</label>
          <div>
            <input
              placeholder="enter username"
              value={RegisterData.username}
              id="username"
              type="text"
              onChange={handleOnchange}
              className={styles.username}
              required
            />
            <p style={{ color: 'red' }} >{error?.username}</p>
          </div>

        </div>
        <div className={styles.userdata} >
          <label htmlFor="email">Email</label>
          <div>
            <input
              placeholder="enter email"
              value={RegisterData.email}
              id="email"
              type="email"
              onChange={handleOnchange}
              className={styles.username}
              required
            />
            <p style={{ color: 'red' }} >{error?.email}</p>
          </div>

        </div>
        <div className={styles.userdata} >
          <label htmlFor="password">Password</label>
          <div>
            <input

              placeholder="enter password"
              value={RegisterData.password}
              id="password"
              type="password"
              onChange={handleOnchange}
              className={styles.username}
              required
            />
            <p style={{ color: 'red' }} >{error?.password}</p>
          </div>
        </div>
        <div onClick={handleRegister} className={styles.loginbtn}>
          <button>Register</button>
        </div>
      </main>
    </>
  );
};

export default Register;
