import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

interface Preset {
  id: string;
  label: string;
  pattern: string;
  example: string;
  placeholder: string;
}

const PRESETS: Preset[] = [
  {
    id: "cep",
    label: "CEP",
    pattern: "\\d{5}-\\d{3}",
    example: "01310-100",
    placeholder: "00000-000",
  },
  {
    id: "cpf",
    label: "CPF",
    pattern: "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}",
    example: "123.456.789-00",
    placeholder: "000.000.000-00",
  },
  {
    id: "placa",
    label: "Placa Mercosul",
    pattern: "[A-Z]{3}-?\\d[A-Z]\\d{2}",
    example: "ABC-1D23",
    placeholder: "AAA-0A00",
  },
  {
    id: "hex",
    label: "Cor hex",
    pattern: "#[0-9A-Fa-f]{6}",
    example: "#1f5d3a",
    placeholder: "#000000",
  },
];

export function PatternValidator() {
  const [presetId, setPresetId] = useState<string>("cep");
  const [customPattern, setCustomPattern] = useState<string>("");
  const [value, setValue] = useState("");

  const isCustom = presetId === "custom";
  const preset = PRESETS.find((p) => p.id === presetId);
  const activePattern = isCustom ? customPattern : preset?.pattern ?? "";
  const placeholder = isCustom ? "Digite para testar..." : preset?.placeholder ?? "";

  let isValid: boolean | null = null;
  if (value.length > 0 && activePattern) {
    try {
      const re = new RegExp(`^(?:${activePattern})$`);
      isValid = re.test(value);
    } catch {
      isValid = null;
    }
  }

  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-card/50 overflow-hidden shadow-sm">
      <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">
          Experimente: Validador de pattern
        </span>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Escolha um padrão
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPresetId(p.id);
                  setValue("");
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  presetId === p.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:bg-muted"
                }`}
              >
                {p.label}
              </button>
            ))}
            <button
              onClick={() => {
                setPresetId("custom");
                setValue("");
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                presetId === "custom"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:bg-muted"
              }`}
            >
              Personalizado
            </button>
          </div>
        </div>

        {isCustom && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Seu regex
            </label>
            <input
              type="text"
              value={customPattern}
              onChange={(e) => setCustomPattern(e.target.value)}
              placeholder="ex.: [A-Z]{3,}"
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-mono"
            />
          </div>
        )}

        <div className="rounded-xl bg-[#1e1e1e] p-4 font-mono text-sm text-white/90 overflow-x-auto">
          <span className="text-pink-300">&lt;input</span>
          <span className="text-sky-300"> type</span>
          <span className="text-white/60">=</span>
          <span className="text-amber-200">"text"</span>
          <span className="text-sky-300"> pattern</span>
          <span className="text-white/60">=</span>
          <span className="text-amber-200">
            "{activePattern || "..."}"
          </span>
          {value.length > 0 && (
            <>
              <span className="text-sky-300"> required</span>
            </>
          )}
          <span className="text-pink-300"> /&gt;</span>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Teste seu valor
            {!isCustom && preset && (
              <span className="ml-2 normal-case font-normal text-muted-foreground/70">
                ex.: <span className="font-mono">{preset.example}</span>
              </span>
            )}
          </p>
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className={`w-full rounded-lg border-2 bg-background px-4 py-3 text-base font-mono pr-12 focus:outline-none transition-colors ${
                isValid === true
                  ? "border-green-500 ring-2 ring-green-500/20"
                  : isValid === false
                  ? "border-destructive ring-2 ring-destructive/20"
                  : "border-border focus:border-primary"
              }`}
            />
            <AnimatePresence>
              {isValid !== null && (
                <motion.div
                  key={isValid ? "ok" : "bad"}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {isValid ? (
                    <div className="rounded-full bg-green-500 text-white p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-destructive text-destructive-foreground p-1">
                      <X className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p
            className={`text-sm font-medium h-5 transition-colors ${
              isValid === true
                ? "text-green-700 dark:text-green-400"
                : isValid === false
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {isValid === true && "Valor válido para o padrão"}
            {isValid === false && "Valor não bate com o padrão"}
            {isValid === null && value.length === 0 && "Digite algo para testar"}
            {isValid === null && value.length > 0 && "Padrão inválido — verifique seu regex"}
          </p>
        </div>
      </div>
    </div>
  );
}
