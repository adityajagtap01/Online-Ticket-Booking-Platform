import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-e6c01fe5`;

// API helper function
async function apiCall(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
}

// Event API functions
export const eventAPI = {
  // Get all events
  getAllEvents: () => apiCall('/events'),
  
  // Get events by category with retry logic
  getEventsByCategory: async (category: string) => {
    try {
      return await apiCall(`/events/${category}`);
    } catch (error) {
      console.log(`First attempt failed for ${category}, trying to reinitialize database...`);
      try {
        // Try to reinitialize the database
        await apiCall('/reinitialize', { method: 'POST' });
        // Wait a moment for initialization to complete
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Try again
        return await apiCall(`/events/${category}`);
      } catch (retryError) {
        console.error(`Retry failed for ${category}:`, retryError);
        throw error; // Throw original error
      }
    }
  },
  
  // Get event by ID
  getEventById: (id: number) => apiCall(`/event/${id}`),
  
  // Search events
  searchEvents: (query: string, category?: string) => {
    const params = new URLSearchParams();
    params.append('q', query);
    if (category && category !== 'all') {
      params.append('category', category);
    }
    return apiCall(`/search?${params.toString()}`);
  },

  // Debug endpoint
  debug: () => apiCall('/debug'),

  // Force reinitialization
  reinitialize: () => apiCall('/reinitialize', { method: 'POST' }),
};

// Types for events
export interface Event {
  id: number;
  title: string;
  type: string;
  genre: string;
  rating: number;
  duration: string;
  price: string;
  image: string;
  releaseDate: string;
  language: string;
  certificate: string;
  category: string;
}