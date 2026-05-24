import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ListChecks } from "lucide-react";

const STORAGE_KEY = "html-forms-guide:best-practices";

const ITEMS = [
  {
    id: "label",
    title: "Sempre use <label> em todo input",
    description:
      "Associe pelo atributo for/id ou envolvendo o input. Acessibilidade e UX agradecem.",
  },
  {
    id: "fieldset",
    title: "Agrupe campos relacionados com <fieldset> e <legend>",
    description:
      "Dá contexto visual e semântico — leitores de tela anunciam a legenda em cada campo.",
  },
  {
    id: "type",
    title: "Escolha o type certo para cada campo",
    description:
      "type=email, tel, number, date, url. O navegador valida e o teclado mobile muda.",
  },
  {
    id: "required",
    title: "Use required quando o campo for obrigatório",
    description:
      "Validação nativa, sem JavaScript, com mensagens traduzidas pelo navegador.",
  },
  {
    id: "autocomplete",
    title: "Defina autocomplete em todos os campos relevantes",
    description:
      "Ajuda o navegador a preencher (nome, email, endereço) e melhora a conversão.",
  },
  {
    id: "name",
    title: "Sempre defina name em campos enviáveis",
    description:
      "Sem name, o servidor não recebe o valor. É a chave do par chave=valor enviado.",
  },
  {
    id: "mobile",
    title: "Pense em mobile: inputmode, type=tel, type=email",
    description:
      "Cada type abre um teclado diferente — escolha o mais natural para o usuário.",
  },
  {
    id: "keyboard",
    title: "Teste a navegação só com Tab e Enter",
    description:
      "Se você consegue completar o formulário sem mouse, ele está acessível.",
  },
  {
    id: "server",
    title: "Nunca confie só na validação do navegador",
    description:
      "Validação no cliente é UX. Validação no servidor é segurança. Você precisa das duas.",
  },
];

export function BestPracticesChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked, hydrated]);

  const total = ITEMS.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-card/60 overflow-hidden shadow-sm">
      <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Sua checklist de boas práticas
          </span>
        </div>
        <span className="text-sm font-mono text-primary">
          {done}/{total} dominadas
        </span>
      </div>

      <div className="h-2 bg-muted/40 overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
      </div>

      <ul className="divide-y divide-border/50">
        {ITEMS.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <li key={item.id}>
              <button
                onClick={() =>
                  setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                }
                className="w-full text-left px-5 py-4 flex items-start gap-4 hover:bg-muted/40 transition-colors"
              >
                <span
                  className={`mt-0.5 shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-primary border-primary"
                      : "border-border bg-background"
                  }`}
                >
                  {isChecked && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      className="text-primary-foreground"
                    >
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </motion.span>
                  )}
                </span>
                <span className="flex-1">
                  <span
                    className={`block font-medium transition-all ${
                      isChecked ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="block text-sm text-muted-foreground mt-0.5">
                    {item.description}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
