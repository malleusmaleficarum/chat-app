import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import AddAvatar from "../images/addAvatar.png";
import { auth, db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import "../style.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <div className='form__container'>
      <div className='form__wrapper'>
        <h3>CHAT APP</h3>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Display Name' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <input type='file' id='avatar' style={{ display: "none" }} />
          <label htmlFor='avatar'>
            <img src={AddAvatar} alt='avatarIcon' />
            <span>Add an Avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        {err && <span>Error!</span>}
        <p>
          Do you have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
