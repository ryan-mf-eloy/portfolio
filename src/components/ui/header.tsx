import LanguageToggle from "./language-toggle";
import ThemeToggle from "./theme-toggle";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`flex flex-row items-center justify-end px-10 py-4 w-full max-h-32 ${className}`}
    >
      <ThemeToggle />
      <LanguageToggle />
    </header>
  );
}
