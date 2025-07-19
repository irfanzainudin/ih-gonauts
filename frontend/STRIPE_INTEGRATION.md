# Stripe Payment Integration

This document explains how to set up and use the Stripe payment integration in the SharedSpace.my application.

## Overview

The application now supports two payment methods:

1. **IOTA Wallet** - For cryptocurrency payments
2. **Stripe** - For traditional MYR (Malaysian Ringgit) payments via Stripe's payment platform

## Features

- ✅ Dual payment options (IOTA Wallet + Stripe)
- ✅ Secure payment processing via Stripe
- ✅ Multiple payment method support (cards, digital wallets, bank transfers, etc.)
- ✅ Payment status tracking
- ✅ Integration points for IOTA smart contracts
- ✅ Success/failure handling
- ✅ Responsive payment UI
- ✅ TypeScript support

## Stripe Payment Methods

Stripe supports various payment methods that users can choose from:

- **Credit/Debit Cards** (Visa, Mastercard, American Express, etc.)
- **Digital Wallets** (Apple Pay, Google Pay, GrabPay, etc.)
- **Bank Transfers** (FPX, DuitNow, etc.)
- **Buy Now, Pay Later** (Atome, etc.)
- **And many more** depending on your Stripe account configuration

Users will be able to select their preferred payment method on the Stripe payment page.

## Setup Instructions

### 1. Install Dependencies

The Stripe dependencies are already installed:

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### 2. Environment Variables

Create a `.env` file in the frontend directory and add your Stripe publishable key:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 3. Backend Integration (Future)

For production, you'll need to implement these backend endpoints:

```typescript
// POST /api/payments/create-payment-intent
interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  bookingRequest: BookingRequest;
}

// POST /api/payments/confirm-payment
interface ConfirmPaymentRequest {
  paymentIntentId: string;
  bookingId: string;
}

// POST /api/webhooks/stripe
interface StripeWebhookRequest {
  // Stripe webhook payload
}
```

## Usage

### Frontend Components

#### 1. StripePaymentModal

```typescript
import StripePaymentModal from "../components/shared/ui/stripe-payment-modal";

<StripePaymentModal
  isOpen={showStripeModal}
  onClose={() => setShowStripeModal(false)}
  bookingRequest={bookingRequest}
  onPaymentSuccess={handlePaymentSuccess}
  onPaymentError={handlePaymentError}
/>;
```

#### 2. SpaceDetailPage Integration

The SpaceDetailPage now includes both payment options:

```typescript
// IOTA Wallet booking
const handleIotaWalletBooking = async () => {
  // IOTA wallet payment logic
};

// Stripe booking
const handleStripeBooking = () => {
  setShowStripeModal(true);
};
```

### Payment Flow

1. **User selects time slots** → Booking summary appears
2. **User chooses payment method**:
   - **IOTA Wallet**: Requires wallet connection, processes on IOTA network
   - **Stripe**: Opens payment modal, redirects to Stripe payment page
3. **Payment processing**:
   - Stripe: User chooses payment method on Stripe's hosted page
   - IOTA: Signs transaction with connected wallet
4. **Success handling**:
   - Stripe: Redirects to success page
   - IOTA: Shows success notification
5. **IOTA Smart Contract Integration**:
   - Both methods can trigger IOTA smart contract updates
   - Booking data stored on IOTA network

## IOTA Smart Contract Integration

### After Stripe Payment Success

```typescript
const processStripeBooking = async (
  bookingRequest: BookingRequest,
  paymentData: StripePaymentData
) => {
  // 1. Verify payment with Stripe webhook
  // 2. Create IOTA smart contract entry
  // 3. Store booking data on IOTA network
  // 4. Update booking status
};
```

### After IOTA Wallet Payment

```typescript
const simulateIotaTransaction = async (bookingRequest: BookingRequest) => {
  // 1. Sign the transaction with the connected wallet
  // 2. Submit to IOTA network
  // 3. Wait for confirmation
  // 4. Update booking status
};
```

## File Structure

```
frontend/src/
├── components/shared/ui/
│   ├── stripe-payment-modal.tsx    # Stripe payment modal
│   └── wallet-required-modal.tsx   # IOTA wallet modal
├── lib/
│   └── stripeService.ts            # Stripe service utilities
├── pages/
│   ├── SpaceDetailPage.tsx         # Updated with dual payment options
│   └── BookingSuccessPage.tsx      # Success page for Stripe payments
└── types/
    └── booking.ts                  # Updated with payment types
```

## Type Definitions

### Payment Types

```typescript
export type PaymentMethod = "iota_wallet" | "stripe";
export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled";

export interface BookingRequest {
  spaceId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
  userWallet?: string;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  stripePaymentIntentId?: string;
}

export interface StripePaymentData {
  paymentIntentId: string;
  clientSecret: string;
  amount: number;
  currency: string;
}
```

## Testing

### Development Mode

The current implementation includes simulated backend calls for development:

```typescript
// In stripeService.ts
private async simulateBackendCall(data: any): Promise<any> {
  // Simulates API calls for development
}
```

### Production Testing

1. Set up Stripe test keys
2. Test payment flow end-to-end with different payment methods
3. Verify webhook handling
4. Test IOTA smart contract integration

## Security Considerations

1. **Never expose secret keys** in frontend code
2. **Always verify payments** on the backend
3. **Use webhooks** for payment confirmation
4. **Validate payment amounts** server-side
5. **Implement proper error handling**

## Future Enhancements

1. **Backend API** implementation
2. **Webhook handling** for payment confirmation
3. **Payment retry logic** for failed transactions
4. **Refund processing** capabilities
5. **Payment analytics** and reporting
6. **Multi-currency support**
7. **Subscription payments** for recurring bookings
8. **Custom payment method selection** UI

## Troubleshooting

### Common Issues

1. **Stripe not loading**: Check publishable key in environment variables
2. **Payment fails**: Verify Stripe account configuration and payment method settings
3. **Modal not opening**: Check component imports and props
4. **TypeScript errors**: Ensure all types are properly imported

### Debug Mode

Enable console logging for debugging:

```typescript
// In stripeService.ts
console.log("Payment intent created:", paymentData);
console.log("Payment confirmed:", result);
```

## Support

For issues with:

- **Stripe integration**: Check Stripe documentation
- **IOTA integration**: Check IOTA dApp Kit documentation
- **Frontend issues**: Check React/TypeScript documentation

## License

This integration follows the same license as the main project.
