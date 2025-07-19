import { useWallets, useConnectWallet } from "@iota/dapp-kit";
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";

const WalletConnect = () => {
  const wallets = useWallets();
  const { mutate: connect, isPending } = useConnectWallet();

  const handleConnectWallet = (wallet: ReturnType<typeof useWallets>[0]) => {
    connect(
      { wallet },
      {
        onSuccess: () => {
          console.log("Connected to wallet:", wallet.name);
        },
        onError: (error) => {
          console.error("Failed to connect to wallet:", error);
        },
      }
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect IOTA Wallet</CardTitle>
        <CardDescription>
          Choose a wallet to connect to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {wallets.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No wallets detected. Please install a compatible IOTA wallet.
            </p>
          ) : (
            wallets.map((wallet) => (
              <Button
                key={wallet.name}
                onClick={() => handleConnectWallet(wallet)}
                disabled={isPending}
                className="w-full justify-start"
                variant="outline"
              >
                <div className="flex items-center space-x-3">
                  {wallet.icon && (
                    <img
                      src={wallet.icon}
                      alt={`${wallet.name} icon`}
                      className="w-6 h-6"
                    />
                  )}
                  <span>Connect to {wallet.name}</span>
                </div>
              </Button>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;
