import React from 'react';
import { Calendar, Clock, MapPin, Star, TrendingUp, Ticket, User, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DashboardPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const userInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "January 2023",
    totalBookings: 24,
    avatar: null,
  };

  const upcomingBookings = [
    {
      id: 1,
      title: "Spider-Man: No Way Home",
      type: "Movie",
      date: "2025-01-15",
      time: "7:30 PM",
      venue: "AMC Theater - Times Square",
      seats: "A12, A13",
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzU2NjA5NjEzfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      id: 2,
      title: "NBA Finals Game 7",
      type: "Sports",
      date: "2025-01-20",
      time: "8:00 PM",
      venue: "Madison Square Garden",
      seats: "Section 115, Row C, Seats 5-6",
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1631746410377-b0e23f61d083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwY3Jvd2R8ZW58MXx8fHwxNzU2NjQzNjI2fDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      id: 3,
      title: "Taylor Swift Concert",
      type: "Live Stream",
      date: "2025-01-25",
      time: "9:00 PM",
      venue: "Virtual Event",
      seats: "Premium Access",
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1679130707518-bc6561f0a7b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwc3RyZWFtaW5nJTIwZXZlbnQlMjBjb25jZXJ0fGVufDF8fHx8MTc1NjcxMDE4NXww&ixlib=rb-4.1.0&q=80&w=400",
    },
  ];

  const recommendations = [
    {
      id: 1,
      title: "The Batman",
      type: "Movie",
      rating: 8.2,
      genre: "Action, Crime",
      reason: "Based on your action movie preferences",
      image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzU2NjA5NjEzfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      id: 2,
      title: "UEFA Champions League Final",
      type: "Sports",
      date: "March 15, 2025",
      reason: "You love football events",
      image: "https://images.unsplash.com/photo-1631746410377-b0e23f61d083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwY3Jvd2R8ZW58MXx8fHwxNzU2NjQzNjI2fDA&ixlib-4.1.0&q=80&w=400",
    },
    {
      id: 3,
      title: "Ed Sheeran Live Stream",
      type: "Live Stream",
      date: "February 10, 2025",
      reason: "Popular among music lovers",
      image: "https://images.unsplash.com/photo-1679130707518-bc6561f0a7b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwc3RyZWFtaW5nJTIwZXZlbnQlMjBjb25jZXJ0fGVufDF8fHx8MTc1NjcxMDE4NXww&ixlib=rb-4.1.0&q=80&w=400",
    },
  ];

  const trendingEvents = [
    { title: "Avengers: Secret Wars", bookings: "2.4M", trend: "+15%" },
    { title: "Super Bowl 2025", bookings: "1.8M", trend: "+22%" },
    { title: "BTS World Tour", bookings: "1.2M", trend: "+8%" },
    { title: "FIFA World Cup Qualifiers", bookings: "950K", trend: "+12%" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {userInfo.name.split(' ')[0]}!
              </h1>
              <p className="text-muted-foreground">
                Ready for your next entertainment experience?
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onNavigate('profile')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => onNavigate('home')}>
              Explore Events
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Bookings */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate('booking-history')}
                  className="text-primary"
                >
                  View All Bookings
                </Button>
              </div>

              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id} className="vibeverse-card">
                      <CardContent className="p-0">
                        <div className="flex">
                          <ImageWithFallback
                            src={booking.image}
                            alt={booking.title}
                            className="w-24 h-24 object-cover rounded-l-lg"
                          />
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="font-semibold text-foreground">{booking.title}</h3>
                                  <Badge variant="outline">{booking.type}</Badge>
                                </div>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    {formatDate(booking.date)} at {booking.time}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {booking.venue}
                                  </div>
                                  <div className="flex items-center">
                                    <Ticket className="h-4 w-4 mr-2" />
                                    {booking.seats}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col space-y-2">
                                <Badge className="bg-green-100 text-green-800">
                                  {booking.status}
                                </Badge>
                                <Button size="sm" variant="outline">
                                  View Ticket
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="vibeverse-card">
                  <CardContent className="p-8 text-center">
                    <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">No upcoming events</h3>
                    <p className="text-muted-foreground mb-4">
                      Start exploring and book your next entertainment experience!
                    </p>
                    <Button onClick={() => onNavigate('home')}>Explore Events</Button>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Personalized Recommendations */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((item) => (
                  <Card 
                    key={item.id} 
                    className="vibeverse-card cursor-pointer"
                    onClick={() => onNavigate('event-details', item)}
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                        {item.type}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      {item.rating && (
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-accent mr-1" />
                          <span className="text-sm text-muted-foreground">{item.rating}</span>
                          {item.genre && (
                            <span className="text-sm text-muted-foreground ml-2">• {item.genre}</span>
                          )}
                        </div>
                      )}
                      {item.date && (
                        <div className="flex items-center mb-2">
                          <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                      )}
                      <p className="text-xs text-primary">{item.reason}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userInfo.totalBookings}</div>
                  <div className="text-sm text-muted-foreground">Total Bookings</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">Member since</div>
                  <div className="text-sm text-muted-foreground">{userInfo.memberSince}</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>This Year's Goal</span>
                    <span>18/25</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    7 more events to reach your goal!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Events */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Trending Now
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-foreground text-sm">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.bookings} bookings</div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {event.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="vibeverse-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('booking-history')}
                >
                  <Ticket className="h-4 w-4 mr-2" />
                  View All Bookings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('profile')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('help')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}