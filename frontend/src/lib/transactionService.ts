import type {
  BookingRequest,
  BookingHistory,
  PaymentMethod,
  PaymentStatus,
  Space,
  LoyaltyTier,
} from "../types/booking";
import { mockSpaces } from "./mockData";
import { LOYALTY_TIERS } from "./loyaltyService";

// Transaction types for localStorage
export interface Transaction {
  id: string;
  bookingRequest: BookingRequest;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionHash?: string;
  stripePaymentIntentId?: string;
  amount: number;
  currency: string;
  createdAt: string;
  completedAt?: string;
  loyaltyTokensEarned: number;
  loyaltyTokensUsed: number;
  spaceName: string;
  spaceLocation: string;
  userWalletAddress?: string;
}

// LocalStorage keys
const TRANSACTIONS_KEY = "sharedspace-transactions";
const BOOKING_HISTORY_KEY = "sharedspace-booking-history";

class TransactionService {
  // Get all transactions from localStorage
  private getTransactions(): Transaction[] {
    try {
      const stored = localStorage.getItem(TRANSACTIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading transactions from localStorage:", error);
      return [];
    }
  }

  // Save transactions to localStorage
  private saveTransactions(transactions: Transaction[]): void {
    try {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error("Error saving transactions to localStorage:", error);
    }
  }

  // Get booking history from localStorage
  private getBookingHistory(): BookingHistory[] {
    try {
      const stored = localStorage.getItem(BOOKING_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error reading booking history from localStorage:", error);
      return [];
    }
  }

  // Save booking history to localStorage
  private saveBookingHistory(bookings: BookingHistory[]): void {
    try {
      localStorage.setItem(BOOKING_HISTORY_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error("Error saving booking history to localStorage:", error);
    }
  }

  // Generate a unique transaction ID
  private generateTransactionId(): string {
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Generate a mock transaction hash
  private generateTransactionHash(): string {
    return `0x${Math.random().toString(16).substr(2, 64)}`;
  }

  // Generate a mock Stripe payment intent ID
  private generateStripePaymentIntentId(): string {
    return `pi_${Math.random()
      .toString(36)
      .substr(2, 20)}_secret_${Math.random().toString(36).substr(2, 20)}`;
  }

  // Get space details by ID
  private getSpaceDetails(spaceId: string): Space | null {
    return mockSpaces.find((space) => space.id === spaceId) || null;
  }

  // Calculate loyalty tokens based on user's current tier
  private calculateLoyaltyTokens(
    amount: number,
    userBookings: BookingHistory[] = []
  ): number {
    // Calculate current tier based on completed bookings
    const completedBookings = userBookings.filter(
      (booking) => booking.status === "completed"
    );
    const currentBookings = completedBookings.length;

    // Find current tier
    const currentTier = LOYALTY_TIERS.reduce(
      (current: LoyaltyTier, tier: LoyaltyTier) => {
        if (currentBookings >= tier.minBookings) {
          return tier;
        }
        return current;
      }
    );

    // Return tokens based on current tier
    return currentTier.rewardTokens;
  }

  // Simulate IOTA wallet transaction
  async simulateIotaTransaction(
    bookingRequest: BookingRequest,
    userWalletAddress?: string
  ): Promise<Transaction> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Get space details
    const space = this.getSpaceDetails(bookingRequest.spaceId);

    const transaction: Transaction = {
      id: this.generateTransactionId(),
      bookingRequest,
      paymentMethod: "iota_wallet",
      paymentStatus: "completed",
      transactionHash: this.generateTransactionHash(),
      amount: bookingRequest.totalPrice,
      currency: "IOTA",
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      loyaltyTokensEarned: this.calculateLoyaltyTokens(
        bookingRequest.totalPrice,
        this.getBookingHistoryForUser()
      ),
      loyaltyTokensUsed: 0,
      spaceName: space?.name || "Unknown Space",
      spaceLocation: space
        ? `${space.location.address}, ${space.location.city}`
        : "Unknown Location",
      userWalletAddress,
    };

    // Save to localStorage
    const transactions = this.getTransactions();
    transactions.push(transaction);
    this.saveTransactions(transactions);

    // Update booking history
    this.updateBookingHistory(transaction);

    console.log("🎯 IOTA: Transaction completed and stored:", transaction);
    return transaction;
  }

  // Simulate Stripe transaction
  async simulateStripeTransaction(
    bookingRequest: BookingRequest,
    stripePaymentIntentId?: string
  ): Promise<Transaction> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get space details
    const space = this.getSpaceDetails(bookingRequest.spaceId);

    const transaction: Transaction = {
      id: this.generateTransactionId(),
      bookingRequest,
      paymentMethod: "stripe",
      paymentStatus: "completed",
      stripePaymentIntentId:
        stripePaymentIntentId || this.generateStripePaymentIntentId(),
      amount: bookingRequest.totalPrice,
      currency: "MYR",
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      loyaltyTokensEarned: this.calculateLoyaltyTokens(
        bookingRequest.totalPrice,
        this.getBookingHistoryForUser()
      ),
      loyaltyTokensUsed: 0,
      spaceName: space?.name || "Unknown Space",
      spaceLocation: space
        ? `${space.location.address}, ${space.location.city}`
        : "Unknown Location",
    };

    // Save to localStorage
    const transactions = this.getTransactions();
    transactions.push(transaction);
    this.saveTransactions(transactions);

    // Update booking history
    this.updateBookingHistory(transaction);

    console.log("🎯 Stripe: Transaction completed and stored:", transaction);
    return transaction;
  }

  // Update booking history from transaction
  private updateBookingHistory(transaction: Transaction): void {
    const bookings = this.getBookingHistory();

    const bookingHistory: BookingHistory = {
      id: transaction.id,
      spaceName: transaction.spaceName,
      date: transaction.bookingRequest.date,
      time: `${transaction.bookingRequest.startTime} - ${transaction.bookingRequest.endTime}`,
      status: transaction.paymentStatus,
      amount: `${transaction.currency} ${transaction.amount}`,
      paymentMethod: transaction.paymentMethod,
      loyaltyTokensEarned: transaction.loyaltyTokensEarned,
      loyaltyTokensUsed: transaction.loyaltyTokensUsed,
      createdAt: transaction.createdAt,
    };

    bookings.unshift(bookingHistory); // Add to beginning of array
    this.saveBookingHistory(bookings);
  }

  // Get all transactions for a user
  getTransactionsForUser(walletAddress?: string): Transaction[] {
    const transactions = this.getTransactions();
    if (walletAddress) {
      return transactions.filter((t) => t.userWalletAddress === walletAddress);
    }
    return transactions;
  }

  // Get booking history for a user
  getBookingHistoryForUser(): BookingHistory[] {
    const bookings = this.getBookingHistory();
    // For demo purposes, return all bookings
    // In a real app, you'd filter by wallet address
    return bookings;
  }

  // Get transaction by ID
  getTransactionById(transactionId: string): Transaction | null {
    const transactions = this.getTransactions();
    return transactions.find((t) => t.id === transactionId) || null;
  }

  // Get total loyalty tokens earned
  getTotalLoyaltyTokensEarned(walletAddress?: string): number {
    const transactions = this.getTransactionsForUser(walletAddress);
    return transactions.reduce((total, t) => total + t.loyaltyTokensEarned, 0);
  }

  // Get total loyalty tokens used
  getTotalLoyaltyTokensUsed(walletAddress?: string): number {
    const transactions = this.getTransactionsForUser(walletAddress);
    return transactions.reduce((total, t) => total + t.loyaltyTokensUsed, 0);
  }

  // Get available loyalty tokens
  getAvailableLoyaltyTokens(walletAddress?: string): number {
    const earned = this.getTotalLoyaltyTokensEarned(walletAddress);
    const used = this.getTotalLoyaltyTokensUsed(walletAddress);
    return earned - used;
  }

  // Clear all data (for testing)
  clearAllData(): void {
    localStorage.removeItem(TRANSACTIONS_KEY);
    localStorage.removeItem(BOOKING_HISTORY_KEY);
    console.log("🧹 All transaction data cleared from localStorage");
  }

  // Get transaction statistics
  getTransactionStats(walletAddress?: string) {
    const transactions = this.getTransactionsForUser(walletAddress);
    const totalTransactions = transactions.length;
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const iotaTransactions = transactions.filter(
      (t) => t.paymentMethod === "iota_wallet"
    ).length;
    const stripeTransactions = transactions.filter(
      (t) => t.paymentMethod === "stripe"
    ).length;

    return {
      totalTransactions,
      totalAmount,
      iotaTransactions,
      stripeTransactions,
      averageAmount:
        totalTransactions > 0 ? totalAmount / totalTransactions : 0,
    };
  }
}

// Export singleton instance
export const transactionService = new TransactionService();
