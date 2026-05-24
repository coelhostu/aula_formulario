import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Info } from "lucide-react";
import { Button } from "../ui/button";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
}

export function Quiz({ question, options }: QuizProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-card/50 overflow-hidden shadow-sm">
      <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Quiz Rápido</span>
      </div>
      <div className="p-6 md:p-8">
        <h4 className="text-xl font-serif font-bold text-foreground mb-6">
          {question}
        </h4>
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const isRevealed = selectedId !== null;
            
            let btnClass = "border-border bg-card hover:bg-muted";
            if (isRevealed) {
              if (option.isCorrect) {
                btnClass = "border-green-500 bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-200 ring-1 ring-green-500";
              } else if (isSelected) {
                btnClass = "border-destructive bg-destructive/10 text-destructive ring-1 ring-destructive";
              } else {
                btnClass = "border-border/50 bg-card/50 opacity-50";
              }
            }

            return (
              <div key={option.id} className="flex flex-col gap-2">
                <button
                  disabled={isRevealed}
                  onClick={() => setSelectedId(option.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${btnClass}`}
                >
                  <span className="font-medium">{option.text}</span>
                  {isRevealed && option.isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-600 dark:text-green-400">
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}
                  {isRevealed && isSelected && !option.isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-destructive">
                      <X className="w-5 h-5" />
                    </motion.div>
                  )}
                </button>
                
                <AnimatePresence>
                  {isRevealed && (isSelected || option.isCorrect) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="overflow-hidden"
                    >
                      <div className={`text-sm p-4 rounded-lg mt-1 flex items-start gap-3 ${
                        option.isCorrect 
                          ? "bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200" 
                          : "bg-destructive/5 text-destructive"
                      }`}>
                        <Info className="w-4 h-4 mt-0.5 shrink-0" />
                        <p>{option.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
