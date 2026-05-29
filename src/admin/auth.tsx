import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, getToken, setToken, API_CONFIGURED } from "../lib/api";

export type AdminUser = { nome: string; email: string } | null;

type AuthContextType = {
  user: AdminUser;
  loading: boolean;
  isAuth: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser>(null);
  const [loading, setLoading] = useState(true);

  // Ao carregar: se houver token, valida a sessão
  useEffect(() => {
    (async () => {
      if (!API_CONFIGURED) {
        // modo demo (sem backend): logado se houver token salvo
        setUser(getToken() ? { nome: "Equipe CDA", email: "equipe@escolacda.com.br" } : null);
        setLoading(false);
        return;
      }
      if (!getToken()) {
        setLoading(false);
        return;
      }
      try {
        // 🔌 Laravel/Sanctum: rota protegida que devolve o usuário logado
        const u = await api<AdminUser>("/api/user");
        setUser(u);
      } catch {
        setToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, senha: string) => {
    if (!API_CONFIGURED) {
      // modo demo: aceita qualquer credencial
      setToken("demo-token");
      setUser({ nome: "Equipe CDA", email });
      return;
    }
    // 🔌 Laravel/Sanctum (token): POST /api/login → { token, user }
    // No backend: $token = $user->createToken('painel')->plainTextToken;
    const data = await api<{ token: string; user: AdminUser }>("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password: senha }),
    });
    setToken(data.token);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      // 🔌 Laravel/Sanctum: revoga o token atual
      if (API_CONFIGURED && getToken()) await api("/api/logout", { method: "POST" });
    } catch {
      /* ignora erro de logout */
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuth: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
