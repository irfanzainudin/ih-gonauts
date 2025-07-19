import {
  useWallets,
  useConnectWallet,
  useDisconnectWallet,
  useCurrentAccount,
} from "@iota/dapp-kit";
import { Button } from "@/components/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/ui/dropdown-menu";
import {
  Copy,
  Wallet,
  LogOut,
  Calendar,
  ExternalLink,
  Home,
  Building,
  Loader2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useWalletStore } from "@/lib/walletStore";

const WalletConnectButton = () => {
  const wallets = useWallets();
  const { mutate: connect, isPending } = useConnectWallet();
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, isAutoConnecting } = useWalletConnection();
  const { setDisconnected } = useWalletStore();

  const isOwnerPage = location.pathname.startsWith("/owner");

  const handleConnect = () => {
    if (wallets.length === 0) {
      toast.error(
        "No wallets detected. Please install a compatible IOTA wallet like Firefly or Bloom."
      );
      return;
    }

    // Connect to the first available wallet
    connect(
      { wallet: wallets[0] },
      {
        onSuccess: () => {
          console.log("Connected to wallet:", wallets[0].name);
          toast.success(`Successfully connected to ${wallets[0].name}!`);
        },
        onError: (error) => {
          console.error("Failed to connect to wallet:", error);
          toast.error(`Failed to connect wallet: ${error.message}`);
        },
      }
    );
  };

  const handleDisconnect = () => {
    // Clear the store first to prevent auto-reconnection
    setDisconnected();

    disconnect(undefined, {
      onSuccess: () => {
        console.log("Wallet disconnected");
        toast.success("Wallet disconnected successfully");
      },
      onError: (error) => {
        console.error("Failed to disconnect wallet:", error);
        toast.error(`Failed to disconnect wallet: ${error.message}`);
      },
    });
  };

  const copyAddress = () => {
    if (currentAccount?.address) {
      navigator.clipboard.writeText(currentAccount.address);
      toast.success("Wallet address copied to clipboard!");
    }
  };

  const viewBookings = () => {
    navigate("/wallet/bookings");
  };

  const handleUserTypeSwitch = () => {
    if (isOwnerPage) {
      navigate("/"); // Go to user landing page
    } else {
      navigate("/owner"); // Go to owner landing page
    }
  };

  const truncateAddress = (address: string) => {
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Show auto-connecting state
  if (isAutoConnecting) {
    return (
      <Button
        variant="outline"
        disabled
        className="bg-white/10 border-blue-500/50 text-blue-400 hover:bg-white/20 w-10 h-10 p-0 sm:w-40 sm:h-auto sm:p-2"
      >
        <div className="flex items-center justify-center sm:justify-start sm:space-x-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="hidden sm:inline">Reconnecting...</span>
        </div>
      </Button>
    );
  }

  if (isConnected && currentAccount) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/10 border-green-500/50 text-green-400 hover:bg-white/20 w-10 h-10 p-0 sm:w-40 sm:h-auto sm:p-2"
          >
            <div className="flex items-center justify-center sm:justify-start sm:space-x-2">
              {/* IOTA Logo */}
              <div className="w-5 h-5 flex items-center justify-center">
                <img src="/iota-logo.svg" alt="IOTA" className="w-5 h-5" />
              </div>
              {/* Desktop: Show truncated address, Mobile: Show wallet icon */}
              <span className="font-mono text-sm hidden sm:inline">
                {truncateAddress(currentAccount.address)}
              </span>
              <Wallet className="w-4 h-4 sm:hidden" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80 bg-gray-900/95 backdrop-blur border-gray-700"
        >
          {/* Wallet Info */}
          <DropdownMenuLabel className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img
                  src="/iota-logo.svg"
                  alt="IOTA"
                  className="w-8 h-8 filter brightness-0 invert"
                />
              </div>
              <div>
                <p className="text-white font-medium">IOTA Wallet</p>
                <p className="text-gray-400 text-sm font-mono">
                  {truncateAddress(currentAccount.address)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-md p-1"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-gray-700" />

          {/* Navigation for Mobile */}
          <div className="xl:hidden">
            <DropdownMenuItem
              onClick={() => navigate("/")}
              className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
            >
              <Home className="w-4 h-4 mr-3" />
              Home
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleUserTypeSwitch}
              className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
            >
              <Building className="w-4 h-4 mr-3" />
              {isOwnerPage ? "Book Spaces" : "List Your Space"}
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-gray-700" />
          </div>

          {/* Menu Options */}
          <DropdownMenuItem
            onClick={viewBookings}
            className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-3" />
            My Bookings
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              // Open in explorer - you can customize this URL
              window.open(
                `https://explorer.iota.org/mainnet/addr/${currentAccount.address}`,
                "_blank"
              );
            }}
            className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 mr-3" />
            View in Explorer
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-700" />

          <DropdownMenuItem
            onClick={handleDisconnect}
            className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isPending}
      className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 p-0 sm:w-40 sm:h-auto sm:p-2"
    >
      {isPending ? (
        <div className="flex items-center justify-center sm:justify-start sm:space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="hidden sm:inline">Connecting...</span>
          <span className="sm:hidden">...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center sm:justify-start sm:space-x-2">
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">Connect Wallet</span>
        </div>
      )}
    </Button>
  );
};

export default WalletConnectButton;
