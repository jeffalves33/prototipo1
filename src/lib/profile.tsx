import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Profile } from "@/types/fleet";

interface ProfileCtx {
  profile: Profile | null;
  setProfile: (p: Profile | null) => void;
}

const Ctx = createContext<ProfileCtx>({ profile: null, setProfile: () => {} });

const KEY = "fleet:profile";

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "admin" || v === "driver" || v === "mechanic") setProfileState(v);
    } catch {
      /* ignore */
    }
  }, []);

  const setProfile = (p: Profile | null) => {
    setProfileState(p);
    try {
      if (p) localStorage.setItem(KEY, p);
      else localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  };

  return <Ctx.Provider value={{ profile, setProfile }}>{children}</Ctx.Provider>;
}

export const useProfile = () => useContext(Ctx);
