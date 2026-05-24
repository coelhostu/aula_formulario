import React from "react";
import { Lightbulb, AlertTriangle, Accessibility } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  type: "dica" | "atencao" | "acessibilidade";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const config = {
    dica: {
      icon: Lightbulb,
      className: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-200",
      iconClassName: "text-blue-600 dark:text-blue-400",
      defaultTitle: "Dica",
    },
    atencao: {
      icon: AlertTriangle,
      className: "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200",
      iconClassName: "text-amber-600 dark:text-amber-400",
      defaultTitle: "Atenção",
    },
    acessibilidade: {
      icon: Accessibility,
      className: "bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950/30 dark:border-purple-900 dark:text-purple-200",
      iconClassName: "text-purple-600 dark:text-purple-400",
      defaultTitle: "Acessibilidade",
    },
  };

  const { icon: Icon, className, iconClassName, defaultTitle } = config[type];

  return (
    <div className={cn("my-6 p-4 rounded-xl border flex gap-4 items-start", className)}>
      <div className="shrink-0 mt-1">
        <Icon className={cn("w-5 h-5", iconClassName)} />
      </div>
      <div>
        <h4 className="font-bold text-sm mb-1">{title || defaultTitle}</h4>
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}
