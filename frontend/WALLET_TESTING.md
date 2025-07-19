# IOTA Wallet Integration Testing Guide

This guide explains how to test the simplified IOTA wallet connection functionality implemented in the SharedSpace.my application.

## Prerequisites

1. **Node.js Version**: Ensure you're using Node.js version 23 or higher

   ```bash
   nvm use 23
   ```

2. **IOTA Wallet**: Install a compatible IOTA wallet
   - **Firefly Wallet**: https://firefly.iota.org/
   - **Bloom Wallet**: https://bloom.iota.org/
   - **TanglePay**: https://tanglepay.com/

## Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing the Wallet Connection

### Step 1: Access the Application

1. Open your browser and navigate to `http://localhost:5173`
2. Look for the "Connect Wallet" button in the top navigation bar

### Step 2: Connect Your Wallet

1. **Ensure your IOTA wallet is installed and unlocked**
2. **Click "Connect Wallet"** in the top navigation
3. **Approve the connection** in your wallet when prompted
4. **Check for success notification** - you should see a green success message

### Step 3: Test Connected State

Once connected, the button should change to show:

- **IOTA logo** (purple circle with "I")
- **Truncated wallet address** (e.g., "24ab...zG")
- **Green border** indicating connected state

### Step 4: Test Wallet Popup

1. **Click on the connected wallet button** to open the popup
2. **Test the popup features**:
   - **Copy Address**: Click the copy icon to copy wallet address
   - **My Bookings**: Navigate to bookings page
   - **View in Explorer**: Open wallet in IOTA explorer
   - **Disconnect**: Disconnect the wallet

### Step 5: Test Disconnection

1. **Click "Disconnect"** in the wallet popup
2. **Verify the button returns** to "Connect Wallet" state
3. **Check for success notification**

## Expected Behavior

### Successful Connection

- ✅ "Connect Wallet" button changes to show truncated address
- ✅ IOTA logo appears next to the address
- ✅ Green border indicates connected state
- ✅ Success notification appears
- ✅ Clicking the button opens wallet popup

### Successful Disconnection

- ✅ Button returns to "Connect Wallet" state
- ✅ Popup closes automatically
- ✅ Success notification appears
- ✅ Reconnection is possible

### Error Handling

- ✅ Error notifications appear for failed connections
- ✅ Clear error messages explain the issue
- ✅ No wallet detected shows helpful message

## Troubleshooting

### No Wallets Detected

- **Solution**: Ensure you have a compatible IOTA wallet installed
- **Check**: Wallet browser extension is enabled
- **Verify**: Wallet is unlocked and ready

### Connection Fails

- **Solution**: Check browser console for error messages
- **Check**: Wallet is unlocked and not in a locked state
- **Verify**: Network connectivity is stable

### Popup Not Opening

- **Solution**: Ensure wallet is properly connected first
- **Check**: Click on the connected wallet button (not the old "Connect Wallet" button)
- **Verify**: No JavaScript errors in browser console

## Browser Console Logs

Monitor the browser console (F12) for detailed logs:

```javascript
// Successful connection
"Connected to wallet: [Wallet Name]";

// Successful disconnection
"Wallet disconnected";

// Error logs
"Failed to connect to wallet: [Error Details]";
"Failed to disconnect wallet: [Error Details]";
```

## Supported Wallets

The implementation uses the IOTA dApp Kit which supports:

- Firefly Wallet
- Bloom Wallet
- TanglePay
- Any wallet implementing the IOTA Wallet Standard

## Technical Implementation

### Key Components

- `WalletConnectButton`: Single component handling connection, display, and popup
- `WalletProvider`: Wraps the app with IOTA dApp Kit providers
- `WalletBookingsPage`: Simple page for viewing wallet bookings

### Key Features

- ✅ **One-click connection** - No dedicated page needed
- ✅ **Truncated address display** - Shows "24ab...zG" format
- ✅ **IOTA logo integration** - Purple circle with "I" symbol
- ✅ **Smart popup** - Wallet info and actions
- ✅ **Better notifications** - Success/error messages instead of alerts
- ✅ **Copy functionality** - Copy wallet address to clipboard
- ✅ **Explorer integration** - View wallet in IOTA explorer
- ✅ **Bookings integration** - Navigate to wallet bookings page

### Key Hooks Used

- `useWallets()`: Lists available wallets
- `useConnectWallet()`: Handles wallet connection
- `useCurrentWallet()`: Gets current wallet state
- `useDisconnectWallet()`: Handles wallet disconnection
- `useCurrentAccount()`: Gets current account information

## Development Notes

- The implementation follows React best practices with TypeScript
- Uses Shadcn UI components for consistent styling
- Implements proper error handling with user-friendly notifications
- Follows accessibility guidelines with proper ARIA labels
- Uses Tailwind CSS for responsive design
- Simplified UX - no dedicated wallet page needed

## Next Steps

For production deployment:

1. Add wallet connection persistence
2. Implement transaction signing for actual payments
3. Add proper error boundaries
4. Integrate with backend services for real bookings
5. Add comprehensive unit and integration tests
6. Implement wallet connection state management
