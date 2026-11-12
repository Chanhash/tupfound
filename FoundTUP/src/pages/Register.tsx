import InputField from '../components/InputField';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router/internal/react-server-client';

export default function Register() {
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isFormValid()) return;

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
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
        return;
      }

      console.log("Registration successful!", result.user);
    } catch (error) {
      console.error("Unable to connect to the server.", error);
    }
  }

  function isValidPassword(password: string): boolean {
    return (
      password.length >= 8
    );
  }

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isFormValid(): boolean {
    return isValidEmail(email) && isValidPassword(password) && password === confirmPassword;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">

      <h1 className="text-3xl font-bold mb-5">FoundTUP.</h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-4 p-5 rounded-xl border-1 w-80 mx-auto shadow-lg">
        <p className="text-xl self-center font-bold">Sign In</p>
        <div className="flex flex-col gap-1">
          <InputField value={email} label="Email" type="email" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} />
          {!isValidEmail(email) && email.length > 0 && (
            <p className="text-red-500 text-xs">Please enter a valid email address.</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <InputField value={password} label="Password" type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
          {!isValidPassword(password) && password.length > 0 && (
            <p className="text-red-500 text-xs">Password must be at least 8 characters long.</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <InputField value={confirmPassword} label="Confirm Password" type="password" placeholder="********" onChange={(e) => setConfirmPassword(e.target.value)} />
          {password !== confirmPassword && confirmPassword.length > 0 && (
            <p className="text-red-500 text-xs">Passwords do not match.</p>
          )}
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
          Sign In
        </motion.button>
      </form>

      <div className="font-light text-md mt-5">
        <p>Already have an account? <Link to="/login" className="text-blue-800 hover:underline">Log in</Link></p>
      </div>

    </div>
  )
}