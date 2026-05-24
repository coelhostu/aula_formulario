import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { 
  ArrowLeft, 
  RotateCcw, 
  Terminal, 
  Eye, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle,
  FileCode,
  Info,
  ExternalLink,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Template {
  id: string;
  name: string;
  description: string;
  html: string;
}

const TEMPLATES: Template[] = [
  {
    id: "01-basico",
    name: "01. Formulário Básico",
    description: "A tag raiz <form> e o botão de submissão. O menor formulário possível.",
    html: `<form action="/enviar" method="POST">
  <p>Este é um formulário básico. Clique no botão abaixo para testar o envio.</p>
  <button type="submit">Enviar Formulário</button>
</form>`
  },
  {
    id: "02-texto",
    name: "02. Inputs de Texto",
    description: "Campos de texto comuns, e-mail e senha, mostrando dicas visuais (placeholders).",
    html: `<form action="/login" method="POST">
  <div style="margin-bottom: 1rem;">
    <label for="username" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Nome de Usuário:</label>
    <input type="text" id="username" name="usuario" placeholder="Digite seu usuário" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
  </div>
  
  <div style="margin-bottom: 1rem;">
    <label for="email" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">E-mail:</label>
    <input type="email" id="email" name="email" placeholder="nome@exemplo.com" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
  </div>
  
  <div style="margin-bottom: 1rem;">
    <label for="password" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Senha:</label>
    <input type="password" id="password" name="senha" placeholder="Sua senha secreta" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
  </div>
  
  <button type="submit" style="background-color: hsl(var(--primary)); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Entrar</button>
</form>`
  },
  {
    id: "03-selecao",
    name: "03. Seleção (Checkbox e Radio)",
    description: "Múltipla escolha (checkbox) e escolha única exclusiva (radio). Observe a importância do atributo name idêntico nos radios.",
    html: `<form action="/preferencias" method="POST">
  <p style="font-weight: bold; margin-bottom: 0.5rem;">Quais tecnologias você quer aprender? (Múltipla escolha)</p>
  <div style="margin-bottom: 0.5rem;">
    <input type="checkbox" id="lang-html" name="tecnologias" value="html" checked>
    <label for="lang-html">HTML Nativo</label>
  </div>
  <div style="margin-bottom: 1rem;">
    <input type="checkbox" id="lang-css" name="tecnologias" value="css">
    <label for="lang-css">CSS Moderno</label>
  </div>
  
  <p style="font-weight: bold; margin-bottom: 0.5rem;">Escolha o seu plano de estudos (Seleção Exclusiva):</p>
  <div style="margin-bottom: 0.5rem;">
    <input type="radio" id="plano-gratis" name="plano" value="gratis" checked>
    <label for="plano-gratis">Gratuito (Sem custos)</label>
  </div>
  <div style="margin-bottom: 1rem;">
    <input type="radio" id="plano-pro" name="plano" value="pro">
    <label for="plano-pro">Avançado Pro (Acesso ilimitado)</label>
  </div>
  
  <button type="submit" style="background-color: hsl(var(--primary)); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Salvar Opções</button>
</form>`
  },
  {
    id: "04-dropdown",
    name: "04. Listas (Select e Datalist)",
    description: "Uso do select clássico com agrupamento por optgroup e do datalist para sugestões de digitação.",
    html: `<form action="/escolhas" method="POST">
  <div style="margin-bottom: 1.2rem;">
    <label for="estado" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Estado de Residência (Select):</label>
    <select id="estado" name="estado" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
      <option value="">Selecione...</option>
      <optgroup label="Sudeste">
        <option value="sp">São Paulo</option>
        <option value="rj">Rio de Janeiro</option>
        <option value="mg">Minas Gerais</option>
      </optgroup>
      <optgroup label="Nordeste">
        <option value="ba">Bahia</option>
        <option value="pe">Pernambuco</option>
      </optgroup>
    </select>
  </div>
  
  <div style="margin-bottom: 1.2rem;">
    <label for="navegador" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Navegador favorito (Datalist / Sugestões):</label>
    <input type="text" id="navegador" name="navegador" list="navegadores" placeholder="Comece a digitar para ver as opções..." style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
    <datalist id="navegadores">
      <option value="Google Chrome">
      <option value="Mozilla Firefox">
      <option value="Apple Safari">
      <option value="Microsoft Edge">
      <option value="Opera">
    </datalist>
  </div>
  
  <button type="submit" style="background-color: hsl(var(--primary)); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Enviar Escolhas</button>
</form>`
  },
  {
    id: "05-especiais",
    name: "05. Campos Especiais e Data",
    description: "Calendário nativo, seletor de cor visual, barra deslizante (range) e campos invisíveis (hidden).",
    html: `<form action="/salvar-config" method="POST">
  <div style="margin-bottom: 1rem;">
    <label for="nasc" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Data de Nascimento:</label>
    <input type="date" id="nasc" name="data_nascimento" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
  </div>
  
  <div style="margin-bottom: 1rem; display: flex; gap: 2rem; align-items: center;">
    <div>
      <label for="cor" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Cor de Tema:</label>
      <input type="color" id="cor" name="cor_tema" value="#0f766e" style="width: 60px; h: 40px; padding: 0.2rem; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
    </div>
    
    <div style="flex: 1;">
      <label for="volume" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Volume do Som:</label>
      <input type="range" id="volume" name="volume" min="0" max="100" value="70" style="width: 100%;">
    </div>
  </div>
  
  <div style="margin-bottom: 1rem;">
    <label for="arquivo" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Enviar Comprovante (PDF/Imagem):</label>
    <input type="file" id="arquivo" name="comprovante" accept="image/*, application/pdf" style="width: 100%;">
  </div>
  
  <!-- Um campo invisible para enviar metadados ao servidor -->
  <input type="hidden" name="token_sessao" value="usr_98a72f10b2">
  
  <button type="submit" style="background-color: hsl(var(--primary)); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Salvar Tudo</button>
</form>`
  },
  {
    id: "06-fieldset",
    name: "06. Estruturação (Fieldset)",
    description: "Molduras semânticas e legendas visuais para agrupar blocos lógicos de informações em formulários extensos.",
    html: `<form action="/endereco" method="POST">
  <fieldset style="border: 2px solid hsl(var(--border)); padding: 1.2rem; border-radius: 6px; margin-bottom: 1.2rem;">
    <legend style="padding: 0 0.5rem; font-weight: bold; color: hsl(var(--primary));">Dados Residenciais</legend>
    
    <div style="margin-bottom: 1rem;">
      <label for="rua" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Endereço / Rua:</label>
      <input type="text" id="rua" name="rua" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <label for="num" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Número:</label>
        <input type="text" id="num" name="numero" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
      </div>
      <div>
        <label for="cep" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">CEP:</label>
        <input type="text" id="cep" name="cep" placeholder="00000-000" pattern="\\d{5}-\\d{3}" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
      </div>
    </div>
  </fieldset>
  
  <button type="submit" style="background-color: hsl(var(--primary)); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Salvar Endereço</button>
</form>`
  },
  {
    id: "07-validacao",
    name: "07. Validação HTML5 Nativa",
    description: "Campos com required, minlength, limites numéricos (min/max) e Expressões Regulares (pattern) sem usar JavaScript.",
    html: `<form action="/validar" method="POST">
  <div style="margin-bottom: 1rem;">
    <label for="nome" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Nome Completo (Mín. 5 letras) *:</label>
    <input type="text" id="nome" name="nome" minlength="5" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
  </div>
  
  <div style="margin-bottom: 1rem;">
    <label for="idade" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">Idade (De 18 a 120 anos) *:</label>
    <input type="number" id="idade" name="idade" min="18" max="120" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
  </div>
  
  <div style="margin-bottom: 1.2rem;">
    <label for="cep-val" style="display: block; font-weight: bold; margin-bottom: 0.3rem;">CEP Obrigatório (Formato: 00000-000) *:</label>
    <input type="text" id="cep-val" name="cep" pattern="\\d{5}-\\d{3}" placeholder="Ex: 01001-000" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
  </div>
  
  <button type="submit" style="background-color: hsl(var(--primary)); color: white; border: none; padding: 0.7rem 1.4rem; border-radius: 4px; cursor: pointer; font-weight: bold;">Testar Envio (Dispara Mensagens Nativas)</button>
</form>`
  },
  {
    id: "08-completo",
    name: "08. Formulário Completo",
    description: "Uma integração com múltiplos elementos estruturados, aplicando todas as recomendações de semântica e acessibilidade.",
    html: `<form action="/api/cadastro" method="POST">
  <h3 style="font-family: inherit; font-size: 1.4rem; margin-top: 0; margin-bottom: 1rem; color: hsl(var(--primary)); border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Ficha de Pré-Cadastro</h3>
  
  <fieldset style="border: 1px solid #ddd; padding: 1.2rem; border-radius: 6px; margin-bottom: 1rem;">
    <legend style="padding: 0 0.4rem; font-weight: bold;">Informações Básicas</legend>
    
    <div style="margin-bottom: 0.8rem;">
      <label for="cad_nome" style="display: block; font-size: 0.9rem; margin-bottom: 0.2rem;">Nome Completo *:</label>
      <input type="text" id="cad_nome" name="nome" placeholder="Digite seu nome" required style="width: 100%; padding: 0.4rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
    </div>
    
    <div style="margin-bottom: 0.8rem;">
      <label for="cad_nasc" style="display: block; font-size: 0.9rem; margin-bottom: 0.2rem;">Nascimento *:</label>
      <input type="date" id="cad_nasc" name="data_nasc" required style="width: 100%; padding: 0.4rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
    </div>
    
    <div style="margin-bottom: 0.8rem;">
      <label for="cad_email" style="display: block; font-size: 0.9rem; margin-bottom: 0.2rem;">E-mail *:</label>
      <input type="email" id="cad_email" name="email" placeholder="seu@email.com" required style="width: 100%; padding: 0.4rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
    </div>
  </fieldset>
  
  <fieldset style="border: 1px solid #ddd; padding: 1.2rem; border-radius: 6px; margin-bottom: 1rem;">
    <legend style="padding: 0 0.4rem; font-weight: bold;">Plano Pretendido</legend>
    <div style="display: flex; gap: 2rem;">
      <div>
        <input type="radio" id="plano_g" name="plano_cad" value="gratis" checked>
        <label for="plano_g" style="font-size: 0.9rem;">Plano Grátis</label>
      </div>
      <div>
        <input type="radio" id="plano_p" name="plano_cad" value="pro">
        <label for="plano_p" style="font-size: 0.9rem;">Plano Pro (Premium)</label>
      </div>
    </div>
  </fieldset>
  
  <div style="margin-bottom: 1.2rem;">
    <input type="checkbox" id="cad_termos" name="aceitou_termos" value="sim" required>
    <label for="cad_termos" style="font-size: 0.85rem;">Eu aceito e concordo com os Termos de Serviço da aula de formulários *</label>
  </div>
  
  <button type="submit" style="background-color: hsl(var(--primary)); color: white; border: none; padding: 0.8rem 1.6rem; font-size: 1rem; border-radius: 4px; cursor: pointer; font-weight: bold; width: 100%;">Registrar Conta</button>
</form>`
  }
];

interface Submission {
  timestamp: string;
  action: string;
  method: string;
  data: Record<string, string>;
}

interface AuditResult {
  type: "success" | "warning" | "error";
  title: string;
  description: string;
}

export default function Visualizer() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const [htmlCode, setHtmlCode] = useState(TEMPLATES[0].html);
  const [activeTab, setActiveTab] = useState<"render" | "server" | "audit">("render");
  const [lastSubmission, setLastSubmission] = useState<Submission | null>(null);
  const [audits, setAudits] = useState<AuditResult[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Load template code when changed
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplateId(templateId);
      setHtmlCode(template.html);
      setLastSubmission(null);
    }
  };

  const handleReset = () => {
    const template = TEMPLATES.find(t => t.id === selectedTemplateId);
    if (template) {
      setHtmlCode(template.html);
      setLastSubmission(null);
    }
  };

  // Perform Static Code Analysis on edited HTML
  useEffect(() => {
    const runAudit = () => {
      const results: AuditResult[] = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCode, "text/html");
      const inputs = doc.querySelectorAll("input, textarea, select");
      const forms = doc.querySelectorAll("form");

      // Check 1: Form tag
      if (forms.length === 0) {
        results.push({
          type: "error",
          title: "Sem tag <form>",
          description: "Não há nenhuma tag <form> envolvendo os campos. Sem ela, o navegador não sabe que os campos pertencem a um grupo de dados unificado."
        });
      } else {
        forms.forEach(form => {
          const action = form.getAttribute("action");
          const method = form.getAttribute("method");
          if (!action) {
            results.push({
              type: "warning",
              title: "Atributo 'action' ausente",
              description: "A tag <form> não possui o atributo 'action'. O navegador enviará os dados para a própria página atual por padrão."
            });
          }
          if (!method) {
            results.push({
              type: "warning",
              title: "Atributo 'method' ausente",
              description: "Sem o atributo 'method', o navegador utilizará o método padrão GET, o que anexa as respostas na URL de forma visível."
            });
          }
        });
      }

      // Check 2: Inputs with missing name attribute
      const namelessInputs: string[] = [];
      inputs.forEach(input => {
        const type = input.getAttribute("type");
        if (type === "submit" || type === "reset" || type === "button") return;
        if (!input.getAttribute("name")) {
          const tag = input.tagName.toLowerCase();
          namelessInputs.push(type ? `<${tag} type="${type}">` : `<${tag}>`);
        }
      });

      if (namelessInputs.length > 0) {
        results.push({
          type: "error",
          title: "Campos sem atributo 'name'",
          description: `Os elementos [ ${namelessInputs.join(", ")} ] estão sem o atributo 'name'. Sem esse atributo, os dados digitados NUNCA serão enviados ao servidor na submissão!`
        });
      } else if (inputs.length > 0) {
        results.push({
          type: "success",
          title: "Nomes de envio mapeados",
          description: "Todos os campos de coleta possuem o atributo 'name', garantindo que o servidor receba os dados corretamente."
        });
      }

      // Check 3: Missing Label connection
      const inputsWithoutLabel: string[] = [];
      inputs.forEach(input => {
        const type = input.getAttribute("type");
        if (type === "submit" || type === "reset" || type === "button" || type === "hidden") return;

        // Check if enclosed in label
        let parent = input.parentElement;
        let hasLabelParent = false;
        while (parent) {
          if (parent.tagName === "LABEL") {
            hasLabelParent = true;
            break;
          }
          parent = parent.parentElement;
        }

        if (hasLabelParent) return;

        // Check if referenced by label
        const id = input.getAttribute("id");
        if (id) {
          const matchingLabel = doc.querySelector(`label[for="${id}"]`);
          if (matchingLabel) return;
        }

        const tag = input.tagName.toLowerCase();
        inputsWithoutLabel.push(type ? `<${tag} type="${type}">` : `<${tag}>`);
      });

      if (inputsWithoutLabel.length > 0) {
        results.push({
          type: "warning",
          title: "Acessibilidade: Campos sem <label> associada",
          description: `Os elementos [ ${inputsWithoutLabel.join(", ")} ] não possuem um rótulo <label> associado. Usuários de leitores de tela terão dificuldades para saber do que se trata o campo.`
        });
      } else if (inputs.length > 0) {
        results.push({
          type: "success",
          title: "Vínculos de rótulos (Labels) ativos",
          description: "Todos os campos estão acessíveis com suas devidas tags <label> conectadas por id/for ou por encapsulamento."
        });
      }

      // Check 4: Placeholder only usage
      const placeholderOnlyFields: string[] = [];
      inputs.forEach(input => {
        const type = input.getAttribute("type");
        if (type === "submit" || type === "reset" || type === "button" || type === "hidden") return;

        let hasLabel = false;
        let parent = input.parentElement;
        while (parent) {
          if (parent.tagName === "LABEL") { hasLabel = true; break; }
          parent = parent.parentElement;
        }
        if (!hasLabel) {
          const id = input.getAttribute("id");
          if (id && doc.querySelector(`label[for="${id}"]`)) {
            hasLabel = true;
          }
        }

        if (!hasLabel && input.getAttribute("placeholder")) {
          placeholderOnlyFields.push(input.getAttribute("placeholder") || "");
        }
      });

      if (placeholderOnlyFields.length > 0) {
        results.push({
          type: "warning",
          title: "Uso incorreto de placeholder como rótulo",
          description: "Alguns inputs usam apenas o atributo 'placeholder' como legenda visual. Isso é uma má prática, pois a dica some quando o usuário começa a digitar."
        });
      }

      // Check 5: Recomendar tipos de input melhores
      const typeTextWarnings: string[] = [];
      inputs.forEach(input => {
        if (input.tagName.toLowerCase() === "input" && input.getAttribute("type") === "text") {
          const name = (input.getAttribute("name") || "").toLowerCase();
          const placeholder = (input.getAttribute("placeholder") || "").toLowerCase();
          
          if (name.includes("email") || placeholder.includes("email")) {
            typeTextWarnings.push("E-mail (use type='email')");
          } else if (name.includes("tel") || name.includes("fone") || name.includes("phone") || placeholder.includes("telefone") || placeholder.includes("celular")) {
            typeTextWarnings.push("Telefone (use type='tel')");
          } else if (name.includes("idade") || placeholder.includes("idade") || name.includes("numero") || name.includes("num")) {
            typeTextWarnings.push("Número/Idade (use type='number')");
          }
        }
      });

      if (typeTextWarnings.length > 0) {
        results.push({
          type: "warning",
          title: "Dica: Melhore a experiência móvel",
          description: `Os campos [ ${typeTextWarnings.join(", ")} ] estão configurados com type='text'. Alterá-los para seus tipos específicos ativará teclados apropriados em dispositivos móveis.`
        });
      }

      setAudits(results);
    };

    runAudit();
  }, [htmlCode]);

  // Intercept form submissions inside the live render container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const target = e.target as HTMLFormElement;

      // Extract raw inputs values
      const formData = new FormData(target);
      const data: Record<string, string> = {};
      
      // Also look for empty inputs not included in FormData sometimes
      formData.forEach((value, key) => {
        data[key] = value.toString();
      });

      const action = target.getAttribute("action") || "(página atual)";
      const method = (target.getAttribute("method") || "GET").toUpperCase();

      setLastSubmission({
        timestamp: new Date().toLocaleTimeString(),
        action,
        method,
        data
      });

      setActiveTab("server");
    };

    container.addEventListener("submit", handleSubmit);
    return () => {
      container.removeEventListener("submit", handleSubmit);
    };
  }, [htmlCode]);

  // Highlight line numbers helper
  const lineNumbers = htmlCode.split("\n").map((_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border/50 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Voltar ao Guia
            </Button>
          </Link>
          <div className="h-4 w-[1px] bg-border/60 hidden sm:block" />
          <h1 className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" /> Laboratório Interativo
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="select-template" className="text-sm font-medium text-muted-foreground hidden md:inline">
            Escolher Modelo:
          </label>
          <select
            id="select-template"
            value={selectedTemplateId}
            onChange={handleTemplateChange}
            className="h-10 px-3 pr-8 rounded-md border border-input bg-background text-sm font-sans focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {TEMPLATES.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
        {/* Editor Pane (Left Side) */}
        <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-border/50 bg-card overflow-hidden h-1/2 lg:h-full">
          {/* Editor Header */}
          <div className="h-12 bg-muted/40 border-b border-border/50 px-4 flex items-center justify-between shrink-0">
            <span className="text-xs font-mono font-medium text-muted-foreground flex items-center gap-2">
              <FileCode className="w-4 h-4 text-accent" /> editor.html
            </span>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReset}
                className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                title="Resetar código para o modelo original"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Resetar
              </Button>
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 flex overflow-auto font-mono text-sm leading-relaxed p-4 bg-muted/20">
            {/* Line Numbers */}
            <div className="text-right text-muted-foreground/30 pr-4 select-none border-r border-border/20 font-mono text-sm">
              {lineNumbers.map(n => (
                <div key={n} className="h-6">{n}</div>
              ))}
            </div>
            {/* Raw Code Editor Textarea */}
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-foreground p-0 pl-4 resize-none font-mono text-sm focus:ring-0 leading-6 min-h-[300px] w-full"
              placeholder="Digite o código HTML do seu formulário aqui..."
              spellCheck="false"
            />
          </div>

          {/* Description Footer */}
          <div className="p-4 bg-muted/30 border-t border-border/50 text-xs text-muted-foreground shrink-0 leading-relaxed">
            <h4 className="font-sans font-bold text-foreground mb-1 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-primary" /> 
              {TEMPLATES.find(t => t.id === selectedTemplateId)?.name}
            </h4>
            <p className="font-sans">
              {TEMPLATES.find(t => t.id === selectedTemplateId)?.description}
            </p>
          </div>
        </div>

        {/* Preview / Inspector Pane (Right Side) */}
        <div className="w-full lg:w-1/2 flex flex-col overflow-hidden h-1/2 lg:h-full">
          {/* Inspector Tabs */}
          <div className="h-12 bg-muted/40 border-b border-border/50 px-4 flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab("render")}
              className={`h-full px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "render"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="w-4 h-4" /> Live Render (Visual)
            </button>
            <button
              onClick={() => setActiveTab("server")}
              className={`h-full px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "server"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Terminal className="w-4 h-4" /> Console do Servidor
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`h-full px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "audit"
                  ? "border-primary text-primary font-bold font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="w-4 h-4" /> Auditor de Código
              {audits.filter(a => a.type === "error" || a.type === "warning").length > 0 && (
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              )}
            </button>
          </div>

          {/* Inspector Body */}
          <div className="flex-1 overflow-y-auto p-6 bg-background">
            
            {/* Render View */}
            {activeTab === "render" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
                    Interface Renderizada pelo Navegador:
                  </span>
                  <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded">
                    Recipiente Seguro
                  </span>
                </div>
                
                {/* HTML Render Wrapper */}
                <div 
                  ref={containerRef}
                  className="p-6 border border-border/80 rounded-xl bg-card/60 shadow-inner min-h-[250px] font-sans"
                  dangerouslySetInnerHTML={{ __html: htmlCode }}
                />
                
                <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/20 p-3 rounded border border-border/10">
                  💡 <strong>Instruções de Teste:</strong> Preencha os campos e clique no botão de envio. O formulário irá simular a submissão e abrir a aba <strong>Console do Servidor</strong> mostrando as variáveis de envio correspondentes!
                </p>
              </div>
            )}

            {/* Server Simulator View */}
            {activeTab === "server" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" /> Resposta da Requisição
                  </span>
                  {lastSubmission && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setLastSubmission(null)}
                      className="h-8 text-xs text-destructive hover:text-destructive/80"
                    >
                      Limpar Logs
                    </Button>
                  )}
                </div>

                {!lastSubmission ? (
                  <div className="border border-border/40 bg-card rounded-xl p-8 text-center text-muted-foreground/60 flex flex-col items-center justify-center min-h-[300px]">
                    <Terminal className="w-12 h-12 mb-3 text-muted-foreground/30 animate-pulse" />
                    <h3 className="font-bold text-sm text-foreground mb-1">Aguardando Envio</h3>
                    <p className="text-xs max-w-xs leading-relaxed">
                      Preencha o formulário na aba anterior e submeta-o para inspecionar os parâmetros gerados.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Log Header */}
                    <div className="bg-muted/40 border border-border/50 rounded-lg p-4 font-mono text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">TIMESTAMP:</span>
                        <span className="text-foreground">{lastSubmission.timestamp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">DESTINO (ACTION):</span>
                        <span className="text-accent font-bold">{lastSubmission.action}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">MÉTODO (METHOD):</span>
                        <span className="text-primary font-bold">{lastSubmission.method}</span>
                      </div>
                    </div>

                    {/* Simulação da URL (Se GET) */}
                    {lastSubmission.method === "GET" && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-semibold text-muted-foreground uppercase font-mono block">URL Final Gerada (GET anexa na URL):</span>
                        <div className="bg-accent/5 border border-accent/20 rounded-lg p-3 font-mono text-xs text-accent break-all select-all flex items-center justify-between gap-4">
                          <span>
                            https://servidor.com{lastSubmission.action === "(página atual)" ? "" : lastSubmission.action}
                            ?{Object.entries(lastSubmission.data).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&")}
                          </span>
                          <span className="text-[10px] bg-accent/20 text-accent font-sans px-1.5 py-0.5 rounded shrink-0 uppercase font-bold">Query Params</span>
                        </div>
                      </div>
                    )}

                    {/* Data Payload */}
                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase font-mono block">Payload de Dados (Recepção do Servidor):</span>
                      <div className="border border-border/60 rounded-xl overflow-hidden bg-card/40">
                        <table className="w-full text-left font-mono text-xs border-collapse">
                          <thead>
                            <tr className="bg-muted/50 border-b border-border/40">
                              <th className="p-3 font-sans font-bold text-muted-foreground">Chave (name)</th>
                              <th className="p-3 font-sans font-bold text-muted-foreground">Valor (value)</th>
                              <th className="p-3 font-sans font-bold text-muted-foreground text-right">Identificação</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(lastSubmission.data).length === 0 ? (
                              <tr>
                                <td colSpan={3} className="p-4 text-center text-muted-foreground italic">
                                  Nenhum dado enviado. Certifique-se de que os inputs possuem o atributo 'name' preenchido!
                                </td>
                              </tr>
                            ) : (
                              Object.entries(lastSubmission.data).map(([key, value]) => (
                                <tr key={key} className="border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors">
                                  <td className="p-3 font-bold text-primary">{key}</td>
                                  <td className="p-3 text-foreground break-all">{value}</td>
                                  <td className="p-3 text-right text-[10px] text-muted-foreground uppercase">
                                    processado
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed bg-primary/5 p-3 rounded-lg border border-primary/10">
                      💡 <strong>Dica Didática:</strong> Veja que os dados são rotulados pela chave <code>name</code> definida no HTML. Sem o atributo <code>name="..."</code>, o navegador ignora a variável correspondente e ela não chega ao servidor!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Audit View */}
            {activeTab === "audit" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-wider text-muted-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" /> Análise de Boas Práticas do HTML
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Análise em tempo real do código que você está escrevendo no editor.
                  </p>
                </div>

                <div className="space-y-3">
                  {audits.map((audit, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 border rounded-xl flex gap-3 ${
                        audit.type === "success" 
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-900 dark:text-emerald-300"
                          : audit.type === "warning"
                          ? "bg-amber-500/5 border-amber-500/20 text-amber-900 dark:text-amber-300"
                          : "bg-destructive/5 border-destructive/20 text-destructive dark:text-destructive"
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {audit.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                        {audit.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                        {audit.type === "error" && <AlertTriangle className="w-5 h-5 text-destructive" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-none mb-1 text-foreground">
                          {audit.title}
                        </h4>
                        <p className="text-xs opacity-90 leading-relaxed">
                          {audit.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {audits.length === 0 && (
                    <p className="text-sm text-center py-8 text-muted-foreground italic">
                      Nenhum elemento de formulário detectado no código para auditoria.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
