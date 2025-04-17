'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Trophy, Clock, AlertCircle, Home } from 'lucide-react';
import { useEffect } from 'react';
import MagicWandCursor from '@/components/ui/cursor-wand';

export default function Results() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const score = parseInt(searchParams.get('score') || '0');
  const time = parseFloat(searchParams.get('time') || '0');
  const hints = parseInt(searchParams.get('hints') || '0');

  useEffect(() => {
    const saveResults = async () => {
      const name = localStorage.getItem('participantName') || 'Unknown';
      const regNo = localStorage.getItem('participantRegNo') || 'Unknown';
      const startTime = localStorage.getItem('startTime') || new Date().toISOString();

      const resultData = {
        name,
        regNo,
        startTime,
        score,
        time,
        hints
      };

      try {
        const response = await fetch('/api/save-result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resultData),
        });

        if (!response.ok) {
          throw new Error('Failed to save results');
        }
      } catch (error) {
        console.error('Error saving results:', error);
      }
    };

    saveResults();
  }, [score, time, hints]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <MagicWandCursor/>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/50 p-8 rounded-lg max-w-xl w-full text-center border border-gold shadow-lg"
      >
        <h1 className="tracking-wider drop-shadow-lg bg-gradient-to-r from-[#d4af37] via-[#f5d76e] to-[#d4af37] bg-clip-text text-transparent text-4xl font-bold mb-8">Battle Results</h1>
        
        <div className="space-y-6 mb-8">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <Trophy className="w-6 h-6 text-gold" />
            <p className="text-2xl">
              Final Score: <span className="drop-shadow-lg bg-gradient-to-r from-[#4e5d6c] via-[#aab6c8] to-[#4e5d6c] bg-clip-text text-transparent font-bold">{score}</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <Clock className="w-6 h-6 text-gold" />
            <p className="text-lg">
              Time Taken: <span className="drop-shadow-lg bg-gradient-to-r from-[#4e5d6c] via-[#aab6c8] to-[#4e5d6c] bg-clip-text text-transparent font-bold">{time.toFixed(2)}s</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <AlertCircle className="w-6 h-6 text-gold" />
            <p className="text-lg">
              Spells Used: <span className="drop-shadow-lg bg-gradient-to-r from-[#4e5d6c] via-[#aab6c8] to-[#4e5d6c] bg-clip-text text-transparent font-bold">{hints}</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            onClick={() => router.push('/')}
            className="return-button text-lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Return to Hogwarts
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}