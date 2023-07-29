import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../contexts/AuthContext';
import { useRef, useState } from 'react';

const ForgotPassword = () => {
    const {resetPassword}=useAuth();
    const emailRef = useRef();
    // const passwordRef = useRef();
    const [error, setError] = useState();
    const [message, setMessage] = useState();

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();
     
        try {
          setError("");
          setMessage("");
          setLoading(true);
          await resetPassword(emailRef.current.value);
          setMessage('Check your inbox for furthur!')

        } catch {
          setError("Failed to reset password");
        }
        setLoading(false);
      }

  return (
    <div>    <div className="background">
    <form onSubmit={handleSubmit} className="mx-7 mt-0 h-screen flex items-center justify-center">
      <div className=" login-bg rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
        <h2 className="p-3 text-3xl mt-4 font-bold text-white">Memories</h2>
        <div className="inline-block border-[1px] justify-center w-20 login-border border-solid"></div>
        <h3 className="text-xl mb-4 font-semibold text-white pt-2">
          Forgot your password?
        </h3>
        {error && (
          <p className="bg-red-400 rounded text-white m-2 p-1" role="alert">
            {error}
          </p>
        )}

{message && (
          <p className="bg-green-400 rounded m-2 text-white p-1" role="alert">
            {message}
          </p>
        )}

        <div className="flex px-3 flex-col items-center justify-center">
          <input
          ref={emailRef}
            type="email"
            className="rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px]  m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
            placeholder="Email"
          ></input>
          
          <button className="rounded-2xl m-4 text-white  w-2/3 px-4 py-2 shadow-md login-text-bg hover:text-pink-500 hover:bg-white transition duration-200 ease-in">
            Reset Password
          </button>
        </div>
        <div className="inline-block border-[1px] justify-center w-20 login-border border-solid"></div>

        <p className="text-white text-md font-medium cursor-pointer mt-3" >
         <Link to='/signup'> Don't have an account? </Link>
        </p>
        <p className="text-white mb-4 text-md font-medium cursor-pointer mt-3" >
         <Link to='/login'>Back to Login Page</Link>
        </p>
      </div>
    </form>
  </div></div>
  )
}

export default ForgotPassword