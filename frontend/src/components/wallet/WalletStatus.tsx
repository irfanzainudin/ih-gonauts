import {
  useCurrentWallet,
  useDisconnectWallet,
  useCurrentAccount,
} from "@iota/dapp-kit";
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Badge } from "@/components/shared/ui/badge";

const WalletStatus = () => {
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect, isPending } = useDisconnectWallet();

  const handleDisconnect = () => {
    disconnect(undefined, {
      onSuccess: () => {
        console.log("Wallet disconnected");
      },
      onError: (error) => {
        console.error("Failed to disconnect wallet:", error);
      },
    });
  };

  if (!currentWallet || !currentWallet.currentWallet) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Wallet Status</CardTitle>
          <CardDescription>No wallet connected</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">Disconnected</Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Wallet Status</CardTitle>
        <CardDescription>Connected wallet information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Wallet:</span>
          <span>{currentWallet.currentWallet.name}</span>
        </div>

        {currentAccount && (
          <div className="flex items-center justify-between">
            <span className="font-medium">Account:</span>
            <span className="text-sm text-muted-foreground font-mono">
              {currentAccount.address.slice(0, 8)}...
              {currentAccount.address.slice(-8)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="font-medium">Status:</span>
          <Badge variant="default">Connected</Badge>
        </div>

        <Button
          onClick={handleDisconnect}
          disabled={isPending}
          variant="destructive"
          className="w-full"
        >
          {isPending ? "Disconnecting..." : "Disconnect Wallet"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletStatus;
