import React, { createContext, useContext } from "react";
import { RootStore } from "./rootStore";

export const StoreContext = createContext<RootStore | null>(null);

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const rootStore = new RootStore();
  return <StoreContext value={rootStore}>{children}</StoreContext>;
};

export function useStoreProvider() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreProvider used outside of context");
  }

  return context;
}

export default StoreProvider;
