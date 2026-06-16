// Cliente HTTP central — conecta o front ao backend Laravel (Sanctum, modo token).
// Defina VITE_API_URL (ex.: https://api.escolacda.com.br) no .env / Vercel.
// Sem VITE_API_URL, o painel roda em "modo demo" (login aceita qualquer credencial).

const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export const API_CONFIGURED = !!BASE;

const TOKEN_KEY = "cda_token";
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string | null) => {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
};

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function api<T = unknown>(path: string, opts: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(BASE + path, {
    ...opts,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  });

  // sessão inválida/expirada → limpa token
  if (res.status === 401) {
    setToken(null);
    throw new ApiError(401, "Sessão expirada. Faça login novamente.");
  }
  if (!res.ok) {
    let msg = "Não foi possível completar a solicitação.";
    try {
      const data = await res.json();
      msg = (data && (data.message || data.error)) || msg;
    } catch {
      /* corpo não-JSON */
    }
    throw new ApiError(res.status, msg);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
