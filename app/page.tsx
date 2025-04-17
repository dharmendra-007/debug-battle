'use client';

import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MagicWandCursor from '@/components/ui/cursor-wand';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!name.trim() || !regNo.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!/^\d{10}$/.test(regNo)) {
      setError('Registration number must be 10 digits');
      return;
    }

    // Store participant info in localStorage for later use
    localStorage.setItem('participantName', name);
    localStorage.setItem('participantRegNo', regNo);
    localStorage.setItem('startTime', new Date().toISOString());

    router.push('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8 bg-gradient-to-b from-[#1a0f0f] to-[#000] text-gold font-harry overflow-x-hidden">
      <MagicWandCursor/>
      <motion.img
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        src="/logo2.png"
        alt="Enigma"
        className="absolute top-8 left-20 w-40 h-30"
      />
      <motion.img
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        src="/logo1.png"
        alt="SxV"
        className="absolute top-6 right-20 w-55 h-40"
      />


      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-9xl font-harry-main mb-4 tracking-wider drop-shadow-lg bg-gradient-to-r from-[#d4af37] via-[#f5d76e] to-[#d4af37] bg-clip-text text-transparent"
      >
        Debug Battle
      </motion.h1>


      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-300 font-harry text-lg mb-16"
      >
        Enter the Chamber of Codecraft
      </motion.p>

      <motion.div className='w-screen flex flex-col items-center relative'>
        <img
          src="/images/Harry_Potter-removebg-preview.png"
          alt="harry"
          className="absolute w-[200px] h-[200px] top-20 left-20 z-50"
        />
        <img
          src="/images/voldemon-removebg-preview.png"
          alt="voldemon"
          className="absolute w-[200px] h-[200px] top-20 right-20 z-50"
        />
        <motion.div
          className="bg-[#1a1a1a]/80 p-5 rounded-lg border border-gold mb-6 w-full max-w-lg shadow-inner"
        >
          <h2 className="text-2xl font-Almendra font-medium text-gold mb-4">Scroll of Spells (Rules)</h2>
          <ul className="text-gray-300 text-sm font-cormorant space-y-2">
            <li>🪄 Fix the magical bugs</li>
            <li>🕰 Timer begins with your first spell</li>
            <li>✨ Perfect score: 100 points</li>
            <li>🔮 Hints cost -25 points</li>
            <li>⏳ -1 point every 5 seconds</li>
            <li>🧟 Wrong spell: -15 points</li>
            <li>🚪 Skip = No points</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1a1a1a]/80 p-4 rounded-lg border mb-4 w-full max-w-lg"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-red-600 text-sm">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/50 border-white/40 focus:border-red-500 text-sm p-2"
                autoComplete="off"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="regNo" className="text-red-600 text-sm">University Reg. No.</Label>
              <Input
                id="regNo"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                className="bg-black/50 border-white/40 focus:border-red-500 text-sm p-2"
                placeholder="10-digit number"
                maxLength={10}
              />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={handleStart}
            className="relative group px-14 py-6 text-2xl font-harry text-gold border-2 border-yellow-600 rounded-xl shadow-lg bg-gradient-to-r from-[#7b0303] to-[#2f0000] hover:brightness-110 transition-all duration-300 overflow-hidden mt-4"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-xl blur-sm group-hover:opacity-100 opacity-0 transition duration-500" />
            <span className="absolute inset-0 rounded-xl border border-yellow-600 animate-pulse opacity-10" />
            <span className="relative z-10 tracking-wider drop-shadow-[0_0_3px_#FFD700] group-hover:drop-shadow-[0_0_5px_#FFD700] transition">
              Start Battle
            </span>
          </Button>

        </motion.div>
      </motion.div>
    </div>
  );
}