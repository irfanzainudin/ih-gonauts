import type { ReactNode } from "react";
import {
  createNetworkConfig,
  IotaClientProvider,
  WalletProvider as IotaWalletProvider,
} from "@iota/dapp-kit";
import { getFullnodeUrl } from "@iota/iota-sdk/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider = ({ children }: WalletProviderProps) => {
  // Create network configuration for IOTA
  const { networkConfig } = createNetworkConfig({
    localnet: { url: getFullnodeUrl("localnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IotaClientProvider networks={networkConfig} defaultNetwork="localnet">
        <IotaWalletProvider>{children}</IotaWalletProvider>
      </IotaClientProvider>
    </QueryClientProvider>
  );
};

export default WalletProvider;
