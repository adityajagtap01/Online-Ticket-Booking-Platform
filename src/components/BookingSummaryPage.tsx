import React from 'react';
import { ChevronLeft, MapPin, Clock, Calendar, Users, Ticket, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookingSummaryPageProps {
  onNavigate: (page: string, data?: any) => void;
  bookingData?: any;
}

export function BookingSummaryPage({ onNavigate, bookingData }: BookingSummaryPageProps) {
  const booking = bookingData || {
    event: {
      title: "Spider-Man: No Way Home",
      selectedTime: "7:30 PM",
      selectedVenue: { name: "AMC Times Square", address: "234 W 42nd St, New York" },
      date: "January 15, 2025",
      image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzU2NjA5NjEzfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    selectedSeats: [
      { row: 'F', number: 7, category: 'Premium', price: 16.99 },
      { row: 'F', number: 8, category: 'Premium', price: 16.99 },
    ],
    pricing: {
      subtotal: 33.98,
      taxes: 3.40,
      fees: 2.99,
      total: 40.37,
    },
  };

  const handleProceedToPayment = () => {
    onNavigate('payment', booking);
  };

  const handleEditSeats = () => {
    onNavigate('seat-selection', booking.event);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('seat-selection', booking.event)}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Seats
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Booking Summary</h1>
            <p className="text-muted-foreground">Review your booking details before payment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Information */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ticket className="h-5 w-5 mr-2" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <ImageWithFallback
                    src={booking.event.image}
                    alt={booking.event.title}
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {booking.event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <div>
                          <div className="font-medium text-foreground">{booking.event.selectedVenue.name}</div>
                          <div>{booking.event.selectedVenue.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{booking.event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{booking.event.selectedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seat Selection */}
            <Card className="vibeverse-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Selected Seats
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={handleEditSeats}>
                    Edit Seats
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {booking.selectedSeats.map((seat: any, index: number) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <div className="text-lg font-semibold text-foreground">
                        {seat.row}{seat.number}
                      </div>
                      <Badge variant="outline" className="mt-1">
                        {seat.category}
                      </Badge>
                      <div className="text-sm font-medium text-primary mt-2">
                        ${seat.price}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Seats:</span>
                    <span className="font-medium">{booking.selectedSeats.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Please arrive at least 15 minutes before the show time.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Tickets are non-refundable but can be rescheduled up to 2 hours before the show.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Food and beverages are available for purchase at the venue.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>Your mobile ticket will be sent via email and SMS after successful payment.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <Card className="vibeverse-card sticky top-6">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Ticket Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Ticket Details</h4>
                  {booking.selectedSeats.map((seat: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" size="sm">
                          {seat.row}{seat.number}
                        </Badge>
                        <span className="text-muted-foreground">{seat.category}</span>
                      </div>
                      <span className="font-medium">${seat.price}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({booking.selectedSeats.length} tickets)</span>
                    <span>${booking.pricing.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes</span>
                    <span>${booking.pricing.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Booking Fees</span>
                    <span>${booking.pricing.fees.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total Amount</span>
                  <span className="text-xl font-bold text-primary">
                    ${booking.pricing.total.toFixed(2)}
                  </span>
                </div>

                {/* Payment Button */}
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={handleProceedToPayment}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Payment
                </Button>

                {/* Security Info */}
                <div className="text-xs text-muted-foreground text-center mt-4 p-3 bg-secondary rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p>Your payment information is encrypted and secure. We accept all major credit cards and digital wallets.</p>
                </div>

                {/* Customer Support */}
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Need help?</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate('help')}
                  >
                    Contact Support
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