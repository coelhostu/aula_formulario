import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { CodeBlock } from "../CodeBlock";
import { Sparkles, LayoutPanelTop } from "lucide-react";
import { motion } from "framer-motion";

const AVAILABLE_FIELDS = [
  { id: "nome", label: "Nome", type: "text" },
  { id: "email", label: "E-mail", type: "email" },
  { id: "telefone", label: "Telefone", type: "tel" },
  { id: "cep", label: "CEP", type: "text" },
  { id: "cidade", label: "Cidade", type: "text" },
  { id: "estado", label: "Estado", type: "text" },
];

export function FieldsetBuilder() {
  const [legend, setLegend] = useState("Informações de Contato");
  const [selectedFields, setSelectedFields] = useState<string[]>(["nome", "email"]);

  const toggleField = (id: string) => {
    setSelectedFields(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const getCode = () => {
    const fieldsHtml = AVAILABLE_FIELDS
      .filter(f => selectedFields.includes(f.id))
      .map(f => `  <label for="${f.id}">${f.label}</label>\n  <input type="${f.type}" id="${f.id}" name="${f.id}">`)
      .join("\n\n");

    return `<fieldset>\n  <legend>${legend || "..."}</legend>\n\n${fieldsHtml}\n</fieldset>`;
  };

  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-card overflow-hidden shadow-sm">
      <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Construtor Interativo: Fieldset</span>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] divide-y md:divide-y-0 md:divide-x border-b border-border/50">
        <div className="p-6 bg-muted/20 space-y-6">
          <div className="space-y-3">
            <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Título (Legend)</Label>
            <Input value={legend} onChange={(e) => setLegend(e.target.value)} placeholder="Ex: Dados Pessoais" />
          </div>

          <div className="space-y-4">
            <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">Campos a incluir</Label>
            <div className="space-y-3">
              {AVAILABLE_FIELDS.map((field) => (
                <div key={field.id} className="flex items-center gap-2">
                  <Checkbox 
                    id={`build-${field.id}`} 
                    checked={selectedFields.includes(field.id)}
                    onCheckedChange={() => toggleField(field.id)}
                  />
                  <Label htmlFor={`build-${field.id}`} className="cursor-pointer">{field.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-background flex flex-col items-center justify-center min-h-[300px]">
          {selectedFields.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <LayoutPanelTop className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Selecione alguns campos à esquerda para visualizar o agrupamento.</p>
            </div>
          ) : (
            <motion.fieldset 
              layout
              className="border-2 border-primary/30 p-6 rounded-xl w-full max-w-md shadow-sm bg-card transition-all"
            >
              {legend && (
                <legend className="px-3 text-sm font-bold text-primary bg-primary/10 rounded-full py-1 ml-2">
                  {legend}
                </legend>
              )}
              <div className="space-y-4 mt-2">
                {AVAILABLE_FIELDS.filter(f => selectedFields.includes(f.id)).map((field) => (
                  <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={`preview-${field.id}`} className="space-y-2">
                    <Label htmlFor={`preview-${field.id}`}>{field.label}</Label>
                    <Input id={`preview-${field.id}`} type={field.type} disabled className="bg-muted/50 cursor-default" />
                  </motion.div>
                ))}
              </div>
            </motion.fieldset>
          )}
        </div>
      </div>

      <div className="p-0 bg-background m-6 mb-2 mt-0">
        <CodeBlock code={getCode()} />
      </div>
    </div>
  );
}
