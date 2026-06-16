// Resolve assets em src/assets/ de forma robusta no Vite (dev e build).
// Uso: asset("bg-home.webp") ou asset("timeline/t01.webp")
const modules = import.meta.glob("../assets/**/*.{webp,svg,png,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function asset(name: string): string {
  const found = Object.entries(modules).find(([path]) => path.endsWith("/" + name));
  return found ? found[1] : "";
}
