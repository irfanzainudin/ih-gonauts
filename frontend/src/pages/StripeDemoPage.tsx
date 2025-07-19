import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/shared/ui/card";
import { Input } from "../components/shared/ui/input";
import { Label } from "../components/shared/ui/label";
import {
  CreditCard,
  Lock,
  CheckCircle,
  ArrowLeft,
  Shield,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

const StripeDemoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/25");
  const [cvc, setCvc] = useState("123");
  const [name, setName] = useState("John Doe");

  const amount = searchParams.get("amount") || "120";
  const currency = searchParams.get("currency") || "MYR";
  const paymentIntentId = searchParams.get("payment_intent") || "pi_demo_123";

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate successful payment
    toast.success("Payment successful!");

    // Redirect back to success page
    setTimeout(() => {
      navigate(
        `/booking/success?payment_intent=${paymentIntentId}&demo=true&stripe_demo=true`
      );
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/booking");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Stripe Checkout
          </h1>
          <p className="text-gray-600">Complete your payment securely</p>
        </div>

        {/* Demo Indicator */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-yellow-800">
              DEMO STRIPE PAGE
            </span>
          </div>
          <p className="text-xs text-yellow-700 mt-1">
            This simulates Stripe's actual payment page
          </p>
        </div>

        {/* Payment Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold text-lg">RM {amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Currency</span>
              <span className="text-gray-900">{currency}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment ID</span>
              <span className="text-xs text-gray-500 font-mono">
                {paymentIntentId}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 1234 1234 1234"
                className="font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            {/* Security Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Secure Payment
                </span>
              </div>
              <p className="text-xs text-green-700">
                Your payment information is encrypted and secure
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Pay RM {amount}
              </>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isProcessing}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>

        {/* Test Cards Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Test Cards</h3>
          <div className="space-y-1 text-xs text-gray-600">
            <p>• 4242 4242 4242 4242 - Successful payment</p>
            <p>• 4000 0000 0000 0002 - Declined payment</p>
            <p>• Any future expiry date and 3-digit CVC</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeDemoPage;
