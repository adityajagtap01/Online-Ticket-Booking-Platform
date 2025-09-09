import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, Clock, Users, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { eventAPI, Event } from '../utils/api';

interface SportsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function SportsPage({ onNavigate }: SportsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [allSports, setAllSports] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load sports from database
  useEffect(() => {
    const loadSports = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await eventAPI.getEventsByCategory('sports');
        
        if (response && response.data && Array.isArray(response.data)) {
          setAllSports(response.data);
        } else {
          console.warn('Invalid sports response format:', response);
          // Fallback: try debug endpoint
          try {
            const debugResponse = await fetch(`https://abwezckuxlssfurdulse.supabase.co/functions/v1/make-server-e6c01fe5/debug`, {
              headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFid2V6Y2t1eGxzc2Z1cmR1bHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MDk4MjYsImV4cCI6MjA3MjI4NTgyNn0.yvPxqskyxyzj60uGYvZVP32NPBJmIeXKG5uzVAEb3Jo`
              }
            });
            const debugData = await debugResponse.json();
            console.log('Sports debug data:', debugData);
            
            if (debugData.sportsData && Array.isArray(debugData.sportsData)) {
              setAllSports(debugData.sportsData);
            } else {
              setAllSports([]);
              setError('No sports events available. The database may still be initializing.');
            }
          } catch (debugErr) {
            console.error('Sports debug call failed:', debugErr);
            setAllSports([]);
            setError('Failed to load sports events. Please try again in a moment.');
          }
        }
      } catch (err) {
        console.error('Error loading sports:', err);
        setError('Failed to load sports events. The server may still be starting up.');
        setAllSports([]);
      } finally {
        setLoading(false);
      }
    };

    loadSports();
  }, []);

  const sports = [
    'all',
    'Basketball',
    'Soccer',
    'Football',
    'Hockey',
    'Baseball',
    'MMA',
    'Tennis',
    'Swimming',
  ];

  const dateRanges = [
    'all',
    'This Week',
    'This Month',
    'Next Month',
    'This Year',
  ];

  const sortOptions = [
    { value: 'date', label: 'Event Date' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const filteredSports = allSports
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.genre.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSport = selectedSport === 'all' || event.genre.toLowerCase().includes(selectedSport.toLowerCase());
      
      // For demo purposes, we'll just filter by the date field name
      const matchesDate = selectedDate === 'all' || true; // Simplified for demo
      
      return matchesSearch && matchesSport && matchesDate;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'price-high':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        default:
          return b.rating - a.rating; // Popular = highest rated for this demo
      }
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-secondary via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All <span className="text-primary">Sports Events</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the thrill of live sports - book your tickets now
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for teams, venues, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport === 'all' ? 'All Sports' : sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range === 'all' ? 'All Dates' : range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Sports Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
              <p className="text-lg text-muted-foreground">Loading sports events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-xl text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredSports.length} of {allSports.length} events
                </p>
              </div>

              {filteredSports.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">No sports events found</p>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSports.map((event) => (
                    <Card 
                      key={event.id} 
                      className="vibeverse-card cursor-pointer group"
                      onClick={() => onNavigate('event-details', event)}
                    >
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-accent text-accent-foreground">
                            {event.genre}
                          </Badge>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground">
                            {event.rating}/10
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                        <p className="text-lg font-medium text-muted-foreground mb-3">{event.genre}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" />
                            {event.releaseDate}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2" />
                            {event.duration}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            {event.language}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary text-xl">{event.price}</span>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('event-details', event);
                            }}
                          >
                            Book Tickets
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}