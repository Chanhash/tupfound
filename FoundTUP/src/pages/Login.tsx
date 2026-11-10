import InputField from '../components/inputfield';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router/internal/react-server-client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isFormValid()) return;

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
        setErrorMessage(result.error);
        return;
      }

      console.log("Login successful!", result.user);
    } catch (error) {
      console.error("Unable to connect to the server.", error);
    }
  }

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isFormValid(): boolean {
    return password.length > 0 && email.length > 0;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">

      <h1 className="text-3xl font-bold mb-5">FoundTUP.</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-5 rounded-xl border-1 w-80 mx-auto shadow-lg">
        <p className="text-xl self-center font-bold">Log In</p>
        <div className="flex flex-col gap-1">
          <InputField label="Email" type="email" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} />
          {!isValidEmail(email) && email.length > 0 && (
            <p className="text-red-500 text-xs">Please enter a valid email address.</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <InputField label="Password" type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <motion.button
          whileHover={{
            scale: isFormValid() ? 1.05 : 1,
          }}
          whileTap={{
            scale: 0.99
          }}
          animate={{
            backgroundPosition: isFormValid() ? "0% 0%" : "100% 0%",
          }}
          transition={{ duration: 0.2 }}
          style={{
            backgroundSize: "200% 100%",
            backgroundPosition: "100% 0%",
            backgroundImage: "linear-gradient(to right, #a1ffb1 50%, #afafaf 50%)"
          }}
          className="px-6 py-2 rounded-lg border mt-2"
          type="submit"
        >
          Log In
        </motion.button>
        {errorMessage && (
          <p className="self-center text-sm text-red-800  ">Unable to log in! {errorMessage}</p>
        )}
      </form>

      <div className="font-light text-md mt-5">
        <p>Don't have an account? <Link to="/register" className="text-blue-800 hover:underline">Register</Link></p>
      </div>

    </div>
  )
}