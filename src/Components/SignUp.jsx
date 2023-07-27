import { useRef, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import { Link,redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const passwordConfirmationRef = useRef();
  const { signup } = useAuth();
  const navigate = useNavigate();



  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
    
navigate('/', { replace: true });

    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <>
    <div className="background">
      <form
        onSubmit={handleSubmit}
        className="mx-7 mt-0 h-screen flex items-center justify-center"
      >
        <div className=" signup-bg  text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
          <h2 className="p-3 text-3xl font-bold mt-4  text-white">Memories</h2>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <h3 className="text-xl font-semibold text-white pt-2">
            Create Account!
          </h3>
          {error && (
            <p className="bg-red-400 text-white rounded mt-2 p-1" role="alert">
              {error}
            </p>
          )}
          <div className="flex p-3 flex-col items-center justify-center mt-2">
          <input
              type="text"
              className="rounded-2xl text-gray-500 px-2 py-1 w-4/5 md:w-full border-[1px] m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
              placeholder="Name"
              ref={nameRef}
            ></input>
            <input
              type="email"
              className="rounded-2xl text-gray-500 px-2 py-1 w-4/5 md:w-full border-[1px] m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
              placeholder="Email"
              ref={emailRef}
            ></input>
            <input
              type="password"
              className="text-gray-500 rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
              placeholder="Password"
              ref={passwordRef}
            ></input>
            <input
              type="password"
              className="rounded-2xl text-gray-500 px-2 py-1 w-4/5 md:w-full border-[1px] m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
              placeholder="Password Confirmation"
              ref={passwordConfirmationRef}
            ></input>
            <button
              disabled={loading}
              type="submit"
              className="rounded-2xl m-4 signup-text bg-white w-3/5 px-4 py-2 shadow-md hover:text-white  transition duration-200 ease-in"
            >
              Sign Up
            </button>
          </div>
          <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
          <p className="text-white mb-6 text-sm font-medium cursor-pointer mt-4">
           <Link to='/login'> Already have an account?</Link>
          </p>
        </div>
      </form></div>
    </>
  );
};

export default SignUp;
