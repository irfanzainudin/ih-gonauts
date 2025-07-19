import { useCurrentWallet, useCurrentAccount } from "@iota/dapp-kit";

export const useWalletConnection = () => {
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();

  const isConnected = !!currentWallet?.currentWallet && !!currentAccount;

  const walletAddress = currentAccount?.address;
  const walletName = currentWallet?.currentWallet?.name;

  return {
    isConnected,
    walletAddress,
    walletName,
    currentWallet,
    currentAccount,
  };
};
