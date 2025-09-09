import React, { useState, useEffect } from 'react';
import { Search, Play, Calendar, Star, ChevronRight, Film, Trophy, Radio } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import your API functions and Event type
import { eventAPI, Event } from '@/utils/api'; // Note: Adjust this path if your api.ts file is located elsewhere

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  // --- KEY CHANGES START HERE ---

  // 1. State to hold live data from the API and to track loading status
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch all events from the API when the component first loads
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        setIsLoading(true);
        const response = await eventAPI.getAllEvents();
        setEvents(response.data); // Store the live data in state
      } catch (error) {
        console.error("Failed to fetch events for home page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllEvents();
  }, []); // The empty array [] ensures this runs only once

  // 3. Filter the live data into separate categories to be displayed
  const featuredMovies = events.filter(event => event.category === 'movies').slice(0, 4);
  const featuredSports = events.filter(event => event.category === 'sports').slice(0, 2);
  const liveStreams = events.filter(event => event.category === 'streams').slice(0, 2);

  // The categories array can remain as it is static UI information
  const categories = [
    { icon: Film, label: "Movies", count: "1,200+", page: "movies" },
    { icon: Trophy, label: "Sports", count: "500+", page: "sports" },
    { icon: Radio, label: "Live Streams", count: "300+", page: "stream" },
  ];

  // --- KEY CHANGES END HERE ---

  // Optional: Display a loading message while waiting for data
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section (No changes needed here) */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Welcome to <span className="text-primary">Vibeverse</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience Movies, Sports & Streams with Vibeverse. Your premier destination for entertainment tickets.
            </p>
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for movies, sports events, live streams..."
                  className="pl-12 pr-4 py-4 text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-primary"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6">
                  Search
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {categories.map((category) => (
                <Card
                  key={category.page}
                  className="vibeverse-card cursor-pointer border-2 hover:border-primary transition-all"
                  onClick={() => onNavigate(category.page)}
                >
                  <CardContent className="p-6 text-center">
                    <category.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{category.label}</h3>
                    <p className="text-muted-foreground text-sm">{category.count} events</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies - Now uses the 'featuredMovies' state variable */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Movies</h2>
            <Button variant="ghost" onClick={() => onNavigate('movies')} className="text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMovies.map((movie) => (
              <Card
                key={movie.id}
                className="vibeverse-card cursor-pointer"
                onClick={() => onNavigate('movie-details', movie)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      {movie.rating}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Trailer
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 truncate">{movie.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{movie.genre}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{movie.duration}</span>
                    <span className="font-semibold text-primary">{movie.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sports - Now uses the 'featuredSports' state variable */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Upcoming Sports</h2>
            <Button variant="ghost" onClick={() => onNavigate('sports')} className="text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredSports.map((sport) => (
              <Card
                key={sport.id}
                className="vibeverse-card cursor-pointer"
                onClick={() => onNavigate('event-details', sport)}
              >
                <div className="flex">
                  <ImageWithFallback
                    src={sport.image}
                    alt={sport.title}
                    className="w-32 h-32 object-cover rounded-l-lg"
                  />
                  <CardContent className="p-6 flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{sport.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{sport.genre}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {sport.releaseDate}
                    </div>
                    <div className="flex items-center justify-between">
                      <Button>Book Now</Button>
                      <span className="font-semibold text-primary">{sport.price}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Streams - Now uses the 'liveStreams' state variable */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Live Streams</h2>
            <Button variant="ghost" onClick={() => onNavigate('stream')} className="text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveStreams.map((stream) => (
              <Card
                key={stream.id}
                className="vibeverse-card cursor-pointer"
                onClick={() => onNavigate('event-details', stream)}
              >
                <div className="relative">
                  <ImageWithFallback
                    src={stream.image}
                    alt={stream.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                      LIVE
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{stream.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{stream.genre}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{stream.releaseDate}</span>
                    <span className="font-semibold text-primary">{stream.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (No changes needed here) */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Join the Vibeverse Experience
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't miss out on the best entertainment experiences. Sign up today and get exclusive access to early bookings and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('signup')}
              className="bg-background text-foreground hover:bg-background/90"
            >
              Sign Up Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('login')}
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Already a member? Login
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}