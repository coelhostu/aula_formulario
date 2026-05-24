import React, { useMemo, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Sparkles } from "lucide-react";

const TYPES = [
  "text",
  "email",
  "password",
  "number",
  "tel",
  "url",
  "search",
  "date",
  "color",
] as const;

type InputType = (typeof TYPES)[number];

export function AttributePlayground() {
  const [type, setType] = useState<InputType>("text");
  const [placeholder, setPlaceholder] = useState("Digite aqui...");
  const [required, setRequired] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [minLength, setMinLength] = useState<number | "">("");
  const [maxLength, setMaxLength] = useState<number | "">("");
  const [pattern, setPattern] = useState("");
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [step, setStep] = useState<string>("");

  const showMinMax = type === "number" || type === "date";
  const showLengthAndPattern =
    type === "text" || type === "password" || type === "tel" || type === "url" || type === "search";

  const code = useMemo(() => {
    const attrs: string[] = [`type="${type}"`];
    if (placeholder) attrs.push(`placeholder="${placeholder}"`);
    if (required) attrs.push("required");
    if (disabled) attrs.push("disabled");
    if (readOnly) attrs.push("readonly");
    if (showLengthAndPattern && minLength !== "") attrs.push(`minlength="${minLength}"`);
    if (showLengthAndPattern && maxLength !== "") attrs.push(`maxlength="${maxLength}"`);
    if (showLengthAndPattern && pattern) attrs.push(`pattern="${pattern}"`);
    if (showMinMax && min) attrs.push(`min="${min}"`);
    if (showMinMax && max) attrs.push(`max="${max}"`);
    if (showMinMax && step) attrs.push(`step="${step}"`);

    if (attrs.length <= 2) return `<input ${attrs.join(" ")} />`;
    return `<input\n  ${attrs.join("\n  ")}\n/>`;
  }, [
    type,
    placeholder,
    required,
    disabled,
    readOnly,
    minLength,
    maxLength,
    pattern,
    min,
    max,
    step,
    showLengthAndPattern,
    showMinMax,
  ]);

  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-card/50 overflow-hidden shadow-sm">
      <div className="px-5 py-3 bg-primary/5 border-b border-primary/10 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">
          Experimente: Playground de Atributos
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-border/60 space-y-4 bg-background/40">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as InputType)}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-mono"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              placeholder
            </label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Toggle label="required" checked={required} onChange={setRequired} />
            <Toggle label="disabled" checked={disabled} onChange={setDisabled} />
            <Toggle label="readonly" checked={readOnly} onChange={setReadOnly} />
          </div>

          {showLengthAndPattern && (
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/40">
              <NumberField
                label="minlength"
                value={minLength}
                onChange={setMinLength}
              />
              <NumberField
                label="maxlength"
                value={maxLength}
                onChange={setMaxLength}
              />
              <div className="col-span-2 space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  pattern (regex)
                </label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="[A-Za-z]+"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-mono"
                />
              </div>
            </div>
          )}

          {showMinMax && (
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/40">
              <TextField label="min" value={min} onChange={setMin} />
              <TextField label="max" value={max} onChange={setMax} />
              <TextField label="step" value={step} onChange={setStep} />
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col gap-4 bg-card">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Resultado ao vivo
            </p>
            <input
              key={type}
              type={type}
              placeholder={placeholder || undefined}
              required={required}
              disabled={disabled}
              readOnly={readOnly}
              minLength={
                showLengthAndPattern && minLength !== "" ? Number(minLength) : undefined
              }
              maxLength={
                showLengthAndPattern && maxLength !== "" ? Number(maxLength) : undefined
              }
              pattern={showLengthAndPattern && pattern ? pattern : undefined}
              min={showMinMax && min ? min : undefined}
              max={showMinMax && max ? max : undefined}
              step={showMinMax && step ? step : undefined}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed read-only:bg-muted/40 invalid:border-destructive invalid:ring-destructive/20"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Tente digitar algo inválido para ver a borda mudar de cor.
            </p>
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              HTML gerado
            </p>
            <div className="rounded-lg overflow-hidden bg-[#1e1e1e] text-sm">
              <Highlight theme={themes.vsDark} code={code} language="html">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={className + " p-4 overflow-x-auto"}
                    style={{ ...style, backgroundColor: "transparent" }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-mono cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-primary"
      />
      {label}
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | "";
  onChange: (v: number | "") => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-mono"
      />
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-mono"
      />
    </div>
  );
}
