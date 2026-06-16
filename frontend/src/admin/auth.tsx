import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase, API_CONFIGURED, ApiError } from "../lib/supabase";

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

const DEMO_TOKEN_KEY = "cda_demo_token";

function toAdminUser(supaUser: { email?: string; user_metadata?: { nome?: string } } | null): AdminUser {
  if (!supaUser) return null;
  return { nome: supaUser.user_metadata?.nome || "Equipe CDA", email: supaUser.email || "" };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!API_CONFIGURED) {
      // modo demo (sem backend): logado se houver token salvo
      setUser(localStorage.getItem(DEMO_TOKEN_KEY) ? { nome: "Equipe CDA", email: "equipe@escolacda.com.br" } : null);
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(toAdminUser(data.session?.user ?? null));
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(toAdminUser(session?.user ?? null));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const login = async (email: string, senha: string) => {
    if (!API_CONFIGURED) {
      // modo demo: aceita qualquer credencial
      localStorage.setItem(DEMO_TOKEN_KEY, "1");
      setUser({ nome: "Equipe CDA", email });
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) throw new ApiError("E-mail ou senha incorretos.");
    setUser(toAdminUser(data.user));
  };

  const logout = async () => {
    if (!API_CONFIGURED) {
      localStorage.removeItem(DEMO_TOKEN_KEY);
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuth: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
