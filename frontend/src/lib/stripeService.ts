import { loadStripe } from "@stripe/stripe-js";
import type { Stripe, PaymentIntentResult } from "@stripe/stripe-js";
import type { StripePaymentData, BookingRequest } from "../types/booking";

// Initialize Stripe (you'll need to replace with your actual publishable key)
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_your_publishable_key_here"
);

interface PaymentIntent {
  id: string;
  status: string;
  amount: number;
  currency: string;
}

interface SimulatedBackendResponse {
  paymentIntentId?: string;
  clientSecret?: string;
  amount?: number;
  currency?: string;
  id?: string;
  status?: string;
}

export class StripeService {
  private static instance: StripeService;
  private stripe: Stripe | null = null;

  private constructor() {}

  static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  async initialize(): Promise<Stripe> {
    if (!this.stripe) {
      this.stripe = await stripePromise;
      if (!this.stripe) {
        throw new Error("Failed to initialize Stripe");
      }
    }
    return this.stripe;
  }

  async createPaymentIntent(
    bookingRequest: BookingRequest
  ): Promise<StripePaymentData> {
    try {
      console.log(
        "🎯 DEMO: Creating payment intent for booking:",
        bookingRequest
      );

      // In a real application, this would call your backend API
      // For now, we'll simulate the API call
      const response = await this.simulateBackendCall(bookingRequest);

      console.log("✅ DEMO: Payment intent created successfully:", response);

      return {
        paymentIntentId: response.paymentIntentId!,
        clientSecret: response.clientSecret!,
        amount: bookingRequest.totalPrice * 100, // Convert to cents
        currency: "myr",
      };
    } catch (error) {
      console.error("❌ DEMO: Error creating payment intent:", error);
      throw new Error("Failed to create payment intent");
    }
  }

  async redirectToPayment(clientSecret: string): Promise<void> {
    try {
      console.log("🎯 DEMO: Redirecting to Stripe payment page...");

      if (this.isRealStripeMode()) {
        // Real Stripe mode - would use actual Stripe checkout
        console.log("✅ REAL STRIPE: Would redirect to actual Stripe checkout");

        // In real implementation, you'd create a checkout session on your backend
        // For demo, we'll simulate the redirect
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // For demo purposes, redirect to success page
        window.location.href = `/booking/success?payment_intent=${clientSecret}&demo=false&real_stripe=true`;
      } else {
        // Demo mode - simulate Stripe redirect
        console.log("🎭 DEMO: Simulating Stripe redirect...");

        // Show loading animation
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate redirect to Stripe's payment page
        console.log("✅ DEMO: Redirecting to Stripe payment page...");

        // For demo, redirect to a simulated Stripe page
        // In real implementation, this would go to actual Stripe
        window.location.href = `/stripe-demo?payment_intent=${clientSecret}&amount=${this.getCurrentAmount()}&currency=MYR`;
      }
    } catch (error) {
      console.error("❌ DEMO: Error redirecting to payment:", error);
      throw error;
    }
  }

  async confirmPayment(clientSecret: string): Promise<PaymentIntentResult> {
    try {
      console.log(
        "🎯 DEMO: Confirming payment with client secret:",
        clientSecret.substring(0, 20) + "..."
      );

      const stripe = await this.initialize();

      // Use Stripe's confirmPayment for the actual payment flow
      const result = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/booking/success?payment_intent=${clientSecret}`,
        },
      });

      console.log("✅ DEMO: Payment confirmed:", result);
      return result;
    } catch (error) {
      console.error("❌ DEMO: Error confirming payment:", error);
      throw error;
    }
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    try {
      console.log("🎯 DEMO: Retrieving payment intent:", paymentIntentId);

      // In a real application, this would call your backend API
      const response = await this.simulateBackendCall({ paymentIntentId });
      console.log("✅ DEMO: Payment intent retrieved:", response);

      return response as PaymentIntent;
    } catch (error) {
      console.error("❌ DEMO: Error retrieving payment intent:", error);
      throw error;
    }
  }

  // Helper method to get current space ID from URL
  private getCurrentSpaceId(): string {
    const pathParts = window.location.pathname.split("/");
    const spaceIndex = pathParts.findIndex((part) => part === "space");
    return spaceIndex !== -1 && pathParts[spaceIndex + 1]
      ? pathParts[spaceIndex + 1]
      : "demo-space";
  }

  // Helper method to get current amount from URL or default
  private getCurrentAmount(): string {
    // Try to get amount from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get("amount");
    return amount || "120"; // Default amount
  }

  // Simulate backend API calls for development
  private async simulateBackendCall(
    data: BookingRequest | { paymentIntentId: string }
  ): Promise<SimulatedBackendResponse> {
    console.log("🔄 DEMO: Simulating backend API call...");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if ("paymentIntentId" in data && !("spaceId" in data)) {
      // Simulate retrieving payment intent
      console.log("📋 DEMO: Retrieving payment intent from backend");
      return {
        id: data.paymentIntentId,
        status: "succeeded",
        amount: 12000, // RM 120.00 in cents
        currency: "myr",
      };
    } else {
      // Simulate creating payment intent
      console.log("💰 DEMO: Creating payment intent in backend");
      const paymentIntentId = `pi_demo_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const clientSecret = `pi_demo_${Math.random()
        .toString(36)
        .substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`;

      console.log("🎫 DEMO: Generated payment intent ID:", paymentIntentId);
      console.log(
        "🔐 DEMO: Generated client secret:",
        clientSecret.substring(0, 20) + "..."
      );

      return {
        paymentIntentId,
        clientSecret,
        amount: (data as BookingRequest).totalPrice * 100,
        currency: "myr",
      };
    }
  }

  // Helper method to format amount for display
  formatAmount(amount: number): string {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
    }).format(amount);
  }

  // Helper method to validate payment status
  isPaymentSuccessful(paymentIntent: PaymentIntent): boolean {
    return paymentIntent?.status === "succeeded";
  }

  // Demo helper method
  isDemoMode(): boolean {
    return (
      !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ===
        "pk_test_your_publishable_key_here" ||
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY.startsWith("pk_test_your_")
    );
  }

  // Check if using real Stripe sandbox
  isRealStripeMode(): boolean {
    return (
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY &&
      !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY.startsWith(
        "pk_test_your_"
      ) &&
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY.startsWith("pk_test_")
    );
  }
}

export const stripeService = StripeService.getInstance();
