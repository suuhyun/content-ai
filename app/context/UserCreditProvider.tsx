"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useAuth } from "@clerk/nextjs";

export const UserCreditContext = createContext({
  totalCredit: 0,
  deductCredit: async (points: number) => {},
});

export function UserCreditProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const { userId } = useAuth();
  
  const fetchCredits = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/credits`);
      if (!response.ok) throw new Error("Failed to fetch credits");
      const data = await response.json();
      setTotalCredit(data.totalCredit);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  }, [totalCredit, userId]);

  const deductCredit = async (points: number) => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/credits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points }),
      });

      if (!response.ok) {
        throw new Error("Failed to deduct credit");
      }

      const data = await response.json();
      setTotalCredit(data.newCredit);
    } catch (error) {
      console.error("Error deducting credits:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchCredits();
  }, [userId, fetchCredits]);

  return (
    <UserCreditContext.Provider
      value={{ totalCredit, deductCredit }}
    >
      {children}
    </UserCreditContext.Provider>
  );
}

export function useUserCredit() {
  const context = useContext(UserCreditContext);
  return context;
}
