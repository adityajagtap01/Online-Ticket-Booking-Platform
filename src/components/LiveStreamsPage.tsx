import React, { useState, useEffect } from 'react';
import { Search, Filter, Radio, Eye, Clock, Users, Play, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { eventAPI, Event } from '../utils/api';

interface LiveStreamsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function LiveStreamsPage({ onNavigate }: LiveStreamsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [allStreams, setAllStreams] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load streams from database
  useEffect(() => {
    const loadStreams = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await eventAPI.getEventsByCategory('streams');
        
        if (response && response.data && Array.isArray(response.data)) {
          setAllStreams(response.data);
        } else {
          console.warn('Invalid streams response format:', response);
          setAllStreams([]);
          setError('No live streams available. The database may still be initializing.');
        }
      } catch (err) {
        console.error('Error loading streams:', err);
        setError('Failed to load live streams. The server may still be starting up.');
        setAllStreams([]);
      } finally {
        setLoading(false);
      }
    };

    loadStreams();
  }, []);

  const categories = [
    'all',
    'Esports',
    'Music',
    'Technology',
    'Gaming'
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];

  const filteredStreams = allStreams
    .filter(stream => {
      const matchesSearch = stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           stream.genre.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                             stream.genre.toLowerCase().includes(selectedCategory.toLowerCase());
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'price-high':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case 'newest':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        default:
          return b.rating - a.rating;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-secondary via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All <span className="text-primary">Live Streams</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Watch exclusive live events from anywhere in the world
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for live streams..."
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
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
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

      {/* Live Streams Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
              <p className="text-lg text-muted-foreground">Loading live streams...</p>
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
                  Showing {filteredStreams.length} of {allStreams.length} streams
                </p>
              </div>

              {filteredStreams.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">No live streams found</p>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStreams.map((stream) => (
                    <Card 
                      key={stream.id} 
                      className="vibeverse-card cursor-pointer group"
                      onClick={() => onNavigate('event-details', stream)}
                    >
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={stream.image}
                          alt={stream.title}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-red-500 text-white animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                            LIVE
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-accent text-accent-foreground">
                            <Eye className="h-3 w-3 mr-1" />
                            {stream.rating}
                          </Badge>
                        </div>
                        <Button 
                          size="sm" 
                          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Watch
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 truncate">{stream.title}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{stream.genre}</p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {stream.duration}
                          </div>
                          <span>{stream.language}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary text-lg">{stream.price}</span>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('event-details', stream);
                            }}
                          >
                            Watch Now
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