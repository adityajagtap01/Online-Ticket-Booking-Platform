import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Play, Clock, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { eventAPI, Event } from '../utils/api';

interface MoviesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function MoviesPage({ onNavigate }: MoviesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [allMovies, setAllMovies] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load movies from database
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First try to get movies data
        const response = await eventAPI.getEventsByCategory('movies');
        
        if (response && response.data && Array.isArray(response.data)) {
          setAllMovies(response.data);
        } else {
          console.warn('Invalid response format:', response);
          // Try to trigger database initialization by calling debug endpoint
          try {
            const debugResponse = await fetch(`https://abwezckuxlssfurdulse.supabase.co/functions/v1/make-server-e6c01fe5/debug`, {
              headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFid2V6Y2t1eGxzc2Z1cmR1bHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MDk4MjYsImV4cCI6MjA3MjI4NTgyNn0.yvPxqskyxyzj60uGYvZVP32NPBJmIeXKG5uzVAEb3Jo`
              }
            });
            const debugData = await debugResponse.json();
            console.log('Debug data:', debugData);
            
            if (debugData.moviesData && Array.isArray(debugData.moviesData)) {
              setAllMovies(debugData.moviesData);
            } else {
              setAllMovies([]);
              setError('No movies available. The database may still be initializing.');
            }
          } catch (debugErr) {
            console.error('Debug call failed:', debugErr);
            setAllMovies([]);
            setError('Failed to load movies. Please try again in a moment.');
          }
        }
      } catch (err) {
        console.error('Error loading movies:', err);
        setError('Failed to load movies. The server may still be starting up.');
        setAllMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const genres = [
    'all',
    'Action',
    'Adventure',
    'Sci-Fi',
    'Crime',
    'Drama',
  ];

  const ratings = [
    'all',
    '8.0+',
    '7.0+',
    '6.0+',
    '5.0+',
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];

  const filteredMovies = allMovies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGenre = selectedGenre === 'all' || 
                          movie.genre.toLowerCase().includes(selectedGenre.toLowerCase());
      
      const matchesRating = selectedRating === 'all' ||
                           (selectedRating === '8.0+' && movie.rating >= 8.0) ||
                           (selectedRating === '7.0+' && movie.rating >= 7.0) ||
                           (selectedRating === '6.0+' && movie.rating >= 6.0) ||
                           (selectedRating === '5.0+' && movie.rating >= 5.0);
      
      return matchesSearch && matchesGenre && matchesRating;
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
              All <span className="text-primary">Movies</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover amazing movies and book your tickets now
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for movies..."
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
              
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre === 'all' ? 'All Genres' : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratings.map((rating) => (
                    <SelectItem key={rating} value={rating}>
                      {rating === 'all' ? 'All Ratings' : `${rating} Stars`}
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

      {/* Movies Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
              <p className="text-lg text-muted-foreground">Loading movies...</p>
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
                  Showing {filteredMovies.length} of {allMovies.length} movies
                </p>
              </div>

              {filteredMovies.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground mb-4">No movies found</p>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMovies.map((movie) => (
                    <Card 
                      key={movie.id} 
                      className="vibeverse-card cursor-pointer group"
                      onClick={() => onNavigate('movie-details', movie)}
                    >
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={movie.image}
                          alt={movie.title}
                          className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-accent text-accent-foreground">
                            <Star className="h-3 w-3 mr-1" />
                            {movie.rating}
                          </Badge>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary text-primary-foreground">
                            {movie.certificate}
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
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {movie.duration}
                          </div>
                          <span>{movie.language}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary text-lg">{movie.price}</span>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate('movie-details', movie);
                            }}
                          >
                            Book Now
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