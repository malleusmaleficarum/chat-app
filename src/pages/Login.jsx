import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../style.scss";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <div className='form__container'>
      <div className='form__wrapper'>
        <h3>CHAT APP</h3>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <input type='file' id='avatar' style={{ display: "none" }} />
          <button>Login</button>
        </form>
        {err && <span>Error!</span>}
        <p>
          You don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
