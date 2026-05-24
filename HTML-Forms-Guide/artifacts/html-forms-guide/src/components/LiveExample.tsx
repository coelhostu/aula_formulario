import React from "react";

interface LiveExampleProps {
  children: React.ReactNode;
  title?: string;
}

export function LiveExample({ children, title = "Exemplo ao Vivo" }: LiveExampleProps) {
  return (
    <div className="my-6 rounded-xl border border-primary/20 bg-card shadow-sm overflow-hidden">
      <div className="px-4 py-2 bg-primary/5 border-b border-primary/10">
        <span className="text-sm font-medium text-primary flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {title}
        </span>
      </div>
      <div className="p-6">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {children}
        </form>
      </div>
    </div>
  );
}
