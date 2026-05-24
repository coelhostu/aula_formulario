import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowRight, Check, AlertTriangle, Layers } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { LiveExample } from "@/components/LiveExample";
import { Callout } from "@/components/Callout";
import { Quiz } from "@/components/interactive/Quiz";
import { GetVsPost } from "@/components/interactive/GetVsPost";
import { FieldsetBuilder } from "@/components/interactive/FieldsetBuilder";
import { AttributePlayground } from "@/components/interactive/AttributePlayground";
import { PatternValidator } from "@/components/interactive/PatternValidator";
import { BestPracticesChecklist } from "@/components/interactive/BestPracticesChecklist";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CHAPTERS = [
  { id: "intro", title: "Introdução: O que é um formulário?" },
  { id: "form-tag", title: "A tag <form>" },
  { id: "input-tag", title: "<input>: o coração do formulário" },
  { id: "basic-inputs", title: "Tipos de <input> básicos" },
  { id: "selection-inputs", title: "Tipos de <input> de seleção" },
  { id: "datetime-inputs", title: "Tipos de <input> de data e hora" },
  { id: "special-inputs", title: "Tipos de <input> especiais" },
  { id: "label", title: "<label>: acessibilidade vem primeiro" },
  { id: "textarea", title: "<textarea>" },
  { id: "select", title: "<select>, <option>, <optgroup>" },
  { id: "fieldset", title: "<fieldset> e <legend>" },
  { id: "datalist", title: "<datalist>" },
  { id: "button", title: "<button>" },
  { id: "attributes", title: "Atributos importantes de <input>" },
  { id: "validation", title: "Validação nativa do HTML" },
  { id: "example", title: "Formulário completo: exemplo final" },
  { id: "best-practices", title: "Boas práticas e dicas finais" },
];

function Section({ id, title, index, children }: { id: string; title: string; index: number; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      className="py-12 md:py-20 scroll-mt-24 border-b border-border/50 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="text-4xl md:text-6xl font-serif text-primary/20 font-bold leading-none select-none">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground">
          {title}
        </h2>
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-a:text-accent hover:prose-a:text-accent/80 prose-p:leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b z-40 flex items-center justify-between px-4">
        <span className="font-serif font-bold text-lg text-primary">HTML Forms</span>
        <div className="flex items-center gap-2">
          <Link href="/visualizar">
            <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-primary font-medium">
              <Layers className="w-4 h-4" /> Lab
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-card border-r transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen overflow-y-auto ${
          menuOpen ? "translate-x-0 pt-16" : "-translate-x-full"
        }`}
      >
        <div className="p-6 md:pt-12">
          <h2 className="text-xl font-serif font-bold text-primary mb-2 hidden md:block">
            Guia de Formulários
          </h2>
          <Link href="/visualizar">
            <button className="w-full flex items-center justify-between px-3 py-2.5 mb-6 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors text-sm font-semibold gap-2 cursor-pointer">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4" /> Laboratório Visual
              </span>
              <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-mono font-bold animate-pulse">NOVO</span>
            </button>
          </Link>
          <nav className="space-y-1">
            {CHAPTERS.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => scrollTo(chapter.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeId === chapter.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="opacity-50 mr-2">{index + 1}.</span>
                {chapter.title.split(":")[0]}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl px-6 md:px-12 pt-24 md:pt-20 pb-32">
        {/* Hero Section */}
        <section className="py-20 md:py-32 flex flex-col items-start min-h-[80vh] justify-center">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Guia Didático
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
            Guia Completo de <br />
            <span className="text-primary italic">Formulários HTML</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            Do básico ao avançado, aprenda a criar formulários acessíveis, semânticos e bonitos. Focado 100% no poder nativo do HTML.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 transition-transform hover:scale-105 cursor-pointer"
              onClick={() => scrollTo(CHAPTERS[0].id)}
            >
              Começar a aprender <ArrowRight className="ml-2" />
            </Button>
            <Link href="/visualizar">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 rounded-full shadow-lg border border-border/60 transition-transform hover:scale-105 w-full sm:w-auto gap-2 cursor-pointer font-medium"
              >
                <Layers className="w-5 h-5 text-primary" /> Abrir Laboratório
              </Button>
            </Link>
          </div>
        </section>

        {/* Content Sections */}
        <div className="space-y-12">
          <Section id="intro" title={CHAPTERS[0].title} index={1}>
            <p>
              Os formulários são a principal forma de interação entre um usuário e um site. Sem eles, a web seria apenas um meio de leitura, como uma revista. Com formulários, a web se torna interativa: você pode fazer login, buscar produtos, enviar mensagens e comprar online.
            </p>
            <p>
              O modelo mental básico de um formulário é simples: ele coleta dados do usuário e os envia para um servidor processar. Neste guia, vamos focar exclusivamente na parte do navegador — o HTML — que é responsável por coletar esses dados de forma clara e acessível.
            </p>
            <Callout type="dica" title="Não precisa de JavaScript!">
              Muitos desenvolvedores modernos correm para usar JavaScript (React, Vue) para gerenciar formulários, mas o HTML puro já oferece muitas ferramentas poderosas para validação e envio de dados de graça.
            </Callout>
          </Section>

          <Section id="form-tag" title={CHAPTERS[1].title} index={2}>
            <p>
              A tag <code>&lt;form&gt;</code> é o contêiner de todos os seus campos. Ela avisa ao navegador: "tudo aqui dentro pertence ao mesmo grupo de dados que será enviado junto".
            </p>
            <p>Os dois atributos mais importantes são:</p>
            <ul>
              <li><strong>action:</strong> A URL para onde os dados serão enviados.</li>
              <li><strong>method:</strong> Como os dados serão enviados (geralmente <code>GET</code> ou <code>POST</code>).</li>
            </ul>
            <CodeBlock code={`<form action="/buscar" method="GET">
  <!-- campos do formulário aqui -->
</form>`} />
            <Callout type="atencao" title="GET vs POST">
              Use <strong>GET</strong> para buscas e filtros (os dados vão na URL). Use <strong>POST</strong> quando a ação modifica dados no servidor, como criar uma conta ou enviar um pagamento (os dados vão no corpo da requisição, mais seguros).
            </Callout>
            <GetVsPost />
          </Section>

          <Section id="input-tag" title={CHAPTERS[2].title} index={3}>
            <p>
              A tag <code>&lt;input&gt;</code> é o verdadeiro coração do formulário. É uma tag vazia (não precisa de fechamento) que muda completamente de comportamento dependendo do seu atributo <code>type</code>.
            </p>
            <p>
              Outro atributo crucial é o <code>name</code>. Sem ele, o servidor não saberá como identificar o dado enviado. O <code>value</code> é o valor atual do campo.
            </p>
            <CodeBlock code={`<input type="text" name="primeiro_nome" value="João">`} />
          </Section>

          <Section id="basic-inputs" title={CHAPTERS[3].title} index={4}>
            <p>
              Existem vários tipos básicos de texto. O navegador adapta o teclado em dispositivos móveis dependendo do tipo!
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">text & password</h3>
                <p>O <code>text</code> é o padrão. O <code>password</code> oculta os caracteres digitados.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold">email, tel, url, number, search</h3>
                <p>Estes ativam teclados específicos no celular e trazem validações nativas.</p>
              </div>
            </div>
            
            <LiveExample title="Inputs Básicos">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Texto (text)</Label>
                  <Input type="text" placeholder="Qualquer texto" />
                </div>
                <div className="space-y-2">
                  <Label>Senha (password)</Label>
                  <Input type="password" placeholder="Sua senha secreta" />
                </div>
                <div className="space-y-2">
                  <Label>E-mail (email)</Label>
                  <Input type="email" placeholder="nome@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label>Número (number)</Label>
                  <Input type="number" placeholder="Apenas números" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone (tel)</Label>
                  <Input type="tel" placeholder="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label>URL (url)</Label>
                  <Input type="url" placeholder="https://..." />
                </div>
              </div>
            </LiveExample>
            <CodeBlock code={`<input type="text" name="nome">
<input type="password" name="senha">
<input type="email" name="email">
<input type="number" name="idade">
<input type="tel" name="telefone">
<input type="url" name="site">`} />
            <Quiz
              question="Qual type de input deve ser usado para coletar um número de telefone, especialmente em mobile?"
              options={[
                { id: "a", text: "type=\"tel\"", isCorrect: true, explanation: "Correto. type=tel mostra um teclado numérico em dispositivos móveis e indica semanticamente que é um telefone." },
                { id: "b", text: "type=\"number\"", isCorrect: false, explanation: "type=number trata o valor como número e não aceita formatos como (11) 99999-9999. Use tel." },
                { id: "c", text: "type=\"text\"", isCorrect: false, explanation: "Funciona, mas perde a vantagem do teclado numérico no mobile e a semântica." },
                { id: "d", text: "type=\"phone\"", isCorrect: false, explanation: "Esse tipo não existe no HTML. O correto é tel." },
              ]}
            />
          </Section>

          <Section id="selection-inputs" title={CHAPTERS[4].title} index={5}>
            <p>
              Para selecionar opções, usamos os tipos <code>checkbox</code> e <code>radio</code>. Também temos inputs divertidos como <code>color</code> e <code>range</code>.
            </p>
            <LiveExample title="Inputs de Seleção">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="check-ex" className="w-4 h-4 accent-primary" />
                  <Label htmlFor="check-ex">Aceito os termos de uso (checkbox)</Label>
                </div>
                <div className="space-y-2">
                  <Label className="block mb-2">Escolha uma opção (radio):</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="rad1" name="escolha" className="w-4 h-4 accent-primary" />
                      <Label htmlFor="rad1">Opção A</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="rad2" name="escolha" className="w-4 h-4 accent-primary" />
                      <Label htmlFor="rad2">Opção B</Label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="space-y-2">
                    <Label>Cor (color)</Label>
                    <input type="color" className="block w-12 h-12 p-1 rounded cursor-pointer" defaultValue="#0f766e" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label>Intervalo (range)</Label>
                    <input type="range" className="w-full accent-primary" />
                  </div>
                </div>
              </div>
            </LiveExample>
            <CodeBlock code={`<input type="checkbox" name="termos">
<input type="radio" name="opcao" value="A">
<input type="radio" name="opcao" value="B">
<input type="color" name="cor">
<input type="range" name="volume">`} />
            <Callout type="atencao">
              Note que os botões de <strong>radio</strong> precisam ter exatamente o mesmo atributo <code>name</code> para que o navegador entenda que eles pertencem ao mesmo grupo (ou seja, quando você seleciona um, o outro é desmarcado).
            </Callout>
          </Section>

          <Section id="datetime-inputs" title={CHAPTERS[5].title} index={6}>
            <p>
              Lidar com datas costumava ser um pesadelo e exigia bibliotecas pesadas de JavaScript. Hoje, os navegadores modernos possuem ótimos seletores nativos.
            </p>
            <LiveExample title="Inputs de Data e Hora">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data (date)</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Hora (time)</Label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <Label>Data e Hora (datetime-local)</Label>
                  <Input type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label>Mês (month)</Label>
                  <Input type="month" />
                </div>
              </div>
            </LiveExample>
            <CodeBlock code={`<input type="date" name="nascimento" min="1900-01-01" max="2024-12-31">
<input type="time" name="horario">
<input type="datetime-local" name="agendamento">
<input type="month" name="validade_cartao">`} />
          </Section>

          <Section id="special-inputs" title={CHAPTERS[6].title} index={7}>
            <p>
              Existem alguns tipos especiais. O <code>file</code> permite anexar documentos. O <code>hidden</code> envia dados invisíveis para o usuário (como IDs). E temos os tipos de botão antigos (<code>submit</code>, <code>reset</code>), embora hoje seja mais comum usar a tag <code>&lt;button&gt;</code>.
            </p>
            <LiveExample title="Inputs Especiais">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Envio de arquivo (file)</Label>
                  <Input type="file" accept="image/png, image/jpeg" multiple />
                </div>
                <div className="flex gap-2">
                  <Input type="submit" value="Input Submit" className="bg-primary text-primary-foreground cursor-pointer w-auto" />
                  <Input type="reset" value="Input Reset" className="bg-secondary text-secondary-foreground cursor-pointer w-auto" />
                </div>
              </div>
            </LiveExample>
            <CodeBlock code={`<!-- Aceita apenas imagens, e permite multiplos arquivos -->
<input type="file" name="fotos" accept="image/*" multiple>

<!-- Campo invisível mas que é enviado ao servidor -->
<input type="hidden" name="usuario_id" value="12345">`} />
            <Quiz
              question="Qual atributo permite que o usuário envie mais de um arquivo de uma só vez?"
              options={[
                { id: "a", text: "multiple", isCorrect: true, explanation: "Isso mesmo. Basta adicionar o atributo multiple ao input type=file." },
                { id: "b", text: "files", isCorrect: false, explanation: "Não existe. O atributo certo é multiple." },
                { id: "c", text: "many", isCorrect: false, explanation: "Não existe esse atributo no HTML." },
                { id: "d", text: "accept", isCorrect: false, explanation: "accept filtra os tipos de arquivo (ex: image/*), não a quantidade." },
              ]}
            />
          </Section>

          <Section id="label" title={CHAPTERS[7].title} index={8}>
            <p>
              A tag <code>&lt;label&gt;</code> é fundamental. Ela associa um texto explicativo a um campo de formulário.
            </p>
            <Callout type="acessibilidade" title="Por que usar labels?">
              1. Leitores de tela leem o label para o usuário cego saber o que digitar.<br/>
              2. Ao clicar no texto do label, o navegador foca no input correspondente (ótimo para checkboxes pequenos em celulares!).
            </Callout>
            <p>Existem duas formas de associar um label ao seu input:</p>
            
            <div className="grid md:grid-cols-2 gap-8 my-6">
              <div>
                <h4 className="font-bold mb-2">Forma 1: Usando for e id</h4>
                <CodeBlock code={`<label for="email_id">Seu E-mail</label>
<input type="email" id="email_id" name="email">`} />
              </div>
              <div>
                <h4 className="font-bold mb-2">Forma 2: Embrulhando o input</h4>
                <CodeBlock code={`<label>
  Seu E-mail
  <input type="email" name="email">
</label>`} />
              </div>
            </div>
          </Section>

          <Section id="textarea" title={CHAPTERS[8].title} index={9}>
            <p>
              Quando você precisa de várias linhas de texto (uma biografia, um comentário), não use <code>&lt;input type="text"&gt;</code>. Use a tag <code>&lt;textarea&gt;</code>.
            </p>
            <LiveExample title="Textarea">
              <div className="space-y-2">
                <Label htmlFor="bio">Sua Biografia</Label>
                <Textarea id="bio" placeholder="Conte-nos sobre você..." rows={4} />
              </div>
            </LiveExample>
            <CodeBlock code={`<textarea name="biografia" rows="4" cols="50" placeholder="Conte-nos sobre você..."></textarea>`} />
            <Callout type="atencao">
              Note que o <code>&lt;textarea&gt;</code> não possui o atributo <code>value</code>. O texto inicial deve ir dentro da tag: <code>&lt;textarea&gt;Texto inicial&lt;/textarea&gt;</code>.
            </Callout>
          </Section>

          <Section id="select" title={CHAPTERS[9].title} index={10}>
            <p>
              Para listas suspensas (dropdowns), usamos uma combinação de <code>&lt;select&gt;</code> e <code>&lt;option&gt;</code>. Podemos agrupar opções com <code>&lt;optgroup&gt;</code>.
            </p>
            <LiveExample title="Select">
              <div className="space-y-2">
                <Label htmlFor="pais">País</Label>
                <select id="pais" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Selecione um país...</option>
                  <optgroup label="América do Sul">
                    <option value="br">Brasil</option>
                    <option value="ar">Argentina</option>
                    <option value="uy">Uruguai</option>
                  </optgroup>
                  <optgroup label="Europa">
                    <option value="pt">Portugal</option>
                    <option value="es">Espanha</option>
                  </optgroup>
                </select>
              </div>
            </LiveExample>
            <CodeBlock code={`<select name="pais" required>
  <option value="">Selecione um país...</option>
  
  <optgroup label="América do Sul">
    <option value="br">Brasil</option>
    <option value="ar">Argentina</option>
  </optgroup>
  
  <optgroup label="Europa">
    <option value="pt" selected>Portugal</option>
  </optgroup>
</select>`} />
            <Quiz
              question="Como permitir que o usuário selecione mais de uma opção em um <select>?"
              options={[
                { id: "a", text: "Adicionando o atributo multiple no <select>", isCorrect: true, explanation: "Exato. Com multiple, o usuário pode segurar Ctrl (ou Cmd) para escolher várias opções." },
                { id: "b", text: "Usando type=\"multi\"", isCorrect: false, explanation: "<select> não tem o atributo type. O correto é multiple." },
                { id: "c", text: "Repetindo o <select> várias vezes", isCorrect: false, explanation: "Funciona, mas é ruim de usar. Multiple resolve em um campo só." },
                { id: "d", text: "Usando aria-multi", isCorrect: false, explanation: "aria-multi não é um atributo HTML padrão para essa função." },
              ]}
            />
          </Section>

          <Section id="fieldset" title={CHAPTERS[10].title} index={11}>
            <p>
              Quando temos um grupo grande de campos relacionados, usamos o <code>&lt;fieldset&gt;</code>. O título visual desse grupo é definido pela tag <code>&lt;legend&gt;</code>. Isso é excelente para formulários longos.
            </p>
            <LiveExample title="Fieldset">
              <fieldset className="border border-border/60 p-4 rounded-md mt-2">
                <legend className="text-sm font-semibold px-2 text-primary">Endereço de Entrega</legend>
                <div className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" placeholder="00000-000" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="rua">Rua</Label>
                      <Input id="rua" placeholder="Nome da rua" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="num">Número</Label>
                      <Input id="num" placeholder="123" />
                    </div>
                  </div>
                </div>
              </fieldset>
            </LiveExample>
            <CodeBlock code={`<fieldset>
  <legend>Endereço de Entrega</legend>
  
  <label for="cep">CEP</label>
  <input type="text" id="cep" name="cep">
  
  <label for="rua">Rua</label>
  <input type="text" id="rua" name="rua">
</fieldset>`} />
            <FieldsetBuilder />
          </Section>

          <Section id="datalist" title={CHAPTERS[11].title} index={12}>
            <p>
              Uma funcionalidade incrível e pouco conhecida do HTML é o <code>&lt;datalist&gt;</code>. Ele cria um input de texto comum, mas que sugere opções conforme você digita (autocompletar).
            </p>
            <LiveExample title="Datalist">
              <div className="space-y-2">
                <Label htmlFor="navegador">Seu navegador favorito</Label>
                <Input id="navegador" list="navegadores" placeholder="Comece a digitar..." />
                <datalist id="navegadores">
                  <option value="Chrome" />
                  <option value="Firefox" />
                  <option value="Safari" />
                  <option value="Edge" />
                  <option value="Opera" />
                </datalist>
              </div>
            </LiveExample>
            <CodeBlock code={`<label for="navegador">Seu navegador favorito</label>
<input type="text" id="navegador" name="navegador" list="navegadores">

<datalist id="navegadores">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>`} />
            <Callout type="dica">
              A mágica acontece conectando o atributo <code>list</code> do input ao <code>id</code> do datalist. Diferente do <code>&lt;select&gt;</code>, o usuário ainda pode digitar um valor que não está na lista!
            </Callout>
          </Section>

          <Section id="button" title={CHAPTERS[12].title} index={13}>
            <p>
              Embora exista o <code>&lt;input type="submit"&gt;</code>, a tag moderna recomendada é o <code>&lt;button&gt;</code>. A grande vantagem é que um <code>&lt;button&gt;</code> pode conter HTML dentro dele (como ícones, spans, formatações complexas).
            </p>
            <p>Sempre defina o atributo <code>type</code> de um botão. Se você não definir, o padrão do navegador é <code>type="submit"</code>, o que pode causar envios acidentais de formulário!</p>
            <ul>
              <li><strong>submit:</strong> Envia o formulário.</li>
              <li><strong>button:</strong> Não faz nada nativamente (ideal para botões acionados via JavaScript).</li>
              <li><strong>reset:</strong> Limpa o formulário (raramente usado hoje em dia).</li>
            </ul>
            <CodeBlock code={`<!-- Muito melhor que <input type="submit"> -->
<button type="submit">
  <img src="icone.svg" alt="">
  Enviar Formulário
</button>`} />
          </Section>

          <Section id="attributes" title={CHAPTERS[13].title} index={14}>
            <p>
              Os atributos dos inputs dão "superpoderes" a eles.
            </p>
            <LiveExample title="Atributos Comuns">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>placeholder (dica visual)</Label>
                  <Input placeholder="Ex: João da Silva" />
                </div>
                <div className="space-y-2">
                  <Label>readonly (apenas leitura)</Label>
                  <Input value="Não pode ser alterado" readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>disabled (desabilitado)</Label>
                  <Input value="Desativado" disabled />
                </div>
                <div className="space-y-2">
                  <Label>min/max/step (numéricos)</Label>
                  <Input type="number" min="0" max="100" step="10" placeholder="0 a 100 (de 10 em 10)" />
                </div>
              </div>
            </LiveExample>
            <CodeBlock code={`<input type="text" placeholder="Digite aqui">
<input type="text" value="Fixo" readonly>
<input type="text" value="Cinza e sem clique" disabled>
<input type="number" min="1" max="10" step="2">
<input type="text" maxlength="50" minlength="5">
<input type="text" autofocus> <!-- Foca automaticamente ao carregar a página -->
`} />
            <AttributePlayground />
            <Quiz
              question="Qual atributo torna o preenchimento de um campo obrigatório?"
              options={[
                { id: "a", text: "required", isCorrect: true, explanation: "Perfeito. Basta colocar required no input — sem JavaScript, o navegador impede o envio." },
                { id: "b", text: "mandatory", isCorrect: false, explanation: "Não existe esse atributo no HTML." },
                { id: "c", text: "needed", isCorrect: false, explanation: "Não existe esse atributo no HTML." },
                { id: "d", text: "must", isCorrect: false, explanation: "Não existe. O atributo certo é required." },
              ]}
            />
          </Section>

          <Section id="validation" title={CHAPTERS[14].title} index={15}>
            <p>
              O HTML5 introduziu validação nativa. O navegador pode impedir o envio do formulário e mostrar mensagens de erro sem uma única linha de JavaScript.
            </p>
            <p>O atributo mais importante é o <code>required</code>. Outro muito poderoso é o <code>pattern</code>, que aceita uma Expressão Regular (Regex).</p>
            
            <LiveExample title="Validação (Tente enviar em branco)">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="val_email">E-mail Obrigatório</Label>
                  <input id="val_email" type="email" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-destructive" placeholder="seu@email.com" />
                  <p className="text-xs text-destructive hidden peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block">Por favor insira um email válido.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="val_cep">CEP (Pattern: 5 números, hífen, 3 números)</Label>
                  <input id="val_cep" type="text" required pattern="\d{5}-\d{3}" placeholder="12345-678" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-destructive" />
                  <p className="text-xs text-destructive hidden peer-invalid:[&:not(:placeholder-shown):not(:focus)]:block">O formato deve ser 00000-000.</p>
                </div>
                <Button type="submit">Enviar para testar validação</Button>
              </div>
            </LiveExample>

            <CodeBlock code={`<!-- Requer preenchimento -->
<input type="text" name="nome" required>

<!-- Deve seguir o formato exato 00000-000 -->
<input type="text" name="cep" pattern="\\d{5}-\\d{3}" title="Digite um CEP no formato 00000-000" required>`} />
            <Callout type="dica" title="A pseudo-classe :invalid no CSS">
              Você pode estilizar campos inválidos apenas com CSS usando <code>input:invalid</code>. É assim que fazemos a borda ficar vermelha quando o usuário digita um formato errado!
            </Callout>
            <PatternValidator />
          </Section>

          <Section id="example" title={CHAPTERS[15].title} index={16}>
            <p>
              Chegou a hora de juntar tudo. Abaixo, um formulário de cadastro completo utilizando as melhores práticas vistas até aqui.
            </p>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start my-8">
              <div className="border border-border rounded-xl p-6 bg-card shadow-sm sticky top-24">
                <h3 className="font-serif text-2xl font-bold mb-6 text-primary">Crie sua conta</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert("Formulário validado com sucesso pelo navegador!"); }} className="space-y-5">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="final_nome">Nome completo *</Label>
                      <Input id="final_nome" required placeholder="Maria" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="final_nasc">Nascimento *</Label>
                      <Input id="final_nasc" type="date" required max="2010-01-01" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final_email">E-mail *</Label>
                    <Input id="final_email" type="email" required placeholder="maria@exemplo.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final_senha">Senha (mínimo 8 caracteres) *</Label>
                    <Input id="final_senha" type="password" required minLength={8} />
                  </div>

                  <fieldset className="border border-border p-3 rounded-md">
                    <legend className="text-sm font-medium px-1 text-muted-foreground">Plano Desejado</legend>
                    <div className="flex gap-6 mt-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="plano_free" name="plano" required className="accent-primary w-4 h-4" defaultChecked />
                        <Label htmlFor="plano_free">Gratuito</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="plano_pro" name="plano" className="accent-primary w-4 h-4" />
                        <Label htmlFor="plano_pro">Pro</Label>
                      </div>
                    </div>
                  </fieldset>

                  <div className="space-y-2">
                    <Label htmlFor="final_bio">Fale um pouco sobre você</Label>
                    <Textarea id="final_bio" placeholder="Sou desenvolvedora..." rows={3}></Textarea>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="final_termos" required className="accent-primary w-4 h-4" />
                    <Label htmlFor="final_termos" className="text-sm">Eu concordo com os <a href="#" className="text-accent underline">Termos de Serviço</a> *</Label>
                  </div>

                  <Button type="submit" className="w-full mt-4 text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                    Finalizar Cadastro
                  </Button>
                </form>
              </div>

              <div className="text-sm">
                <CodeBlock code={`<form action="/api/cadastro" method="POST">

  <label for="nome">Nome completo *</label>
  <input type="text" id="nome" name="nome" required>

  <label for="nasc">Nascimento *</label>
  <input type="date" id="nasc" name="nasc" required max="2010-01-01">

  <label for="email">E-mail *</label>
  <input type="email" id="email" name="email" required autocomplete="email">

  <label for="senha">Senha *</label>
  <input type="password" id="senha" name="senha" required minlength="8">

  <fieldset>
    <legend>Plano Desejado</legend>
    <label>
      <input type="radio" name="plano" value="free" checked> Gratuito
    </label>
    <label>
      <input type="radio" name="plano" value="pro"> Pro
    </label>
  </fieldset>

  <label for="bio">Biografia</label>
  <textarea id="bio" name="bio" rows="3"></textarea>

  <label>
    <input type="checkbox" name="termos" required> 
    Concordo com os termos
  </label>

  <button type="submit">Finalizar Cadastro</button>

</form>`} />
              </div>
            </div>
          </Section>

          <Section id="best-practices" title={CHAPTERS[16].title} index={17}>
            <p>Para criar formulários com nível profissional, mantenha este checklist mental:</p>
            <ul className="space-y-4 my-6 list-none pl-0">
              <li className="flex gap-3">
                <Check className="text-primary mt-1 shrink-0" />
                <span><strong>Sempre use label:</strong> Nunca confie apenas no atributo <code>placeholder</code>. O placeholder desaparece quando o usuário digita. O label é sagrado.</span>
              </li>
              <li className="flex gap-3">
                <Check className="text-primary mt-1 shrink-0" />
                <span><strong>Use autocomplete:</strong> Ajude os usuários de celular. Atributos como <code>autocomplete="email"</code> ou <code>autocomplete="given-name"</code> fazem o navegador sugerir dados salvos.</span>
              </li>
              <li className="flex gap-3">
                <Check className="text-primary mt-1 shrink-0" />
                <span><strong>Escolha o tipo certo:</strong> Não use <code>type="text"</code> para tudo. Use <code>email</code>, <code>tel</code>, <code>number</code> para mostrar o teclado adequado nos celulares.</span>
              </li>
              <li className="flex gap-3">
                <Check className="text-primary mt-1 shrink-0" />
                <span><strong>Navegação por teclado:</strong> Seu formulário deve poder ser preenchido inteiro usando apenas a tecla <code>Tab</code> e <code>Enter</code>/<code>Espaço</code>. O HTML faz isso de graça se você usar as tags certas.</span>
              </li>
              <li className="flex gap-3 text-destructive">
                <AlertTriangle className="mt-1 shrink-0" />
                <span><strong>Nunca confie apenas no frontend!</strong> Validação HTML é para experiência do usuário. Pessoas mal-intencionadas podem burlar isso facilmente. O servidor sempre deve validar os dados novamente!</span>
              </li>
            </ul>

            <BestPracticesChecklist />

            <Quiz
              question={'No <label for="email">E-mail</label>, o atributo for deve coincidir com qual atributo do input?'}
              options={[
                { id: "a", text: "id", isCorrect: true, explanation: "Exato. for do label aponta para o id do input. Isso é o que conecta os dois para acessibilidade e cliques." },
                { id: "b", text: "name", isCorrect: false, explanation: "name é usado no envio dos dados ao servidor, não para conectar o label." },
                { id: "c", text: "type", isCorrect: false, explanation: "type define o tipo do input (text, email, etc), não tem ligação com label." },
                { id: "d", text: "value", isCorrect: false, explanation: "value é o conteúdo do campo. A conexão correta é for ↔ id." },
              ]}
            />

            <div className="mt-16 p-8 bg-primary text-primary-foreground rounded-2xl text-center shadow-xl">
              <h3 className="text-2xl font-serif font-bold mb-4">Pronto para criar formulários melhores?</h3>
              <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                O HTML é uma linguagem incrivelmente poderosa que evoluiu muito. Dominar seus fundamentos é o que separa um desenvolvedor que apenas empilha componentes de um que constrói interfaces sólidas e acessíveis.
              </p>
              <Button variant="secondary" size="lg" className="rounded-full px-8" onClick={() => window.scrollTo(0, 0)}>
                Voltar ao topo
              </Button>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}
