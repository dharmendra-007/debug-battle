'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw, Timer, AlertTriangle, SkipForward, Loader2, Wand , LockKeyholeOpen} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import buggyPrograms from '@/lib/constant';

export default function Game() {
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levelName, setLevelName] = useState(buggyPrograms[0].level);
  const [code, setCode] = useState(buggyPrograms[0].code);
  const [showHint, setShowHint] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState(100);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileError, setCompileError] = useState("");
  const [submittedSolutions, setSubmittedSolutions] = useState<string[]>(new Array(5).fill(''));

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setGameStarted(true);
      setStartTime(Date.now());
    }
  }, [countdown]);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, startTime]);

  const handleReset = () => {
    setCode(buggyPrograms[currentLevel].code);
    setLevelName(buggyPrograms[currentLevel].level);
    setCompileError("");
  };

  const handleSkip = () => {
    setScore(prev => prev + 0); // Adding 0 points for skipped question

    // Save empty string for skipped question
    setSubmittedSolutions(prev => {
      const newSolutions = [...prev];
      newSolutions[currentLevel] = '';
      return newSolutions;
    });

    if (currentLevel < buggyPrograms.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setCode(buggyPrograms[currentLevel + 1].code);
      setLevelName(buggyPrograms[currentLevel + 1].level);
      setShowHint(false);
      setStartTime(Date.now());
      setWrongAttempts(0);
      setShowSkipDialog(false);
      setCompileError("");
    } else {
      finishGame(score); // Use current score without adding any points
    }
  };

  const finishGame = async (finalScore: number) => {
    const timeTaken = (Date.now() - startTime) / 1000;

    try {
      const response = await fetch('/api/save-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: localStorage.getItem('participantName'),
          regNo: localStorage.getItem('participantRegNo'),
          startTime: localStorage.getItem('startTime'),
          score: finalScore,
          time: timeTaken,
          hints: hintsUsed,
          solutions: submittedSolutions
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save results');
      }

      router.push(`/results?score=${finalScore}&time=${timeTaken}&hints=${hintsUsed}`);
    } catch (error) {
      console.error('Error saving results:', error);
      router.push(`/results?score=${finalScore}&time=${timeTaken}&hints=${hintsUsed}`);
    }
  };

  const handleSubmit = async () => {
    setIsCompiling(true);
    setCompileError("");

    try {
      const response = await fetch('http://127.0.0.1:3000/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language: 'c',
          input: buggyPrograms[currentLevel].testCases[0].input
        }),
      });

      const result = await response.json();

      if (result.code !== 0 || result.stderr) {
        setCompileError(result.stderr || "Compilation failed");
        setWrongAttempts(prev => prev + 1);
        setShowError(true);
        setIsCompiling(false);
        return;
      }

      const timeTaken = (Date.now() - startTime) / 1000;
      const isCorrect = result.output.trim() === buggyPrograms[currentLevel].expectedOutput.trim();

      // Save the current solution
      setSubmittedSolutions(prev => {
        const newSolutions = [...prev];
        newSolutions[currentLevel] = code;
        return newSolutions;
      });

      if (isCorrect) {
        const timePenalty = Math.floor(timeTaken / 5); // -1 point per 5 seconds
        const hintPenalty = hintsUsed * 25; // -25 points per hint
        const attemptPenalty = wrongAttempts * 15; // -15 points per wrong attempt
        const levelScore = Math.max(0, 100 - hintPenalty - timePenalty - attemptPenalty);
        const newScore = score + levelScore;

        // Check if this is the last level
        if (currentLevel === buggyPrograms.length - 1) {
          // If it's the last level, finish the game
          finishGame(newScore);
        } else {
          // If not the last level, proceed to next level
          setScore(newScore);
          setCurrentLevel(prev => prev + 1);
          setCode(buggyPrograms[currentLevel + 1].code);
          setLevelName(buggyPrograms[currentLevel + 1].level);
          setShowHint(false);
          setStartTime(Date.now());
          setWrongAttempts(0);
          setCompileError("");
        }
      } else {
        setWrongAttempts(prev => prev + 1);
        setShowError(true);
      }
    } catch (error) {
      setCompileError("Failed to compile code. Please try again.");
      console.error('Compilation error:', error);
    } finally {
      setIsCompiling(false);
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center font-harry-main">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-8xl font-bold drop-shadow-lg bg-gradient-to-r from-[#d4af37] via-[#f5d76e] to-[#d4af37] bg-clip-text text-transparent"
        >
          {countdown === 0 ? "GO!" : countdown}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#101010]">
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="bg-black border border-red-500">
          <DialogTitle>Submission Error</DialogTitle>
          <div className="flex flex-col items-center gap-4 p-6">
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <h2 className="text-xl font-bold text-red-400">Incorrect Solution</h2>
            <p className="text-gray-400 text-center">
              The solution is not correct yet. Keep trying!
              <br />
              <span className="text-red-400 text-sm">
                (-15 points for wrong attempt)
              </span>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <DialogContent className="bg-black border border-red-500">
          <DialogTitle>Skip Question</DialogTitle>
          <div className="flex flex-col items-center gap-4 p-6">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h2 className="text-xl font-bold text-red-400">Are you sure?</h2>
            <p className="text-gray-400 text-center">
              Skipping this question will result in 0 points for this level.
              <br />
              Do you want to continue?
            </p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowSkipDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleSkip}
              >
                Skip Question
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold drop-shadow-lg bg-gradient-to-r from-[#4e5d6c] via-[#aab6c8] to-[#4e5d6c] bg-clip-text text-transparent">{levelName}</h2>
            <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg drop-shadow-lg bg-gradient-to-r from-[#d4af37] via-[#f5d76e] to-[#d4af37] bg-clip-text text-transparent">
              <Timer className="w-4 h-4 text-gold" />
              <span className="">{elapsedTime}s</span>
            </div>
            {wrongAttempts > 0 && (
              <div className="wrong-attempt flex mr-4">
                <span>Misfire:{wrongAttempts}</span>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="hint-button"
              onClick={() => {
                setShowHint(true);
                setHintsUsed(prev => prev + 1);
              }}
            >
              <Wand className="w-4 h-4 mr-2" />
              Spell
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="hint-button"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Spell
            </Button>
            <Button
              variant="outline"
              className="hint-button"
              onClick={() => setShowSkipDialog(true)}
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Time-Turn
            </Button>
          </div>
        </div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-4"
          >
            <p className="text-blue-300 font-medium font-harry">
              {buggyPrograms[currentLevel].hint}
            </p>
          </motion.div>
        )}

        <div className="editor-container mb-6">
          <CodeMirror
            value={code}
            height="400px"
            theme={dracula}
            extensions={[cpp()]}
            onChange={(value) => setCode(value)}
          />
        </div>

        <Button
          className="w-full submit-button"
          onClick={handleSubmit}
          disabled={isCompiling}
        >
          {isCompiling ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              unlocking...
            </>
          ) : (
            <span className='flex items-center gap-2'>
            Unlock Next Chapter <LockKeyholeOpen className="w-4 h-4" />
          </span>
          )}
        </Button>
      </motion.div>
    </div>
  );
}