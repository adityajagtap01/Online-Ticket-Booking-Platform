import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Smartphone, Building, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

interface PaymentPageProps {
  onNavigate: (page: string, data?: any) => void;
  bookingData?: any;
}

export function PaymentPage({ onNavigate, bookingData }: PaymentPageProps) {
  const booking = bookingData || {
    event: { title: "Spider-Man: No Way Home" },
    pricing: { total: 40.37 },
    selectedSeats: [{ row: 'F', number: 7 }, { row: 'F', number: 8 }],
  };

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      const confirmationData = {
        ...booking,
        bookingId: `VB${Date.now()}`,
        paymentMethod,
        paidAmount: booking.pricing.total,
        paymentDate: new Date().toISOString(),
      };
      onNavigate('booking-confirmation', confirmationData);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('booking-summary', booking)}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Summary
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Payment</h1>
            <p className="text-muted-foreground">Complete your booking securely</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                    <TabsTrigger value="wallet">Wallet</TabsTrigger>
                  </TabsList>

                  {/* Credit/Debit Card */}
                  <TabsContent value="card" className="mt-6">
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardData.number}
                          onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardData.expiry}
                            onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cardData.cvv}
                            onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardData.name}
                          onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : `Pay $${booking.pricing.total.toFixed(2)}`}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* UPI Payment */}
                  <TabsContent value="upi" className="mt-6">
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <Button type="button" variant="outline" className="p-4">
                          <Smartphone className="h-6 w-6 mb-2" />
                          Google Pay
                        </Button>
                        <Button type="button" variant="outline" className="p-4">
                          <Smartphone className="h-6 w-6 mb-2" />
                          PhonePe
                        </Button>
                        <Button type="button" variant="outline" className="p-4">
                          <Smartphone className="h-6 w-6 mb-2" />
                          Paytm
                        </Button>
                      </div>

                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : `Pay $${booking.pricing.total.toFixed(2)}`}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Net Banking */}
                  <TabsContent value="netbanking" className="mt-6">
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Your Bank</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Bank of America', 'Chase'].map((bank) => (
                            <Button key={bank} type="button" variant="outline" className="p-4">
                              <Building className="h-4 w-4 mr-2" />
                              {bank}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : `Pay $${booking.pricing.total.toFixed(2)}`}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Digital Wallets */}
                  <TabsContent value="wallet" className="mt-6">
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Choose Wallet</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Button type="button" variant="outline" className="p-4">
                            <div className="w-6 h-6 bg-blue-600 rounded mr-2"></div>
                            PayPal
                          </Button>
                          <Button type="button" variant="outline" className="p-4">
                            <div className="w-6 h-6 bg-black rounded mr-2"></div>
                            Apple Pay
                          </Button>
                          <Button type="button" variant="outline" className="p-4">
                            <div className="w-6 h-6 bg-green-600 rounded mr-2"></div>
                            Amazon Pay
                          </Button>
                          <Button type="button" variant="outline" className="p-4">
                            <div className="w-6 h-6 bg-purple-600 rounded mr-2"></div>
                            Stripe
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : `Pay $${booking.pricing.total.toFixed(2)}`}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Security Information */}
            <Card className="vibeverse-card mt-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Lock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-foreground">Your payment is secure</p>
                    <p className="text-sm text-muted-foreground">
                      We use industry-standard encryption to protect your payment information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="vibeverse-card sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Details */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{booking.event.title}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Seats: {booking.selectedSeats.map((s: any) => `${s.row}${s.number}`).join(', ')}</p>
                    <p>Date: January 15, 2025</p>
                    <p>Time: 7:30 PM</p>
                  </div>
                </div>

                <Separator />

                {/* Payment Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$33.98</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>$6.39</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span className="text-primary">${booking.pricing.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Accepted Payments */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">We accept:</p>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Visa</Badge>
                    <Badge variant="outline">Mastercard</Badge>
                    <Badge variant="outline">PayPal</Badge>
                    <Badge variant="outline">UPI</Badge>
                  </div>
                </div>

                {/* Customer Support */}
                <div className="pt-4 border-t text-center">
                  <p className="text-sm text-muted-foreground mb-2">Having issues?</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate('help')}
                  >
                    Get Help
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}