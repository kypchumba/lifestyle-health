import Link from "next/link";

const variants = {
  primary: "bg-leaf-800 text-white hover:bg-leaf-900 focus-visible:ring-leaf-700",
  secondary:
    "border border-leaf-800 bg-white text-leaf-900 hover:bg-leaf-50 focus-visible:ring-leaf-700",
  ghost: "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400"
};

export default function Button({
  href,
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
