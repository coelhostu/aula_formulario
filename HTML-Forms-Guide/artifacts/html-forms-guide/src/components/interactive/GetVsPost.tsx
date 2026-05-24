import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowRight, Server, Globe, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GetVsPost() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [submittedTab, setSubmittedTab] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent, method: string) => {
    e.preventDefault();
    setSubmittedTab(method);
  };

  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-card overflow-hidden shadow-sm">
      <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Experimente: GET vs POST</span>
      </div>
      
      <Tabs defaultValue="get" className="w-full">
        <div className="p-4 border-b border-border/50 bg-muted/30">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="get" onClick={() => setSubmittedTab(null)}>Método GET</TabsTrigger>
            <TabsTrigger value="post" onClick={() => setSubmittedTab(null)}>Método POST</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6 border border-border/50 p-6 rounded-xl bg-background">
              <h4 className="font-semibold flex items-center gap-2 text-foreground">
                <Globe className="w-4 h-4 text-muted-foreground" />
                Seu Formulário
              </h4>
              
              <TabsContent value="get" className="mt-0">
                <form onSubmit={(e) => handleSubmit(e, "get")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="get_nome">Nome</Label>
                    <Input id="get_nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Maria Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="get_senha">Senha</Label>
                    <Input id="get_senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="••••••••" />
                  </div>
                  <Button type="submit" className="w-full mt-2" variant="secondary">Enviar GET</Button>
                </form>
              </TabsContent>

              <TabsContent value="post" className="mt-0">
                <form onSubmit={(e) => handleSubmit(e, "post")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post_nome">Nome</Label>
                    <Input id="post_nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Maria Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post_senha">Senha</Label>
                    <Input id="post_senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="••••••••" />
                  </div>
                  <Button type="submit" className="w-full mt-2">Enviar POST</Button>
                </form>
              </TabsContent>
            </div>

            <div className="h-full">
              <div className="space-y-4 h-full border border-primary/20 bg-primary/5 p-6 rounded-xl relative overflow-hidden">
                <h4 className="font-semibold flex items-center gap-2 text-primary">
                  <Server className="w-4 h-4" />
                  Visão do Servidor
                </h4>

                <AnimatePresence mode="wait">
                  {!submittedTab ? (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground"
                    >
                      Preencha e envie para ver o resultado
                    </motion.div>
                  ) : submittedTab === "get" ? (
                    <motion.div 
                      key="get-result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-4"
                    >
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">URL Resultante</Label>
                        <div className="p-3 bg-background border rounded-md font-mono text-sm break-all text-accent shadow-inner">
                          https://site.com/login<span className="text-primary font-bold">?nome={encodeURIComponent(nome)}&senha={encodeURIComponent(senha)}</span>
                        </div>
                      </div>
                      <p className="text-sm text-destructive mt-4 font-medium flex items-start gap-2">
                        <AlertTriangle className="shrink-0 mt-0.5 w-4 h-4" />
                        <span>Perigoso! A senha ficou visível na URL e ficará salva no histórico do navegador.</span>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="post-result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-4"
                    >
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground uppercase">URL Resultante</Label>
                        <div className="p-3 bg-background border rounded-md font-mono text-sm break-all text-muted-foreground shadow-inner">
                          https://site.com/login
                        </div>
                      </div>
                      <div className="space-y-1 mt-4">
                        <Label className="text-xs text-muted-foreground uppercase">Corpo da Requisição (Oculto)</Label>
                        <div className="p-4 bg-[#1e1e1e] text-green-400 rounded-md font-mono text-sm whitespace-pre shadow-inner overflow-x-auto">
                          {`nome=${encodeURIComponent(nome)}\n&senha=${encodeURIComponent(senha)}`}
                        </div>
                      </div>
                      <p className="text-sm text-primary mt-4 font-medium flex items-start gap-2">
                        <ShieldCheck className="shrink-0 mt-0.5 w-4 h-4" />
                        <span>Seguro! Os dados foram enviados escondidos no corpo da requisição.</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
