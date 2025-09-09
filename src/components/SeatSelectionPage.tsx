import React, { useState } from 'react';
import { ChevronLeft, MapPin, Clock, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface SeatSelectionPageProps {
  onNavigate: (page: string, data?: any) => void;
  eventData?: any;
}

type SeatStatus = 'available' | 'selected' | 'occupied' | 'premium';

interface Seat {
  row: string;
  number: number;
  status: SeatStatus;
  price: number;
  category: string;
}

export function SeatSelectionPage({ onNavigate, eventData }: SeatSelectionPageProps) {
  // Normalize event data to handle different structures from various pages
  const normalizeEventData = (data: any) => {
    if (!data) {
      return {
        title: "Spider-Man: No Way Home",
        selectedTime: "7:30 PM",
        selectedVenue: { name: "AMC Times Square", address: "234 W 42nd St, New York" },
        date: "January 15, 2025",
      };
    }

    // Handle different data structures
    const normalizedEvent = {
      title: data.title || "Unknown Event",
      selectedTime: data.selectedTime || data.time || "7:30 PM",
      selectedVenue: data.selectedVenue || {
        name: data.venue || data.teams || "Default Venue",
        address: data.address || data.city || "Location TBD"
      },
      date: data.date || data.releaseDate || "TBD",
      type: data.type || "Event",
      genre: data.genre || "",
      rating: data.rating || 0,
      price: data.price || "$12.99",
    };

    return normalizedEvent;
  };

  const event = normalizeEventData(eventData);

  // Generate seat layout
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 16;
    
    rows.forEach((row, rowIndex) => {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        let status: SeatStatus = 'available';
        let price = 12.99;
        let category = 'Regular';
        
        // Premium seats (middle rows, center seats)
        if (rowIndex >= 3 && rowIndex <= 6 && seatNum >= 6 && seatNum <= 11) {
          status = 'available';
          price = 16.99;
          category = 'Premium';
        }
        
        // Some occupied seats (random)
        if (Math.random() < 0.15) {
          status = 'occupied';
        }
        
        // IMAX seats (back rows)
        if (rowIndex >= 7 && seatNum >= 4 && seatNum <= 13) {
          if (status !== 'occupied') {
            status = 'available';
            price = 19.99;
            category = 'IMAX';
          }
        }
        
        seats.push({
          row,
          number: seatNum,
          status,
          price,
          category,
        });
      }
    });
    
    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatId: string) => {
    const [row, number] = seatId.split('-');
    const seatIndex = seats.findIndex(seat => seat.row === row && seat.number === parseInt(number));
    
    if (seatIndex === -1) return;
    
    const seat = seats[seatIndex];
    if (seat.status === 'occupied') return;
    
    const newSeats = [...seats];
    const newSelectedSeats = [...selectedSeats];
    
    if (seat.status === 'selected') {
      newSeats[seatIndex].status = seat.category === 'Premium' ? 'available' : seat.category === 'IMAX' ? 'available' : 'available';
      const selectedIndex = newSelectedSeats.indexOf(seatId);
      if (selectedIndex > -1) {
        newSelectedSeats.splice(selectedIndex, 1);
      }
    } else {
      newSeats[seatIndex].status = 'selected';
      newSelectedSeats.push(seatId);
    }
    
    setSeats(newSeats);
    setSelectedSeats(newSelectedSeats);
  };

  const getSeatColor = (status: SeatStatus, category: string) => {
    switch (status) {
      case 'available':
        return category === 'Premium' ? 'bg-accent hover:bg-accent/80' : 
               category === 'IMAX' ? 'bg-purple-500 hover:bg-purple-400' : 
               'bg-secondary hover:bg-secondary/80';
      case 'selected':
        return 'bg-primary hover:bg-primary/90';
      case 'occupied':
        return 'bg-muted cursor-not-allowed';
      default:
        return 'bg-secondary';
    }
  };

  const getSelectedSeatsInfo = () => {
    const selectedSeatData = selectedSeats.map(seatId => {
      const [row, number] = seatId.split('-');
      return seats.find(seat => seat.row === row && seat.number === parseInt(number));
    }).filter(Boolean);
    
    const total = selectedSeatData.reduce((sum, seat) => sum + (seat?.price || 0), 0);
    const taxes = total * 0.1; // 10% tax
    const fees = 2.99; // Booking fee
    const grandTotal = total + taxes + fees;
    
    return {
      seats: selectedSeatData,
      subtotal: total,
      taxes,
      fees,
      total: grandTotal,
    };
  };

  const selectedInfo = getSelectedSeatsInfo();

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    
    const bookingData = {
      event,
      selectedSeats: selectedInfo.seats,
      pricing: {
        subtotal: selectedInfo.subtotal,
        taxes: selectedInfo.taxes,
        fees: selectedInfo.fees,
        total: selectedInfo.total,
      },
    };
    
    onNavigate('booking-summary', bookingData);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('event-details', event)}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{event.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {event.selectedVenue?.name || "Venue TBD"}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {event.date || "Date TBD"}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {event.selectedTime || "Time TBD"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle className="text-center">Select Your Seats</CardTitle>
                
                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-secondary rounded"></div>
                    <span className="text-sm">Regular ($12.99)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-accent rounded"></div>
                    <span className="text-sm">Premium ($16.99)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-sm">IMAX ($19.99)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span className="text-sm">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-muted rounded"></div>
                    <span className="text-sm">Occupied</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Screen */}
                <div className="text-center mb-8">
                  <div className="inline-block bg-gradient-to-r from-primary/20 to-primary/40 px-8 py-2 rounded-lg mb-2">
                    <span className="text-sm font-medium">SCREEN</span>
                  </div>
                  <div className="text-xs text-muted-foreground">All eyes this way please!</div>
                </div>

                {/* Seat Grid */}
                <div className="space-y-2 max-w-4xl mx-auto">
                  {['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'].map((row) => (
                    <div key={row} className="flex items-center justify-center space-x-1">
                      {/* Row Label */}
                      <div className="w-6 text-center text-sm font-medium text-muted-foreground">
                        {row}
                      </div>
                      
                      {/* Seats */}
                      <div className="flex space-x-1">
                        {Array.from({ length: 16 }, (_, i) => i + 1).map((seatNum) => {
                          const seat = seats.find(s => s.row === row && s.number === seatNum);
                          if (!seat) return null;
                          
                          const seatId = `${row}-${seatNum}`;
                          const isAisle = seatNum === 4 || seatNum === 13;
                          
                          return (
                            <React.Fragment key={seatNum}>
                              <button
                                onClick={() => handleSeatClick(seatId)}
                                className={`
                                  w-6 h-6 rounded-t-lg text-xs font-medium transition-colors
                                  ${getSeatColor(seat.status, seat.category)}
                                  ${seat.status === 'occupied' ? 'cursor-not-allowed' : 'cursor-pointer'}
                                `}
                                disabled={seat.status === 'occupied'}
                                title={`${row}${seatNum} - ${seat.category} $${seat.price}`}
                              >
                                {seatNum}
                              </button>
                              {isAisle && <div className="w-4"></div>}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      
                      {/* Row Label (Right) */}
                      <div className="w-6 text-center text-sm font-medium text-muted-foreground">
                        {row}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seat Numbers */}
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <div className="w-6 text-center"></div>
                    {Array.from({ length: 16 }, (_, i) => (
                      <React.Fragment key={i + 1}>
                        <div className="w-6 text-center">{i + 1}</div>
                        {(i + 1 === 4 || i + 1 === 13) && <div className="w-4"></div>}
                      </React.Fragment>
                    ))}
                    <div className="w-6 text-center"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="vibeverse-card sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Selected Seats */}
                {selectedSeats.length > 0 ? (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Selected Seats</h4>
                    <div className="space-y-2">
                      {selectedInfo.seats.map((seat, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <div>
                            <Badge variant="outline" className="mr-2">
                              {seat?.row}{seat?.number}
                            </Badge>
                            <span className="text-muted-foreground">{seat?.category}</span>
                          </div>
                          <span className="font-medium">${seat?.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    {/* Pricing Breakdown */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${selectedInfo.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & Fees</span>
                        <span>${(selectedInfo.taxes + selectedInfo.fees).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary">${selectedInfo.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h4 className="font-semibold text-foreground mb-2">No seats selected</h4>
                    <p className="text-muted-foreground text-sm">Click on available seats to select them</p>
                  </div>
                )}

                {/* Event Details */}
                <Separator />
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Event:</span>
                    <div className="text-muted-foreground">{event.title || "Unknown Event"}</div>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Venue:</span>
                    <div className="text-muted-foreground">{event.selectedVenue?.name || "Venue TBD"}</div>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Date & Time:</span>
                    <div className="text-muted-foreground">{event.date || "Date TBD"} at {event.selectedTime || "Time TBD"}</div>
                  </div>
                </div>

                {/* Continue Button */}
                <Button 
                  className="w-full mt-6" 
                  onClick={handleContinue}
                  disabled={selectedSeats.length === 0}
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}