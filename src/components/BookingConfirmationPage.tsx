import React from 'react';
import { CheckCircle, Download, Share2, Calendar, MapPin, Clock, Ticket, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface BookingConfirmationPageProps {
  onNavigate: (page: string, data?: any) => void;
  confirmationData?: any;
}

export function BookingConfirmationPage({ onNavigate, confirmationData }: BookingConfirmationPageProps) {
  const confirmation = confirmationData || {
    bookingId: `VB${Date.now()}`,
    event: {
      title: "Spider-Man: No Way Home",
      selectedTime: "7:30 PM",
      selectedVenue: { name: "AMC Times Square", address: "234 W 42nd St, New York" },
      date: "January 15, 2025",
    },
    selectedSeats: [
      { row: 'F', number: 7, category: 'Premium' },
      { row: 'F', number: 8, category: 'Premium' },
    ],
    pricing: { total: 40.37 },
    paymentMethod: 'card',
    paidAmount: 40.37,
    paymentDate: new Date().toISOString(),
  };

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    const ticketData = `
VIBEVERSE TICKET
================
Booking ID: ${confirmation.bookingId}
Event: ${confirmation.event.title}
Date: ${confirmation.event.date}
Time: ${confirmation.event.selectedTime}
Venue: ${confirmation.event.selectedVenue.name}
Seats: ${confirmation.selectedSeats.map((s: any) => `${s.row}${s.number}`).join(', ')}
Amount Paid: $${confirmation.paidAmount.toFixed(2)}
================
Please present this ticket at the venue.
    `;
    
    const blob = new Blob([ticketData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vibeverse-ticket-${confirmation.bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: `I'm going to ${confirmation.event.title}!`,
        text: `Just booked tickets for ${confirmation.event.title} on Vibeverse! 🎬`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`Just booked tickets for ${confirmation.event.title} on Vibeverse! Booking ID: ${confirmation.bookingId}`);
      alert('Booking details copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-4">
            Your tickets have been successfully booked. Get ready for an amazing experience!
          </p>
          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
            Booking ID: {confirmation.bookingId}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Information */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ticket className="h-5 w-5 mr-2" />
                  Your Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {confirmation.event.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Date</p>
                          <p className="text-sm text-muted-foreground">{confirmation.event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Show Time</p>
                          <p className="text-sm text-muted-foreground">{confirmation.event.selectedTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Venue</p>
                          <p className="text-sm text-muted-foreground">{confirmation.event.selectedVenue.name}</p>
                          <p className="text-xs text-muted-foreground">{confirmation.event.selectedVenue.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seat Information */}
                  <div className="bg-secondary p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-3">Your Seats</h4>
                    <div className="flex flex-wrap gap-2">
                      {confirmation.selectedSeats.map((seat: any, index: number) => (
                        <div key={index} className="bg-primary text-primary-foreground px-3 py-2 rounded-lg">
                          <span className="font-medium">{seat.row}{seat.number}</span>
                          <span className="text-xs ml-2 opacity-90">({seat.category})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium capitalize">{confirmation.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-medium text-green-600">${confirmation.paidAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Date</span>
                    <span className="font-medium">
                      {new Date(confirmation.paymentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction Status</span>
                    <Badge className="bg-green-100 text-green-800">Successful</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Instructions */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>Important Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Please arrive at the venue at least 15 minutes before the show time.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Present your mobile ticket or printed ticket at the entrance.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Ticket is non-transferable and valid only for the specified date and time.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      For any queries, contact our support team at{' '}
                      <a href="tel:+1-800-VIBEVERSE" className="text-primary">+1-800-VIBEVERSE</a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>Your Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={handleDownloadTicket}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Ticket
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleShareBooking}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share with Friends
                </Button>
                <Separator />
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('booking-history')}
                >
                  View All Bookings
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Customer Support</p>
                      <p className="text-muted-foreground">+1-800-VIBEVERSE</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-muted-foreground">support@vibeverse.com</p>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onNavigate('help')}
                >
                  Visit Help Center
                </Button>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('home')}
                >
                  Book More Events
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('dashboard')}
                >
                  Go to Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('profile')}
                >
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">Thank you for choosing Vibeverse!</h3>
          <p className="text-muted-foreground">
            We hope you have an amazing experience. Don't forget to share your experience with us!
          </p>
        </div>
      </div>
    </div>
  );
}