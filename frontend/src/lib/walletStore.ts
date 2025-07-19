import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  isConnected: boolean;
  walletName: string | null;
  walletAddress: string | null;
  connectedAt: string | null;
  isAutoConnecting: boolean;
  manuallyDisconnected: boolean;

  // Actions
  setConnected: (walletName: string, walletAddress: string) => void;
  setDisconnected: () => void;
  setAutoConnecting: (isConnecting: boolean) => void;
  setManuallyDisconnected: (disconnected: boolean) => void;
  clearState: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      isConnected: false,
      walletName: null,
      walletAddress: null,
      connectedAt: null,
      isAutoConnecting: false,
      manuallyDisconnected: false,

      setConnected: (walletName: string, walletAddress: string) => {
        set({
          isConnected: true,
          walletName,
          walletAddress,
          connectedAt: new Date().toISOString(),
          isAutoConnecting: false,
          manuallyDisconnected: false,
        });
        console.log("Wallet state updated: Connected", {
          walletName,
          walletAddress,
        });
      },

      setDisconnected: () => {
        set({
          isConnected: false,
          walletName: null,
          walletAddress: null,
          connectedAt: null,
          isAutoConnecting: false,
          manuallyDisconnected: true,
        });
        console.log("Wallet state updated: Disconnected");
      },

      setAutoConnecting: (isConnecting: boolean) => {
        set({ isAutoConnecting: isConnecting });
        console.log("Wallet state updated: Auto-connecting", isConnecting);
      },

      setManuallyDisconnected: (disconnected: boolean) => {
        set({ manuallyDisconnected: disconnected });
        console.log(
          "Wallet state updated: Manually disconnected",
          disconnected
        );
      },

      clearState: () => {
        set({
          isConnected: false,
          walletName: null,
          walletAddress: null,
          connectedAt: null,
          isAutoConnecting: false,
          manuallyDisconnected: false,
        });
        console.log("Wallet state cleared");
      },
    }),
    {
      name: "sharedspace-wallet-storage",
      partialize: (state) => ({
        isConnected: state.isConnected,
        walletName: state.walletName,
        walletAddress: state.walletAddress,
        connectedAt: state.connectedAt,
        manuallyDisconnected: state.manuallyDisconnected,
      }),
    }
  )
);
