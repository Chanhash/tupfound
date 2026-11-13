import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router";
import { Link } from 'react-router/internal/react-server-client';
import { DinoSniffScene, Footprint } from '../components/FindlyArt.tsx'
import LoginPage from "./Login.tsx";
import { select } from 'motion/react-client';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedAuth, setSelectedAuth] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isFormValid()) return;

    setLoading(true);

    try {
      const response = await login(email, password);
      console.log("Login successful!", response);
      setErrorMessage('');

      if (response.role === "admin") {
        navigate("/admin");
      }
    } catch (error: any) {
      console.error("Login failed!", error);
      setErrorMessage(error.message || "Unable to log in!");
    }
  }

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isFormValid(): boolean {
    return password.length > 0 && email.length > 0;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F3EEDF]">
      <motion.div
        className="flex flex-row border-2 rounded-2xl w-[100vh] h-[60vh] justify-between overflow-hidden shadow-[4px_4px_0px_#000000]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut'
        }}
      >
        <div className='w-[50%] p-10 border-r-2 bg-[#DCEFC6] flex flex-col'>
          <p className="font-bricolage font-extrabold text-4xl">findly</p>
          <p className="font-gaegu text-extrabold text-2xl w-70 -rotate-2">lost something? our dino has a great nose.</p>
          <div className='mt-5'>
            <Footprint className="h-6 w-6 text-dino-ink rotate-150 -translate-x-5 text-[#5B5A4A]/50" />
            <Footprint className="h-6 w-6 text-dino-ink rotate-150 text-[#5B5A4A]/50" />
            <Footprint className="h-6 w-6 text-dino-ink rotate-150 translate-y-10 -translate-x-6 text-[#5B5A4A]/50" />
          </div>
          <DinoSniffScene className='mt-auto' />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 bg-[#FFFDF6] w-[50%] p-10">
          <div className="bg-[#FFF6DC] flex flex-row justify-center border-2 rounded-xl gap-2 w-fit h-fit p-1 font-bold text-sm font-nunito">

            <button
              type="button"
              className="relative px-5 py-2 rounded-lg"
              onClick={() => setSelectedAuth('login')}
            >
              {selectedAuth === 'login' && (
                <motion.div
                  layoutId="auth-indicator"
                  className="absolute inset-0 bg-[#FFFDF6] border-2 rounded-lg"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                />
              )}

              <span className="relative z-10">Log In</span>
            </button>

            <button
              type="button"
              className="relative px-5 py-2 rounded-lg"
              onClick={() => setSelectedAuth('register')}
            >
              {selectedAuth === 'register' && (
                <motion.div
                  layoutId="auth-indicator"
                  className="absolute inset-0 bg-[#FFFDF6] border-2 rounded-lg"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                />
              )}

              <span className="relative z-10">Register</span>
            </button>

          </div>

          <div className="relative w-full flex-1 min-h-0 overflow-hidden">
              <motion.div
                  className="flex w-[200%] h-full"
                  animate={{
                      x: selectedAuth === 'login' ? '0%' : '-50%'
                  }}
                  transition={{
                      type: 'tween',
                      stiffness: 300,
                      damping: 30
                  }}
              >
                  <div className="w-1/2 shrink-0 h-full">
                      <LoginPage
                          setEmail={setEmail}
                          setPassword={setPassword}
                          isValidEmail={isValidEmail}
                          isFormValid={isFormValid}
                          errorMessage={errorMessage}
                          email={email}
                          password={password}
                          loading={loading}
                      />
                  </div>

                  <div className="w-1/2 shrink-0 h-full">
                      <div>hi</div>
                  </div>
              </motion.div>
          </div>

          <div className="font-light text-md self-center">
            <p>Don't have an account? <Link to="/register" className="text-[#5E9440] hover:underline">Register</Link></p>
          </div>
        </form>
      </motion.div>

    </div>
  )
}