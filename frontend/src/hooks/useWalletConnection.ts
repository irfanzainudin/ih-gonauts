import {
  useCurrentWallet,
  useCurrentAccount,
  useConnectWallet,
  useWallets,
} from "@iota/dapp-kit";
import { useEffect, useState, useCallback, useRef } from "react";
import { useWalletStore } from "@/lib/walletStore";

interface WalletConnectionState {
  isConnected: boolean;
  walletAddress: string | undefined;
  walletName: string | undefined;
  currentWallet: ReturnType<typeof useCurrentWallet>;
  currentAccount: ReturnType<typeof useCurrentAccount>;
  isAutoConnecting: boolean;
  autoConnect: () => Promise<void>;
}

export const useWalletConnection = (): WalletConnectionState => {
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  const wallets = useWallets();
  const { mutate: connect } = useConnectWallet();

  // Zustand store
  const {
    isConnected: storeIsConnected,
    walletName: storeWalletName,
    isAutoConnecting: storeIsAutoConnecting,
    manuallyDisconnected,
    setConnected,
    setDisconnected,
    setAutoConnecting,
    setManuallyDisconnected,
  } = useWalletStore();

  // Local state for auto-connecting
  const [isAutoConnecting, setIsAutoConnecting] = useState(false);

  // Refs to track previous values and prevent infinite loops
  const prevWalletName = useRef<string | undefined>(undefined);
  const prevWalletAddress = useRef<string | undefined>(undefined);
  const prevIsConnected = useRef<boolean>(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Determine if wallet is actually connected
  const actualIsConnected = !!currentWallet?.currentWallet && !!currentAccount;
  const walletAddress = currentAccount?.address;
  const walletName = currentWallet?.currentWallet?.name;

  // Auto-connect functionality
  const autoConnect = useCallback(async () => {
    // Don't auto-connect if user manually disconnected
    if (manuallyDisconnected) {
      return;
    }

    try {
      setIsAutoConnecting(true);
      setAutoConnecting(true);

      // Get stored wallet info from Zustand store
      if (!storeWalletName || !storeIsConnected) {
        setIsAutoConnecting(false);
        setAutoConnecting(false);
        return;
      }

      // Find the wallet by name
      const targetWallet = wallets.find((w) => w.name === storeWalletName);
      if (!targetWallet) {
        console.log("Stored wallet not found:", storeWalletName);
        setDisconnected();
        setIsAutoConnecting(false);
        setAutoConnecting(false);
        return;
      }

      // Attempt to reconnect
      connect(
        { wallet: targetWallet },
        {
          onSuccess: () => {
            console.log("Auto-reconnected to wallet:", targetWallet.name);
            setIsAutoConnecting(false);
            setAutoConnecting(false);
          },
          onError: (error) => {
            console.error("Auto-reconnection failed:", error);
            setDisconnected();
            setIsAutoConnecting(false);
            setAutoConnecting(false);
          },
        }
      );
    } catch (error) {
      console.error("Auto-connect error:", error);
      setDisconnected();
      setIsAutoConnecting(false);
      setAutoConnecting(false);
    }
  }, [
    storeWalletName,
    storeIsConnected,
    wallets,
    connect,
    setConnected,
    setDisconnected,
    setAutoConnecting,
    manuallyDisconnected,
  ]);

  // Debounced sync function
  const debouncedSync = useCallback(() => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(() => {
      const walletNameChanged = prevWalletName.current !== walletName;
      const walletAddressChanged = prevWalletAddress.current !== walletAddress;
      const isConnectedChanged = prevIsConnected.current !== actualIsConnected;

      // Only update if there's an actual change
      if (
        actualIsConnected &&
        currentWallet?.currentWallet &&
        currentAccount &&
        (walletNameChanged || walletAddressChanged || isConnectedChanged)
      ) {
        // Update store when wallet is actually connected
        setConnected(currentWallet.currentWallet.name, currentAccount.address);
        console.log("Wallet connection synced to store:", {
          walletName: currentWallet.currentWallet.name,
          walletAddress: currentAccount.address,
        });

        // Update refs
        prevWalletName.current = walletName;
        prevWalletAddress.current = walletAddress;
        prevIsConnected.current = actualIsConnected;
      } else if (!actualIsConnected && storeIsConnected && isConnectedChanged) {
        // Clear store when wallet is actually disconnected
        setDisconnected();
        console.log("Wallet disconnection synced to store");

        // Update refs
        prevIsConnected.current = actualIsConnected;
      }
    }, 100); // 100ms debounce
  }, [
    actualIsConnected,
    currentWallet,
    currentAccount,
    storeIsConnected,
    setConnected,
    setDisconnected,
    walletName,
    walletAddress,
  ]);

  // Sync Zustand store with actual wallet state - with debouncing
  useEffect(() => {
    debouncedSync();

    // Cleanup timeout on unmount
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [debouncedSync]);

  // Auto-connect on mount if store indicates we should be connected
  useEffect(() => {
    if (
      !actualIsConnected &&
      storeIsConnected &&
      !isAutoConnecting &&
      wallets.length > 0 &&
      !manuallyDisconnected
    ) {
      autoConnect();
    }
  }, [
    wallets,
    actualIsConnected,
    storeIsConnected,
    isAutoConnecting,
    autoConnect,
    manuallyDisconnected,
  ]);

  // Reset manual disconnect flag when user connects manually
  useEffect(() => {
    if (actualIsConnected && !storeIsConnected) {
      setManuallyDisconnected(false);
    }
  }, [actualIsConnected, storeIsConnected, setManuallyDisconnected]);

  return {
    isConnected: actualIsConnected,
    walletAddress,
    walletName,
    currentWallet,
    currentAccount,
    isAutoConnecting: isAutoConnecting || storeIsAutoConnecting,
    autoConnect,
  };
};
