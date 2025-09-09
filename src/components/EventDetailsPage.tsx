import React, { useState } from 'react';
import { Play, Star, Clock, Calendar, MapPin, Users, Share2, Heart, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventDetailsPageProps {
  onNavigate: (page: string, data?: any) => void;
  eventData?: any;
}

export function EventDetailsPage({ onNavigate, eventData }: EventDetailsPageProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  // Default event data if none provided
  const defaultEvent = {
    id: 1,
    title: "Spider-Man: No Way Home",
    type: "Movie",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.4,
    duration: "148 min",
    releaseDate: "December 17, 2021",
    language: "English",
    certificate: "PG-13",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"],
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzU2NjA5NjEzfDA&ixlib=rb-4.1.0&q=80&w=800",
    trailer: "https://www.youtube.com/watch?v=trailer",
    venues: [
      { id: 1, name: "AMC Times Square", address: "234 W 42nd St, New York", showtimes: ["2:30 PM", "5:45 PM", "9:00 PM"] },
      { id: 2, name: "Regal Union Square", address: "850 Broadway, New York", showtimes: ["1:15 PM", "4:30 PM", "7:45 PM"] },
      { id: 3, name: "Cinemark Lincoln Square", address: "1998 Broadway, New York", showtimes: ["3:00 PM", "6:15 PM", "9:30 PM"] },
    ],
    price: { regular: 12.99, premium: 16.99, imax: 19.99 },
  };

  // Merge event data with defaults and normalize the data structure
  const event = eventData ? {
    ...defaultEvent,
    ...eventData,
    // Ensure genre is always an array
    genre: Array.isArray(eventData.genre) 
      ? eventData.genre 
      : typeof eventData.genre === 'string' 
        ? eventData.genre.split(', ').map(g => g.trim())
        : defaultEvent.genre,
    // Ensure cast is always an array
    cast: Array.isArray(eventData.cast) 
      ? eventData.cast 
      : typeof eventData.cast === 'string'
        ? eventData.cast.split(', ').map(c => c.trim())
        : defaultEvent.cast,
    // Ensure venues exist with proper structure
    venues: eventData.venues || defaultEvent.venues,
    // Ensure price structure exists
    price: eventData.price || defaultEvent.price,
    // Fill in missing properties for different event types
    duration: eventData.duration || defaultEvent.duration,
    releaseDate: eventData.releaseDate || eventData.date || defaultEvent.releaseDate,
    language: eventData.language || defaultEvent.language,
    certificate: eventData.certificate || defaultEvent.certificate,
    director: eventData.director || defaultEvent.director,
    description: eventData.description || `Experience ${eventData.title || defaultEvent.title} with Vibeverse.`,
  } : defaultEvent;

  const reviews = [
    {
      id: 1,
      user: "MovieLover123",
      rating: 9,
      comment: "Absolutely amazing! The best Spider-Man movie ever made. The multiverse concept was executed perfectly.",
      date: "2 days ago",
      helpful: 24,
    },
    {
      id: 2,
      user: "CinematicFan",
      rating: 8.5,
      comment: "Great action sequences and emotional moments. All three Spider-Men together was a dream come true!",
      date: "1 week ago",
      helpful: 18,
    },
    {
      id: 3,
      user: "BlockbusterReviewer",
      rating: 7.5,
      comment: "Good movie but felt a bit overcrowded with characters. Still enjoyable for fans.",
      date: "2 weeks ago",
      helpful: 12,
    },
  ];

  const similarEvents = [
    {
      id: 2,
      title: "The Batman",
      rating: 7.8,
      image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzU2NjA5NjEzfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      id: 3,
      title: "Doctor Strange 2",
      rating: 8.1,
      image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzU2NjA5NjEzfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      id: 4,
      title: "Thor: Love and Thunder",
      rating: 7.3,
      image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzU2NjA5NjEzfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
  ];

  const handleBookNow = () => {
    // Ensure we have venue and time data for seat selection
    const bookingData = {
      ...event,
      selectedTime: event.selectedTime || "7:30 PM",
      selectedVenue: event.selectedVenue || {
        name: event.venue || event.teams || "Default Venue",
        address: event.address || event.city || "Location TBD"
      }
    };
    onNavigate('seat-selection', bookingData);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} on Vibeverse!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('home')}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="relative">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
                />
                <Button 
                  className="absolute top-4 right-4 p-2"
                  variant="secondary"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Event Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{event.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {event.genre.map((g: string) => (
                      <Badge key={g} variant="outline">{g}</Badge>
                    ))}
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      {event.rating}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.releaseDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{event.certificate}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Language: </span>
                  {event.language}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {event.description}
              </p>

              {/* Cast & Crew Info */}
              <div className="space-y-3 mb-6">
                <div>
                  <span className="font-semibold text-foreground">Director: </span>
                  <span className="text-muted-foreground">{event.director}</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">Cast: </span>
                  <span className="text-muted-foreground">
                    {Array.isArray(event.cast) ? event.cast.join(', ') : event.cast || 'Not available'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1"
                  onClick={handleBookNow}
                >
                  Book on Vibeverse
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open(event.trailer, '_blank')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Trailer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="showtimes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="showtimes">Showtimes & Tickets</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="similar">Similar Events</TabsTrigger>
          </TabsList>

          {/* Showtimes Tab */}
          <TabsContent value="showtimes" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Select Theater & Showtime</h3>
              
              {/* Pricing */}
              <Card className="vibeverse-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4">Ticket Prices</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="font-semibold text-foreground">Regular</div>
                      <div className="text-2xl font-bold text-primary">${event.price?.regular || '12.99'}</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="font-semibold text-foreground">Premium</div>
                      <div className="text-2xl font-bold text-primary">${event.price?.premium || '16.99'}</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="font-semibold text-foreground">IMAX</div>
                      <div className="text-2xl font-bold text-primary">${event.price?.imax || '19.99'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Venues */}
              <div className="space-y-4">
                {(event.venues || []).map((venue: any) => (
                  <Card key={venue.id} className="vibeverse-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-foreground">{venue.name}</h4>
                          <div className="flex items-center text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{venue.address}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(venue.showtimes || []).map((time: string) => (
                          <Button
                            key={time}
                            variant="outline"
                            onClick={() => onNavigate('seat-selection', { ...event, selectedTime: time, selectedVenue: venue })}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">User Reviews</h3>
                <Button variant="outline">Write a Review</Button>
              </div>

              {/* Rating Summary */}
              <Card className="vibeverse-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{event.rating}</div>
                      <div className="flex items-center justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${star <= Math.floor(event.rating) ? 'text-accent fill-accent' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <div className="text-muted-foreground">Based on 1,247 reviews</div>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <span className="text-sm w-8">{rating}★</span>
                          <Progress value={rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 8 : 2} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground w-12">
                            {rating === 5 ? '65%' : rating === 4 ? '25%' : rating === 3 ? '8%' : '2%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="vibeverse-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-foreground">{review.user}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-4 w-4 ${star <= Math.floor(review.rating) ? 'text-accent fill-accent' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                        <Badge variant="outline">{review.rating}/10</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{review.comment}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="text-muted-foreground hover:text-foreground">
                          👍 Helpful ({review.helpful})
                        </button>
                        <button className="text-muted-foreground hover:text-foreground">
                          Reply
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Similar Events Tab */}
          <TabsContent value="similar" className="mt-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Similar Events You Might Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarEvents.map((item) => (
                  <Card 
                    key={item.id} 
                    className="vibeverse-card cursor-pointer"
                    onClick={() => onNavigate('event-details', item)}
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-accent mr-1" />
                        <span className="text-sm text-muted-foreground">{item.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}