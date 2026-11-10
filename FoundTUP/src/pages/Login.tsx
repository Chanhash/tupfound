import InputField from '../components/inputfield';
import Spinner from '../components/spinner';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router/internal/react-server-client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<Boolean>(false);

  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isFormValid()) return;

    setLoading(true);

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

      setLoading(false);
      setEmail('');
      setPassword('');

      if (!response.ok) {
        console.error(result.error);
        setErrorMessage(result.error);
        return;
      }

      console.log("Login successful!", result.user);
      setErrorMessage('');
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
    <motion.div 
      className="h-screen flex flex-col justify-center items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
          duration: 0.6,
          ease: 'easeOut'
      }}
    >

      <h1 className="text-3xl font-bold mb-5">FoundTUP.</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-5 rounded-xl border-1 w-80 mx-auto shadow-lg">
        <p className="text-xl self-center font-bold">Log In</p>
        <div className="flex flex-col gap-1">
          <InputField 
            label="Email" 
            type="email" 
            placeholder="example@gmail.com" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
          {!isValidEmail(email) && email.length > 0 && (
            <p className="text-red-500 text-xs">Please enter a valid email address.</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <InputField 
            label="Password" 
            type="password" 
            placeholder="********" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        
        <hr 
          className="mt-1 mx-10"
        />

        <motion.button
          whileHover={{
            scale: isFormValid() && !loading ? 1.05 : 1,
          }}
          whileTap={{
            scale: 0.99
          }}
          animate={{
            backgroundPosition: isFormValid() && !loading ? "0% 0%" : "100% 0%",
          }}
          transition={{ duration: 0.2 }}
          style={{
            backgroundSize: "200% 100%",
            backgroundPosition: "100% 0%",
            backgroundImage: "linear-gradient(to right, #a1ffb1 50%, #afafaf 50%)"
          }}
          className="px-6 py-2 rounded-lg border mt-2 flex items-center justify-center gap-2"
          type="submit"
        >
          {loading ? "Logging in..." : "Log In"}
          {loading && <Spinner />}
        </motion.button>
        {errorMessage && (
          <p className="self-center text-sm text-red-800  ">Unable to log in! {errorMessage}</p>
        )}
      </form>

      <div className="font-light text-md mt-5">
        <p>Don't have an account? <Link to="/register" className="text-blue-800 hover:underline">Register</Link></p>
      </div>

    </motion.div>
  )
}