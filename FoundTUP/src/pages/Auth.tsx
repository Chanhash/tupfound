import { useState } from 'react';
import { motion } from 'motion/react';
import { Navigate, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { homePathFor } from '../lib/auth';
import type { User } from '../types';
import { DinoSniffScene, Footprint } from '../components/FindlyArt.tsx';
import LoginForm from '../components/auth/LoginForm.tsx';
import RegisterForm from '../components/auth/RegisterForm.tsx';

type Tab = 'login' | 'register';

const TABS: { id: Tab; label: string }[] = [
  { id: 'login', label: 'Log In' },
  { id: 'register', label: 'Register' },
];

export default function Auth() {
  const [tab, setTab] = useState<Tab>('login');
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Already logged in? Skip the form.
  if (!loading && user) return <Navigate to={homePathFor(user.role)} replace />;

  function handleSuccess(user: User) {
    navigate(homePathFor(user.role), { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F3EEDF]">
      <motion.div
        className="flex flex-row border-2 rounded-2xl w-[100vh] h-[60vh] justify-between overflow-hidden shadow-[4px_4px_0px_#000000]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
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

        <div className="flex flex-col gap-4 bg-[#FFFDF6] w-[50%] p-10">
          <div className="bg-[#FFF6DC] flex flex-row justify-center border-2 rounded-xl gap-2 w-fit h-fit p-1 font-bold text-sm font-nunito">
            {TABS.map(({ id, label }) => (
              <button key={id} type="button" className="relative px-5 py-2 rounded-lg" onClick={() => setTab(id)}>
                {tab === id && (
                  <motion.div
                    layoutId="auth-indicator"
                    className="absolute inset-0 bg-[#FFFDF6] border-2 rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full flex-1 min-h-0 overflow-hidden">
            <motion.div
              className="flex w-[200%] h-full"
              animate={{ x: tab === 'login' ? '0%' : '-50%' }}
              transition={{ type: 'tween' }}
            >
              {/* `inert` keeps the off-screen form out of the tab order. */}
              <div className="w-1/2 shrink-0 h-full" inert={tab !== 'login'}>
                <LoginForm onSuccess={handleSuccess} />
              </div>
              <div className="w-1/2 shrink-0 h-full" inert={tab !== 'register'}>
                <RegisterForm onSuccess={handleSuccess} />
              </div>
            </motion.div>
          </div>

          <div className="font-light text-md self-center">
            {tab === 'login' ? (
              <p>Don't have an account? <button type="button" onClick={() => setTab('register')} className="text-[#5E9440] hover:underline">Register</button></p>
            ) : (
              <p>Already have an account? <button type="button" onClick={() => setTab('login')} className="text-[#5E9440] hover:underline">Log in</button></p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
