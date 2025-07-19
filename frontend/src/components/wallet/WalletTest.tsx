import { useCurrentWallet, useSignPersonalMessage } from "@iota/dapp-kit";
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { useState } from "react";

const WalletTest = () => {
  const currentWallet = useCurrentWallet();
  const { mutate: signMessage, isPending: isSigningMessage } =
    useSignPersonalMessage();

  const [message, setMessage] = useState("Hello IOTA!");
  const [signedMessage, setSignedMessage] = useState("");

  const handleSignMessage = () => {
    if (!currentWallet?.currentWallet) return;

    signMessage(
      {
        message: new TextEncoder().encode(message),
      },
      {
        onSuccess: (result) => {
          console.log("Message signed successfully:", result);
          setSignedMessage(JSON.stringify(result, null, 2));
        },
        onError: (error) => {
          console.error("Failed to sign message:", error);
          setSignedMessage("Error: " + error.message);
        },
      }
    );
  };

  if (!currentWallet?.isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Wallet Test</CardTitle>
          <CardDescription>Test wallet functionality</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Please connect a wallet first to test functionality.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Wallet Test Functions</CardTitle>
        <CardDescription>
          Test signing messages with your wallet
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Message Signing */}
        <div className="space-y-3">
          <Label htmlFor="message">Message to Sign</Label>
          <Input
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message to sign"
          />
          <Button
            onClick={handleSignMessage}
            disabled={isSigningMessage}
            className="w-full"
          >
            {isSigningMessage ? "Signing..." : "Sign Message"}
          </Button>
          {signedMessage && (
            <div className="mt-3">
              <Label>Signed Message Result:</Label>
              <pre className="mt-1 p-3 bg-gray-100 rounded text-xs overflow-auto">
                {signedMessage}
              </pre>
            </div>
          )}
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Testing Notes:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • Message signing tests the wallet's ability to sign arbitrary
              data
            </li>
            <li>• Check the browser console for detailed logs</li>
            <li>• The wallet will prompt for approval for each operation</li>
            <li>
              • This is useful for authentication and verification purposes
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletTest;
