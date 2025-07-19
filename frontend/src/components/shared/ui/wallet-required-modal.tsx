import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "./button";
import { Wallet, AlertCircle } from "lucide-react";

interface WalletRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet: () => void;
  isConnecting?: boolean;
}

const WalletRequiredModal = ({
  isOpen,
  onClose,
  onConnectWallet,
  isConnecting = false,
}: WalletRequiredModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <DialogTitle>Wallet Required</DialogTitle>
          </div>
          <DialogDescription>
            You need to connect your wallet to book spaces. This ensures secure
            transactions and allows you to manage your bookings.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
            <Wallet className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Why connect a wallet?</p>
              <ul className="space-y-1 text-xs">
                <li>• Secure booking transactions</li>
                <li>• Manage your bookings</li>
                <li>• Access to exclusive features</li>
                <li>• Seamless payment processing</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onConnectWallet}
              disabled={isConnecting}
              className="flex-1"
            >
              {isConnecting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                "Connect Wallet"
              )}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={isConnecting}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletRequiredModal;
