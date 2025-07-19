# 🏖️ Stripe Sandbox Setup Guide

## What is Stripe Sandbox?

Stripe provides a **complete test environment** where you can:

- ✅ **Process real-looking payments** without charging real money
- ✅ **Use test card numbers** that Stripe recognizes
- ✅ **Test the full payment flow** including redirects
- ✅ **See real Stripe payment pages** in test mode
- ✅ **No real charges** - everything is simulated

## 🎯 Test Card Numbers

Stripe provides these test card numbers that work in sandbox mode:

### **Successful Payments:**

- `4242 4242 4242 4242` - Visa
- `4000 0000 0000 0002` - Visa (declined)
- `5555 5555 5555 4444` - Mastercard
- `3782 822463 10005` - American Express

### **Test Details:**

- **Expiry**: Any future date (e.g., `12/25`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any valid format (e.g., `12345`)

## 🚀 Setting Up Stripe Sandbox

### 1. **Get Test API Keys**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create account (free)
3. Go to **Developers → API Keys**
4. Copy your **Publishable Key** (starts with `pk_test_`)
5. Copy your **Secret Key** (starts with `sk_test_`)

### 2. **Update Environment Variables**

Create `.env` file in your frontend directory:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_test_key_here
```

### 3. **Update Stripe Service**

The service will automatically detect test mode and use sandbox URLs.

## 🎬 Demo Flow with Real Stripe

### **What Happens:**

1. **User clicks "Pay with MYR"** → Opens payment modal
2. **User clicks "Go to Stripe Payment Page"** → Redirects to **real Stripe test page**
3. **User enters test card** → `4242 4242 4242 4242`
4. **Stripe processes payment** → Shows success/failure
5. **Redirects back to app** → Success page with real transaction ID

### **Benefits:**

- ✅ **Real Stripe payment page** (test mode)
- ✅ **Real payment processing** (no charges)
- ✅ **Real transaction IDs** and confirmations
- ✅ **Real error handling** and validation
- ✅ **Professional demo** that looks production-ready

## 🔧 Implementation Steps

### **Option 1: Quick Demo (Current)**

- Uses simulated redirect (what we have now)
- Good for hackathon demo
- No Stripe account needed

### **Option 2: Real Stripe Sandbox (Recommended)**

- Uses actual Stripe test environment
- More impressive demo
- Requires Stripe account setup

## 🎯 For Your Hackathon

### **If you want the real Stripe experience:**

1. **Sign up for Stripe** (5 minutes)
2. **Get test API keys**
3. **Update environment variable**
4. **Use test card numbers**

### **Demo Script:**

> "This is using Stripe's real sandbox environment. The payment page you see is the actual Stripe payment page in test mode. Users can enter any of these test card numbers to simulate payments without any real charges."

### **Test Cards to Show:**

- `4242 4242 4242 4242` - Successful payment
- `4000 0000 0000 0002` - Declined payment
- `4000 0000 0000 9995` - Insufficient funds

## 🚀 Ready to Upgrade?

Would you like me to:

1. **Keep current simulated flow** (works great for demo)
2. **Set up real Stripe sandbox** (more impressive)

Both options work perfectly for your hackathon! The current simulated flow is actually quite good because it shows the concept clearly without requiring Stripe setup.

**Which approach would you prefer?**
