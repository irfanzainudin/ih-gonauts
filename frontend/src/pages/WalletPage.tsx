import WalletConnect from "@/components/wallet/WalletConnect";
import WalletStatus from "@/components/wallet/WalletStatus";
import WalletTest from "@/components/wallet/WalletTest";
import { useCurrentWallet } from "@iota/dapp-kit";
import { CheckCircle, Info } from "lucide-react";

const WalletPage = () => {
  const currentWallet = useCurrentWallet();
  const isConnected = currentWallet?.isConnected;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            IOTA Wallet Management
          </h1>
          <p className="text-gray-600">
            Connect and manage your IOTA wallet for secure transactions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
            <WalletConnect />
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
            <WalletStatus />
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Wallet Testing</h2>
            <WalletTest />
          </div>
        </div>

        {isConnected && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Wallet Connected Successfully
            </h3>
            <p className="text-green-700">
              Your IOTA wallet is now connected and ready for transactions.
            </p>
          </div>
        )}

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Info className="w-5 h-5" />
            How to Test
          </h3>
          <div className="text-blue-700 space-y-2">
            <p>1. Install a compatible IOTA wallet (like Firefly or Bloom)</p>
            <p>2. Open the wallet and ensure it's unlocked</p>
            <p>3. Click "Connect to [Wallet Name]" in the connection section</p>
            <p>4. Approve the connection in your wallet</p>
            <p>5. Check the status section to confirm the connection</p>
            <p>6. Use the test section to try message signing</p>
            <p>7. Use the disconnect button to test the disconnection flow</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
