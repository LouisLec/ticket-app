import { cn } from "@/utils/classes";
import { FC, PropsWithChildren, ElementType } from "react";

export const Typography: FC<
  PropsWithChildren<{
    as?: ElementType;
    className?: string;
    soften?: boolean;
    style?:
      | "small"
      | "strong"
      | "em"
      | "code"
      | "sub"
      | "sup"
      | "big-xxx"
      | "big-xx"
      | "big-x"
      | "big"
      | "base"
      | "upper-detail"
      | "super-small";
  }>
> = ({
  as = "span",
  style = "base",
  children,
  soften = false,
  className,
  ...props
}) => {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "text-slate-900 dark:text-slate-100 ",
        style === "small"
          ? "text-sm"
          : style === "strong"
          ? "font-bold"
          : style === "em"
          ? "italic"
          : style === "code"
          ? "font-mono text-slate-300 bg-slate-900 dark:bg-slate-400 dark:text-black rounded p-1"
          : style === "sub"
          ? "text-sm"
          : style === "sup"
          ? "text-sm"
          : style === "big-xxx"
          ? "text-5xl font-cal"
          : style === "big-xx"
          ? "text-4xl font-cal"
          : style === "big-x"
          ? "text-3xl font-cal"
          : style === "big"
          ? "text-2xl font-cal"
          : style === "upper-detail"
          ? "text-xs uppercase tracking-wider text-slate-500 dark:text-slate-600 font-bold"
          : style === "super-small"
          ? "text-xs"
          : "",
        soften ? "text-slate-600 dark:text-slate-400" : "",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
